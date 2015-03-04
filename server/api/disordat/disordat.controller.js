/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Converter = require("csvtojson").core.Converter;
var fs = require('fs');
var https = require('https');

var questions, answers, remainingQuestionIds = {};

// Get all questions
exports.getQuestions = function (req, res) {
    //var csv_questions_file = getCsvQuestionsFromOffice365();
    // var json_questions_file = convertFromCsvToJson(csv_questions_file);
    //console.log("JOS"+csv_questions_file);

    res.json(questions);
};

// Get random question
exports.getRandomQuestion = function (req, res) {
    var user = req.body.user;

    if (!remainingQuestionIds[user]) {
        //first question
        remainingQuestionIds[user] = _.map(questions, function (q) {
            return q.id;
        });
    }

    if (remainingQuestionIds[user].length === 0) {
        //out of questions
        remainingQuestionIds[user] = null;
        res.end();
    } else {
        var questionId = _.sample(remainingQuestionIds[user]);
        var question = _.find(questions, function (question) {
            return question.id === questionId;
        });
        _.remove(remainingQuestionIds[user], function (id) {
            return id === questionId;
        });

        res.json(question);
    }
};

// Get all answers
exports.getAnswers = function (req, res) {
    res.json(answers);
};

// Get bad or good answer
exports.getAnswer = function (req, res) {
    var questionId = req.body.questionId;
    var answerId = req.body.answerId;
    var result = false;
    answers.forEach(function (item) {
        if (item.questionId === questionId) {
            result = item.correctAnswerId === answerId;
            return;
        }
    });
    res.json(result);
};

exports.loadAllQuestions = function () {
    console.log("Loading all questions");
    convertFromCsvToJson("questions", function (data) {
        questions = data;
    });
    console.log("Loaded all questions");
};

exports.loadAllAnswers = function () {
    console.log("Loading all answers");
    convertFromCsvToJson("answers", function (data) {
        answers = data;
    });
    console.log("Loaded all answers");
};

function convertFromCsvToJson(fileName, callBack) {
    var fileStream = fs.createReadStream("./server/api/disordat/data/" + fileName + ".csv");
    //new converter instance
    var csvConverter = new Converter({
        constructResult: true,
        delimiter: ";"
    });

    //end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed", callBack);

    //read from file
    fileStream.pipe(csvConverter);
}

//--------------------------------------call office 365 api for retrieving questions file------------------------------

function getAccessToken() {
    var authorityUrl = 'https://login.windows.net/aenv.onmicrosoft.com/oauth2/token';
    var clientId = '91553c83-ec0c-431a-93da-ef9c943d3f9f';
    var clientSecret = 'R/MBFEDNWoaLKUettQO+l6dmKQpW6AOKQTNqWu9Toy8=';
    var resource = 'https://www.ae.be/aegame';
    var grantType = 'client_credentials';

    // Build the post string
    var post_data = querystring.stringify({
        'client_id': clientId,
        'client_secret': clientSecret,
        'resource': resource,
        'grant_type': grantType
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'login.windows.net',
        port: 443,
        path: '/aenv.onmicrosoft.com/oauth2/token',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = https.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

function getCsvQuestionsFromOffice365() {

    var optionsget = {
        host: 'aenv-my.sharepoint.com',
        port: 443,
        path: "/_api/v1.0/me/files/getByPath('ae game/questions.csv')/content",
        method: 'GET'
    };

    console.info('Options prepared:');
    console.info(optionsget);
    console.info('Do the GET call');

// do the GET requesthttps.request
    var reqGet = https.request(optionsget, function (res) {
        console.log(res);
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
//  console.log("headers: ", res.headers);

        res.on('data', function (d) {
            console.info('GET result:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
        });

    });

    reqGet.end();
    reqGet.on('error', function (e) {
        console.error(e);
    });
}

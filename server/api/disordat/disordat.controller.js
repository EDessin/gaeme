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
var bodyParser = require('body-parser');
var Converter=require("csvtojson").core.Converter;
var https = require('https');
var querystring = require('querystring');
var fs = require('fs');
var Papa = require('babyparse');


var questions = [

    {
        question: {
            id: 1,
            type: 'text',
            src: 'Kent Glenn iets van Front end engineering?'
        },
        answers: [
            {
                id: 1,
                answer: 'Ja'
            },
            {
                id: 2,
                answer: 'Nee'
            }
        ]
    },
    {
        question: {
            id: 2,
            type: 'text',
            src: 'Kent Glenn iets van Information Management?'
        },
        answers: [
            {
                id: 1,
                answer: 'Ja'
            },
            {
                id: 2,
                answer: 'Nee'
            }
        ]
    }
];

var answers = [
    {
      question_id: 1,
      correct_answer_id: 1
    },
    {
      question_id: 2,
      correct_answer_id: 2
    }
];

// Get all questions
exports.questions = function(req, res) {
  //var csv_questions_file = getCsvQuestionsFromOffice365();
  //var csv_questions_file = testAccessToken();
  //var json_questions_file = convertFromCsvToJson(csv_questions_file);
  //console.log(json_questions_file);
  res.json(questions);
};

// Get question
exports.question = function(req, res) {
  var index = _.random(questions.length - 1);
  //res.json(questions[index]);
  //var csv_questions_file = getCsvQuestionsFromOffice365();
  //var json_questions_file = convertFromCsvToJson(csv_questions_file);
  //console.log(json_questions_file);
  res.json(questions[index]);
};

// Get all answers
exports.answers = function(req, res) {
  res.json(answers);
};

// Get bad or good answer
exports.answer = function(req, res) {
  console.log(JSON.stringify(req.body));
  var questionId = req.body.question_id;
  var answerId = req.body.answer_id;
  var result;
  answers.forEach(function(answer) {
    if (answer.question_id === questionId) {
      result = answer.correct_answer_id === answerId;
      return;
    }
  });
  res.json(result);
};


//--------------------------------------call office 365 api for retrieving questions file------------------------------

function getAccessToken() {
    var authorityUrl = 'https://login.windows.net/aenv.onmicrosoft.com/oauth2/token';
    var clientId = '91553c83-ec0c-431a-93da-ef9c943d3f9f';
    var clientSecret = 'R/MBFEDNWoaLKUettQO+l6dmKQpW6AOKQTNqWu9Toy8=';
    var resource = 'https://www.ae.be/aegame';
    var grantType = 'client_credentials';

    // Build the post string
    var post_data = querystring.stringify({
      'client_id' : clientId,
      'client_secret': clientSecret,
      'resource': resource,
      'grant_type' : grantType
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
    var post_req = https.request(post_options, function(res) {
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
    path: '/_api/v1.0/me/files/getByPath(\'questions.csv\')/content',
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

function convertFromCsvToJson(csv_questions) {
  var json_questions;
  //var csv_questions=fs.readFile("server/api/disordat/aegame_questions.csv", function(err, data) {
  //var writeStream=fs.createWriteStream("server/api/disordat/aegame_questions.json");
  var csv_file = fs.readFile("server/api/disordat/aegame_questions.csv");
  var json_questions = Papa.parse(csv_file, {
    complete: function (results) {
      console.log(results);
    }
  });
  console.log("json1" + results);
  json_questions = results;
  return json_questions;
}

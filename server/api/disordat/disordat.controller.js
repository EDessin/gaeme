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

var questions, answers;

// Get all questions
exports.getQuestions = function (req, res) {
    res.json(questions);
};

// Get random question
exports.getRandomQuestion = function (req, res) {
    var index = _.random(questions.length - 1);
    var question = questions[index];

    res.json(question);
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

exports.loadAllQuestions = function() {
    console.log("Loading all questions");
    convertFromCsvToJson("questions", function (data) {
        questions = data;
    });
    console.log("Loaded all questions");
};

exports.loadAllAnswers = function() {
    console.log("Loading all answers");
    convertFromCsvToJson("answers", function (data) {
        answers = data;
    });
    console.log("Loaded all answers");
};

function convertFromCsvToJson(fileName, callBack) {
    var fileStream = fs.createReadStream("./server/api/disordat/data/"+fileName+".csv");
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

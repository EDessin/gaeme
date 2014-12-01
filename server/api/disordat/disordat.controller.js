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

var questions = [
    {
        question: {
            id: 1,
            text: 'Heeft Glenn Dejaeger expertise binnen Front end engineering?'
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
            text: 'Heeft Glenn Dejaeger expertise binnen Information Management?'
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
            id: 3,
            text: "Wat is de naam van deze AE'er?",
            img: 'http://bit.ly/15Mub4R'
        },
        answers: [
            {
                id: 1,
                answer: 'Maarten Aerts'
            },
            {
                id: 2,
                answer: 'Maarten Allard'
            }
        ]
    },
    {
        question: {
            id: 4,
            text: "Wat is de naam van deze AE'er?",
            img: 'http://bit.ly/1tDP5HB'
        },
        answers: [
            {
                id: 1,
                answer: 'Maarten Aerts'
            },
            {
                id: 2,
                answer: 'Maarten Allard'
            }
        ]
    },
    {
        question: {
            id: 5,
            text: "Hoe heet deze AE'er?",
            img: 'http://bit.ly/1yuNxoy'
        },
        answers: [
            {
                id: 1,
                answer: "Ken D'Hondt"
            },
            {
                id: 2,
                answer: "Sean D'Hondt"
            }
        ]
    }
];

var answers = [
    {
        questionId: 1,
        correctAnswerId: 1
    },
    {
        questionId: 2,
        correctAnswerId: 2
    },
    {
        questionId: 3,
        correctAnswerId: 1
    },
    {
        questionId: 4,
        correctAnswerId: 2
    },
    {
        questionId: 5,
        correctAnswerId: 1
    }
];

// Get question
exports.question = function (req, res) {
    var index = _.random(questions.length - 1);
    res.json(questions[index]);
};

// Get all answers
exports.answers = function (req, res) {
    res.json(answers);
};

// Get bad or good answer
exports.answer = function (req, res) {
    console.log(JSON.stringify(req.body));
    var questionId = req.body.questionId;
    var answerId = req.body.answerId;
    var result;
    answers.forEach(function (answer) {
        if (answer.questionId === questionId) {
            result = answer.correctAnswerId === answerId;
            return;
        }
    });
    res.json(result);
};

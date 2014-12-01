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

// Get question
exports.question = function(req, res) {
  var index = _.random(questions.length);
  //todo map to remove 'correct' from answers => not needed for UI
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

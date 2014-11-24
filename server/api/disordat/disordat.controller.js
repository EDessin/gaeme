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

var questions = [
    {
        question: {
            type: 'text',
            src: 'Kent Glenn iets van Front end engineering?'
        },
        answers: [
            {
                answer: 'Ja',
                correct: true
            },
            {
                answer: 'Nee',
                correct: false
            }
        ]
    },
    {
        question: {
            type: 'text',
            src: 'Kent Glenn iets van Information Management?'
        },
        answers: [
            {
                answer: 'Ja',
                correct: false
            },
            {
                answer: 'Nee',
                correct: true
            }
        ]
    }
];

// Get question
exports.question = function(req, res) {
    var index = _.random(questions.length);
    //todo map to remove 'correct' from answers => not needed for UI
    res.json(questions[index]);
};
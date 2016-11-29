//router object that defines the problem route (/problem), the problem page is the application's root route

var express = require('express');
var models = require('../models');
var passport = require('../middlewares/authentication');
var redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    //Respond to GET request on the problem route (/)
    router.get('/', this.index);

    //Respond to POST request on the problem route (/)
    router.post('/', this.submit);

    //Respond to a PUT request to the problem route (/)
    router.put('/', function (req, res) {
      res.send('Got a PUT request at /');
    });

    //Respond to a DELETE request to the problem route (/)
    router.delete('/', function (req, res) {
      res.send('Got a DELETE request at /');
    });

    return router;
  },
  index(req, res) {
    res.render('problem');
  },
  submit(req, res){
    var success = true;
    var user_output = req.body.user_output;
    var today_date = new Date();

    models.questions.findOne({ where: {date: today_date.toJSON().slice(0,10)} }).then((question) => {
        var question_id = question.question_id;
        var answer_output = question.output;
        var grades = grade(user_output, answer_output);
        console.log(success);

        models.question_attempts.create({
          question_id: question_id,
          user_id: req.session.passport.user,
          upload_code: req.body.source_code,
          upload_output: req.body.user_output,
          success: success,
          upload_time: today_date
        }).then(() => {
          res.redirect('/results');
        }).catch(() => {
          this.index;
        });

    }).catch(() => {
      this.index;
    });

    function grade(output, answer){
      var output_lines = output.trim().split("\n");
      var answer_lines = answer.trim().split("\n");
      var check_lines = [];
      for (var i = 0; i < output_lines.length; i++){
        if (output_lines[i] == answer_lines[i]) {
          check_lines[i] = "Correct!";
        }
        else {
          success = false;
          check_lines[i] = "Incorrect!";
        }
      }
      return check_lines;
    }



  }
};

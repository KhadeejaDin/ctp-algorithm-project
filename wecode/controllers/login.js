//router object that defines the /login route

var express = require('express');
var router = express.Router();

// middleware that is specific to login router
// It is invoked for any requests passed to this router
router.use(function timeLog(req, res, next) {
  console.log('Login Controller :: Time: ', Date.now());
  next();
});

//Respond to GET request on the root route (/) ----- (/login)
router.get('/', function(req, res) {
  res.send('Got a GET request for login page');
});

//Respond to POST request on the root route (/)
router.post('/', function (req, res) {
  res.send('Got a POST request to login page');
});

//Respond to a PUT request to the root route (/)
router.put('/', function (req, res) {
  res.send('Got a PUT request at /login');
});

//Respond to a DELETE request to the root route (/)
router.delete('/', function (req, res) {
  res.send('Got a DELETE request at /login');
});

module.exports = router;

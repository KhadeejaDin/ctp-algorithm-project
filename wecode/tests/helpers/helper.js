var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

/**
 * Perform user login.
 *
 * @param {Object} agent
 *    Agent instance returned by supertest.agent(app)
 * @param {String} username
 * @param {String} password
 * @param {Function} callback

 *
 * @param {Mixed} cbData
 *    Optional.
 *    Arbitrary user data that is given to callback
 */



module.exports.agentLogin = function(agent, username, password, callback, cbData) {
  it('Should log in as ' + username, function(done){
    agent
    .post('/login')
    .send(
      {
        username: username,
        password: password
      }
    )
    .end(function(err, res){
      expect(res.status).to.equal(200);
      if (callback){
        callback(res, done, cbData);
      } else {
        done();
      }
    });
  });
};

/**
 * Perform user logout.
 *
 * @param {Object} agent
 *    Agent instance returned by supertest.agent(app)
 */
module.exports.agentLogout = function(agent) {
  it('Should log out', function(done){
    agent
    .get('/logout')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      done();
    });
  });
}

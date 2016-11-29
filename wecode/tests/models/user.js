var chai = require('chai');
var chaiHttp = require('chai-http');
var models = require('../../models');
var expect = chai.expect;

describe('user Model', function() {
  before(function(done) {
    models.user.sync({ force: true })
      .then(function() {
        done(null);
      })
      .catch(function(error) {
        done(error);
      });
  });

  it('should contain a email property', function(done) {
    var u1 = models.user.build();
    expect(u1).to.have.property('email');
    done();
  });

  it('should contain a username property', function(done) {
    var u1 = models.user.build();
    expect(u1).to.have.property('username');
    done();
  });

  it('should contain a password property', function(done) {
    var u1 = models.user.build();
    expect(u1).to.have.property('password');
    done();
  });

  it('should not contain a address property', function(done) {
    var u1 = models.user.build();
    expect(u1).to.not.have.property('address');
    done();
  });
});

describe('creating users', function() {
  it('should not save when missing email', function (done) {
    models.user.create({
      username: 'userpeople',
      password: 'hello'
    })
    .then(function () {
      done('failed');
    })
    .catch(function (e) {
      done();
    });
  });

  it('should not save when missing username', function (done) {
    models.user.create({
      email: 'userpeople@gmail.com',
      password: 'hello'
    })
    .then(function () {
      done('failed');
    })
    .catch(function (e) {
      done();
    });
  });

  it('should not save when missing password', function (done) {
    models.user.create({
      email: 'userpeople@gmail.com',
      username: 'userpeople'
    })
    .then(function () {
      done('failed');
    })
    .catch(function (e) {
      done();
    });
  });

  it('should save when all properties are properly provided', function (done) {
    models.user.create({
      email: 'usera@gmail.com',
      username: 'usera',
      password: 'hello'
    })
    .then(function() {
      done();
    })
    .catch(function (e) {
      done(e);
    })
  })

  it('should save when all properties are properly provided', function (done) {
    models.user.create({
      email: 'userb@gmail.com',
      username: 'userb',
      password: 'hello'
    })
    .then(function() {
      done();
    })
    .catch(function (e) {
      done(e);
    })
  })

});

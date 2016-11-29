var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../../app');
var models = require('../../models');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('../../middlewares/authentication');
var passportSocketIo = require('passport.socketio');
var authHelper = require('../helpers/helper');
chai.use(chaiHttp);

var io = require('socket.io-client');
var cookieParser = require('cookie-parser');

var socketUrl = 'http://localhost:8000';

var testUser1Username = 'usera';
var testUser1Password = 'hello';
var testUser1Email = 'usera@gmail.com';
var testUser1Id;  //-- will be set when user is created
var testUser1;    //-- will be set when user is created

var testUser2Username = 'userb';
var testUser2Password = 'hello';
var testUser2Email = 'userb@gmail.com';
var testUser2;    //-- will be set when user is created
var testUser2Id;  //-- will be set when user is created


var userData1 = {
  agent: chai.request.agent(server),
};
var userData2 = {
  agent: chai.request.agent(server),
};


describe("Chat Server",function(){

  //-- before tests, reset user data
  before(function(done) {
    _resetUserDataAll();
    done();
  });

  authHelper.agentLogin(
    userData1.agent,
    testUser1Username,
    testUser1Password,
    _agentLoginCallback,
    userData1
  );

  authHelper.agentLogin(
    userData2.agent,
    testUser2Username,
    testUser2Password,
    _agentLoginCallback,
    userData2
  );

  //-- connect both clients to socket
  _socketConnectAll();

  //-- try to broadcast messages, user2 is logged in
   _tryBroadcastMessages(true);

   //-- disconnect from socket
   _socketDisonnectAll();


   //-- logout user1
   authHelper.agentLogout(
     userData1.agent
   );

   //-- logout user2
   authHelper.agentLogout(
     userData2.agent
   );

});


function _agentLoginCallback(res, done, userData) {
    userData.sessionId = cookieParser.signedCookie('express.sid', 'process.env.SECRET_KEY_BASE');
    console.log('sessionId:', userData.sessionId);
    done();
}


function _socketConnectUser(userData) {
         userData.socket = io(
           socketUrl,
           {
             transports: ['websocket'],
             autoConnect: true,//false,
             forceNew: true,

             //-- Crucial thing: pass session_id as a query parameter
             //   to passport.socketio
             query: 'session_id=' + userData.sessionId
           }
         );
       }


function _socketConnectAll() {
         it("Should connect to socket", function(done) {
           //-- open socket
           _socketConnectUser(userData1);
           _socketConnectUser(userData2);
            done();
         });
 }

function _socketDisonnectAll() {
         it("Should disconnect", function(done) {

           userData1.socket.disconnect();
           userData2.socket.disconnect();

           done();
         });
}


function _tryBroadcastMessages(user2LoggedIn) {
    it("Should broadcast messages", function(done) {
      var chatMessage = 'hello';
      var subscribeOnChatMessage = function(userData){

        //-- new chat message received
        userData.socket.on('chat message', function(msg){
          msg.should.equal(chatMessage);
          console.log(msg);
          //-- remember received message
          userData.messagesReceived.push(msg);
        });
      };

      //-- subscribe both users on chat events
      subscribeOnChatMessage(userData1);
      subscribeOnChatMessage(userData2);

      //-- send some messages by users:
      userData1.socket.emit('chat message', chatMessage);
      userData1.socket.emit('chat message', chatMessage);

      userData2.socket.emit('chat message', chatMessage);
      var checkTimerId = setTimeout(
        function () {
          if (user2LoggedIn){
            //-- both users should receive messages from both of them
            //userData1.messagesReceived.length.should.equal(3);
            //userData2.messagesReceived.length.should.equal(3);

            //-- user 1 should have 2 messages sent,
            //   user 2 should have 1 message sent.
            userData1.messagesSent.length.should.equal(2);
            userData2.messagesSent.length.should.equal(1);

            //-- nobody should have any failed messages
            userData1.messagesFailed.length.should.equal(0);
            userData2.messagesFailed.length.should.equal(0);
          } else {
            //-- both users should receive only messages from user 1
            //   (even though user 2 is not logged in, he/she should still
            //   receive messages), but messages from user 2 should be ignored
            userData1.messagesReceived.length.should.equal(2);
            userData2.messagesReceived.length.should.equal(2);

            //-- user 1 should have 2 messages sent,
            //   but user 2 should not have any messages sent
            userData1.messagesSent.length.should.equal(2);
            userData2.messagesSent.length.should.equal(0);

            //-- user 1 should not have failed messages,
            //   but user 2 should have.
            userData1.messagesFailed.length.should.equal(0);
            userData2.messagesFailed.length.should.equal(1);
          }

          done();
        },
        100
      );

    });
  }


  function _resetUserDataAll() {

    userData1.sessionId = null;
    userData1.socket = null;
    userData1.connected = false;
    userData1.messagesReceived = [];
    userData1.messagesSent = [];
    userData1.messagesFailed = [];

    userData2.sessionId = null;
    userData2.socket = null;
    userData2.connected = false;
    userData2.messagesReceived = [];
    userData2.messagesSent = [];
    userData2.messagesFailed = [];

  }

/*
 * Routes tests for "/api/users".
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/

var request = require('supertest');
var should  = require('chai').should();
var config  = require('../backend/src/config');


// Endpoint to test
var endpoint = "/api/users";
var user = {
  id: 9909901,
  name: "Test User",
  age: 13,
  email: "test@email.com"
};

var server = request.agent("http://localhost:"+config.serverPort);

describe('*** USERS APIs:', function () {

  describe('POST '+endpoint, function () {
    it('should return 200 OK, {error: false}', function (done) {
      server
        .post(endpoint)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(false);
          done();
        });
    });
  });

  describe('POST '+endpoint+' (with missing parameters)', function () {
    it('should return 200 OK, {error: true}', function (done) {
      server
        .post(endpoint)
        .send({name: "Parameters Missing"})
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(true);
          done();
        });
    });
  });

  describe('GET '+endpoint, function () {
    it('should return 200 OK, {error: false, result: [{user}]}', function (done) {
      server
        .get(endpoint)
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(false);
          res.body.result.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('GET '+endpoint+' (id given)', function () {
    it('should return 200 OK, {error: false, result: {user} }', function (done) {
      server
        .get(endpoint)
        .query("id="+user.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(false);
          res.body.result.id.should.equal(user.id);
          res.body.result.name.should.equal(user.name);
          res.body.result.age.should.equal(user.age);
          res.body.result.email.should.equal(user.email);
          done();
        });
    });
  });

  describe('PUT '+endpoint, function () {
    it('should return 200 OK, {error: false}', function (done) {

      var customUser = {
        id: user.id,
        name: "John Ching",
        age: user.age,
        email: user.email
      };

      server
        .put(endpoint)
        .send(customUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(false);
          done();
        });
    });
  });

  describe('DELETE '+endpoint, function () {
    it('should return 200 OK, {error: false}', function (done) {
      server
        .delete(endpoint)
        .send({id: user.id})
        .expect('Content-Type', /json/)
        .expect(200)
        .end( function(err, res) {
          res.body.error.should.equal(false);
          done();
        });
    });
  });

});
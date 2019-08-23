const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const app = require('../../app');
const constants = require('./constants');

describe('[USERS TESTS]', function() {
  describe('#POST /users', function() {
    it('Creates user', function(done) {
      const user = {
        email: 'fooemail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      request(app)
        .post('/users')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/json"
        })
        .send(user)
        .expect(201)
        .end(function(err, res) {
          expect(err).to.be.null;
          // exclude hashed password
          const userRes = {
            email: res.body.email,
            birthday: res.body.birthday,
            role: res.body.role,
            hearAboutUs: res.body.hearAboutUs,
          };
          delete user.password;
          expect(userRes).to.eql(user);
          done();
        })
    });

    it('Verifies email', function(done) {
      const user = {
        email: 'fooemail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      request(app)
        .post('/users')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/json"
        })
        .send(user)
        .expect(409)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.error.text).to.equal(constants.duplicateEmailText);
          done();
        })
    });
  });

  describe('#POST /login', function() {
    it('Authenticate user', function(done) {
      const response = "Send Token";

      request(app)
        .post('/login')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/x-www-form-urlencoded"
        })
        .send({username: 'fooemail@foo.com', password: 'foopass8'})
        .expect(200)
        .end(function(err, res) {
          expect(err).to.be.null;
          const authRes = "Send Token";
          expect(authRes).to.eql(response);
          done();
        })
    });

    it('Validates user exists', function(done) {
      request(app)
        .post('/login')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/x-www-form-urlencoded"
        })
        .send({username: 'fooemai@foo.com', password: 'foopass8'})
        .expect(404)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.error.text).to.equal(constants.noUserFound);
          done();
        })
    });

    it('Validates user password', function(done) {
      request(app)
        .post('/login')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/x-www-form-urlencoded"
        })
        .send({username: 'fooemail@foo.com', password: 'foopass'})
        .expect(404)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.error.text).to.equal(constants.incorrectPassword);
          done();
        })
    });
  });

  describe('#GET /users', function() {
    it('Gets users', function(done) {
      const user = {
        email: 'fooemail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      request(app)
        .get('/users')
        .set({
          Accept: 'application/json',
          Origin: 'http://localtest.com'
        })
        .expect(200)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.body).to.be.an('array');
          // exclude hashed password
          const userRes = {
            email: res.body[0].email,
            birthday: res.body[0].birthday,
            role: res.body[0].role,
            hearAboutUs: res.body[0].hearAboutUs,
          };
          delete user.password;
          expect(userRes).to.eql(user);
          done();
        })
    });
  });

  describe('#GET /users/:id', function() {
    it('Get user', function(done) {
      const user = {
        email: 'quxemail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      user.email = 'quxemail@foo.com';
      request(app)
        .post('/users')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/json"
        })
        .send(user)
        .expect(201)
        .end(function(err, res) {
          expect(err).to.be.null;
          const newUser = res.body;
          request(app)
            .get('/users/' + newUser._id)
            .set({
              Accept: 'application/json',
              Origin: 'http://localtest.com'
            })
            .expect(200)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res.body).to.be.an('object');
              // exclude hashed password
              delete newUser.password;
              expect(res.body).to.eql(newUser);
              done();
            })
        })
    });
  });

  describe('#DELETE /user/:id', function() {
    it('Deletes user', function(done) {
      const user = {
        email: 'foemail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      request(app)
        .post('/users')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/json"
        })
        .send(user)
        .expect(201)
        .end(function(err, res) {
          expect(err).to.be.null;
          const newUser = res.body;
          request(app)
            .delete('/users/' + newUser._id)
            .set({
              Origin: 'http://localtest.com',
              "Content-Type": "application/json"
            })
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res.body).to.eql(newUser);
              done();
            });
        })
    });
  });

  describe('#PUT /user/:id', function() {
    it('Updates user', function(done) {
      const user = {
        email: 'baremail@foo.com',
        password: 'foopass8',
        birthday: '1990-11-24T05:00:00.000Z',
        role: 'student',
        hearAboutUs: 'google'
      };

      request(app)
        .post('/users')
        .set({
          Origin: 'http://localtest.com',
          "Content-Type": "application/json"
        })
        .send(user)
        .expect(201)
        .end(function(err, res) {
          expect(err).to.be.null;
          var newUser = res.body;
          request(app)
            .put('/users/' + newUser._id)
            .set({
              Origin: 'http://localtest.com',
              "Content-Type": "application/json"
            })
            .send({
              firstName: 'new name'
            })
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res.body.firstName).to.equal('new name');
              done();
            });
        })
    });
  });

  //After tests are finished, drop database and close connection
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});

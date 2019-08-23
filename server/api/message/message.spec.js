var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[MESSAGES TESTS]', function(){

  it('should get all messages', function(done) {
    request(app)
      .get('/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a message', function(done) {
    request(app)
      .post('/messages')
      .send({
        id: 0
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should delete a message', function(done) {
    request(app)
      .post('/messages')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var message = resp.body;
        request(app)
          .delete('/messages/' + message.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(message);
            done();
          });
      })
  });

  it('should update an message', function(done) {
    request(app)
      .post('/messages')
      .send({
        name: 'test message'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var message = resp.body;
        request(app)
          .put('/messages/' + message.id)
          .send({
            name: 'new name'
          })
          .end(function(err, resp) {
            expect(resp.body.name).to.equal('new name');
            done();
          });
      })
  });
});
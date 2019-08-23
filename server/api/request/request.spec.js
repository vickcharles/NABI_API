var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[REQUESTS TESTS]', function(){

  it('should get all requests', function(done) {
    request(app)
      .get('/requests')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a request', function(done) {
    request(app)
      .post('/requests')
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

  it('should delete a request', function(done) {
    request(app)
      .post('/requests')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var requestBody = resp.body;
        request(app)
          .delete('/requests/' + requestBody.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(requestBody);
            done();
          });
      })
  });

  it('should update an request', function(done) {
    request(app)
      .post('/requests')
      .send({
        name: 'test request'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var requestBody = resp.body;
        request(app)
          .put('/requests/' + requestBody.id)
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
var app = require('../../app');
var application = require('supertest');
var expect = require('chai').expect;

describe('[APPLICATIONS TESTS]', function(){

  it('should get all applications', function(done) {
    application(app)
      .get('/applications')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a application', function(done) {
    application(app)
      .post('/applications')
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

  it('should delete a application', function(done) {
    application(app)
      .post('/applications')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var applicationBody = resp.body;
        application(app)
          .delete('/applications/' + applicationBody.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(applicationBody);
            done();
          });
      })
  });

  it('should update an application', function(done) {
    application(app)
      .post('/applications')
      .send({
        name: 'test application'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var applicationBody = resp.body;
        application(app)
          .put('/applications/' + applicationBody.id)
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

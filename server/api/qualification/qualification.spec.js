var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[QUALIFICATIONS TESTS]', function(){

  it('should get all qualifications', function(done) {
    request(app)
      .get('/qualifications')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a qualification', function(done) {
    request(app)
      .post('/qualifications')
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

  it('should delete a qualification', function(done) {
    request(app)
      .post('/qualifications')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var qualification = resp.body;
        request(app)
          .delete('/qualifications/' + qualification.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(qualification);
            done();
          });
      })
  });

  it('should update an qualification', function(done) {
    request(app)
      .post('/qualifications')
      .send({
        name: 'test qualification'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var qualification = resp.body;
        request(app)
          .put('/qualifications/' + qualification.id)
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
var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[EDUCATION TESTS]', function(){

  it('should get all educations', function(done) {
    request(app)
      .get('/educations')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a education', function(done) {
    request(app)
      .post('/educations')
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

  it('should delete a education', function(done) {
    request(app)
      .post('/educations')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var education = resp.body;
        request(app)
          .delete('/educations/' + education.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(education);
            done();
          });
      })
  });

  it('should update an education', function(done) {
    request(app)
      .post('/educations')
      .send({
        name: 'test education'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var education = resp.body;
        request(app)
          .put('/educations/' + education.id)
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
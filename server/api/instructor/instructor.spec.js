var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[INSTRUCTORS TESTS]', function(){

  it('should get all instructors', function(done) {
    request(app)
      .get('/instructors')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a instructor', function(done) {
    request(app)
      .post('/instructors')
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

  it('should delete a instructor', function(done) {
    request(app)
      .post('/instructors')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var instructor = resp.body;
        request(app)
          .delete('/instructors/' + instructor.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(instructor);
            done();
          });
      })
  });

  it('should update an instructor', function(done) {
    request(app)
      .post('/instructors')
      .send({
        name: 'test instructor'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var instructor = resp.body;
        request(app)
          .put('/instructors/' + instructor.id)
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
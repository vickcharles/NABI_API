var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[LESSONS TESTS]', function(){

  it('should get all lessons', function(done) {
    request(app)
      .get('/lessons')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a lesson', function(done) {
    request(app)
      .post('/lessons')
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

  it('should delete a lesson', function(done) {
    request(app)
      .post('/lessons')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lesson = resp.body;
        request(app)
          .delete('/lessons/' + lesson.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(lesson);
            done();
          });
      })
  });

  it('should update an lesson', function(done) {
    request(app)
      .post('/lessons')
      .send({
        name: 'test lesson'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var lesson = resp.body;
        request(app)
          .put('/lessons/' + lesson.id)
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
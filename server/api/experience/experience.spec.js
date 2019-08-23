var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[EXPERIENCES TESTS]', function(){

  it('should get all experiences', function(done) {
    request(app)
      .get('/experiences')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a experience', function(done) {
    request(app)
      .post('/experiences')
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

  it('should delete a experience', function(done) {
    request(app)
      .post('/experiences')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var experience = resp.body;
        request(app)
          .delete('/experiences/' + experience.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(experience);
            done();
          });
      })
  });

  it('should update an experience', function(done) {
    request(app)
      .post('/experiences')
      .send({
        name: 'test experience'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var experience = resp.body;
        request(app)
          .put('/experiences/' + experience.id)
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
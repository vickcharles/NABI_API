var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[RECOMMENDATIONS TESTS]', function(){

  it('should get all recommendations', function(done) {
    request(app)
      .get('/recommendations')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a recommendation', function(done) {
    request(app)
      .post('/recommendations')
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

  it('should delete a recommendation', function(done) {
    request(app)
      .post('/recommendations')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var recommendation = resp.body;
        request(app)
          .delete('/recommendations/' + recommendation.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(recommendation);
            done();
          });
      })
  });

  it('should update an recommendation', function(done) {
    request(app)
      .post('/recommendations')
      .send({
        name: 'test recommendation'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var recommendation = resp.body;
        request(app)
          .put('/recommendations/' + recommendation.id)
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
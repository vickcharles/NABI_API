var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[REVIEWS TESTS]', function(){

  it('should get all reviews', function(done) {
    request(app)
      .get('/reviews')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a review', function(done) {
    request(app)
      .post('/reviews')
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

  it('should delete a review', function(done) {
    request(app)
      .post('/reviews')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var review = resp.body;
        request(app)
          .delete('/reviews/' + review.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(review);
            done();
          });
      })
  });

  it('should update an review', function(done) {
    request(app)
      .post('/reviews')
      .send({
        name: 'test review'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var review = resp.body;
        request(app)
          .put('/reviews/' + review.id)
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
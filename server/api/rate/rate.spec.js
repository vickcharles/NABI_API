var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[RATES TESTS]', function(){

  it('should get all rates', function(done) {
    request(app)
      .get('/rates')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a rate', function(done) {
    request(app)
      .post('/rates')
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

  it('should delete a rate', function(done) {
    request(app)
      .post('/rates')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var rate = resp.body;
        request(app)
          .delete('/rates/' + rate.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(rate);
            done();
          });
      })
  });

  it('should update an rate', function(done) {
    request(app)
      .post('/rates')
      .send({
        name: 'test rate'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var rate = resp.body;
        request(app)
          .put('/rates/' + rate.id)
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
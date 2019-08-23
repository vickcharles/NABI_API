var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[INSTRUMENTS TESTS]', function(){

  it('should get all instruments', function(done) {
    request(app)
      .get('/instruments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a instrument', function(done) {
    request(app)
      .post('/instruments')
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

  it('should delete a instrument', function(done) {
    request(app)
      .post('/instruments')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var instrument = resp.body;
        request(app)
          .delete('/instruments/' + instrument.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(instrument);
            done();
          });
      })
  });

  it('should update an instrument', function(done) {
    request(app)
      .post('/instruments')
      .send({
        name: 'test instrument'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var instrument = resp.body;
        request(app)
          .put('/instruments/' + instrument.id)
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
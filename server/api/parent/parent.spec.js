var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[PARENT TESTS]', function(){

  it('should get all parents', function(done) {
    request(app)
      .get('/parents')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a parent', function(done) {
    request(app)
      .post('/parents')
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

  it('should delete a parent', function(done) {
    request(app)
      .post('/parents')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var parent = resp.body;
        request(app)
          .delete('/parents/' + parent.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(parent);
            done();
          });
      })
  });

  it('should update an parent', function(done) {
    request(app)
      .post('/parents')
      .send({
        name: 'test parent'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var parent = resp.body;
        request(app)
          .put('/parents/' + parent.id)
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
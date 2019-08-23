var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[ADDRESSES TESTS]', function(){

  it('should get all addresses', function(done) {
    request(app)
      .get('/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a address', function(done) {
    request(app)
      .post('/addresses')
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

  it('should delete a address', function(done) {
    request(app)
      .post('/addresses')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var address = resp.body;
        request(app)
          .delete('/addresses/' + address.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(address);
            done();
          });
      })
  });

  it('should update an address', function(done) {
    request(app)
      .post('/addresses')
      .send({
        name: 'test address'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var address = resp.body;
        request(app)
          .put('/addresses/' + address.id)
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
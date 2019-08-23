var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[PAYMENTS TESTS]', function(){

  it('should get all payments', function(done) {
    request(app)
      .get('/payments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a payment', function(done) {
    request(app)
      .post('/payments')
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

  it('should delete a payment', function(done) {
    request(app)
      .post('/payments')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var payment = resp.body;
        request(app)
          .delete('/payments/' + payment.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(payment);
            done();
          });
      })
  });

  it('should update an payment', function(done) {
    request(app)
      .post('/payments')
      .send({
        name: 'test payment'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var payment = resp.body;
        request(app)
          .put('/payments/' + payment.id)
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
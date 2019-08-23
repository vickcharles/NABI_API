var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[SCHEDULE TESTS]', function(){

  it('should get all schedules', function(done) {
    request(app)
      .get('/schedules')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a schedule', function(done) {
    request(app)
      .post('/schedules')
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

  it('should delete a schedule', function(done) {
    request(app)
      .post('/schedules')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var schedule = resp.body;
        request(app)
          .delete('/schedules/' + schedule.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(schedule);
            done();
          });
      })
  });

  it('should update an schedule', function(done) {
    request(app)
      .post('/schedules')
      .send({
        name: 'test schedule'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var schedule = resp.body;
        request(app)
          .put('/schedules/' + schedule.id)
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
var app = require('../../app');
var request = require('supertest');
var expect = require('chai').expect;

describe('[STUDENT TESTS]', function(){

  it('should get all students', function(done) {
    request(app)
      .get('/students')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a student', function(done) {
    request(app)
      .post('/students')
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

  it('should delete a student', function(done) {
    request(app)
      .post('/students')
      .send({
        id: 0,
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var student = resp.body;
        request(app)
          .delete('/students/' + student.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(student);
            done();
          });
      })
  });

  it('should update an student', function(done) {
    request(app)
      .post('/students')
      .send({
        name: 'test student'
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var student = resp.body;
        request(app)
          .put('/students/' + student.id)
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
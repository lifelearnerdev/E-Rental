/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../app';
import User from '../config/dbConfig';
import { newUser, theUser } from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('USER ENDPOINT TESTS', () => {
  it('Should register a new user', (done) => {
    chai.request(server)
      .post('/api/auth/signup')
      .send(newUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('user registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should sign the new user in', (done) => {
    chai.request(server)
      .post('/api/auth/signin')
      .send(theUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('signed in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });
  User.destroy({ truncate: true, cascade: false });
});

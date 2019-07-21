/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../app';
import newUser from './dummy';
import User from '../config/dbConfig';

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
  User.destroy({ truncate: true, cascade: false });
});

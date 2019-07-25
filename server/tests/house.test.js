import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('HOUSE ENDPOINT TESTS ', () => {
  it('Should return status 401 with an error unauthorized access ', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.have.property('error').eql('unauthorized access. login or register');
      });
  });
});

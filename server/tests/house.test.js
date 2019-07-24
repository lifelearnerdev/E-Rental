import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
import { House } from '../config/dbConfig';
import { token, newHouse, invalidHouse1 } from './dummy';

const { expect } = chai;

chai.use(chaiHttp);

describe('LANDLORD SHOULD BE ABLE TO POST HOUSE ', () => {
  it('should return status 401 with an error un authorized access ', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')

      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error').eqls('unauthorized access. login or register');
      });
  });

  it('should return status 400 with an error number of rooms can not be 0', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')
      .set('Authorization', token)
      .field(invalidHouse1)
      .attach('images', fs.readFileSync('UI/img/three.jpg'), 'three.jpg')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
      });
  });
  it('should return status 201 with data of the house information', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')
      .set('Authorization', token)
      .field(newHouse)
      .attach('images', fs.readFileSync('UI/img/three.jpg'), 'three.jpg')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('success').equals('House successfully posted');
      });
  });

  it('should return status 403 with an error Invalid token', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')
      .set('Authorization', 'invalidToken')
      .field(newHouse)
      .attach('images', fs.readFileSync('UI/img/three.jpg'), 'three.jpg')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error').eqls('jwt malformed');
      });
  });
  House.destroy({ truncate: true, cascade: false });
});

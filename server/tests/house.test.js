import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
// import House from '../config/dbConfig';
import { newHouse } from './dummy';

const { expect } = chai;

chai.use(chaiHttp);

describe('LANDLORD SHOULD BE ABLE TO POST HOUSE ', () => {
  it('should return status 201 with data of the house', () => {
    chai
      .request(app)
      .post('/api/v1/houses/')
      .field(newHouse)
      .attach('images', fs.readFileSync('UI/img/three.jpg'), 'three.jpg')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('success').eql('House successfully posted');
      });
  });
  // House.destroy({ truncate: true, cascade: false });
});

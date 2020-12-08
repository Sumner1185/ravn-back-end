const supertest = require('supertest');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const app = require('../src/app');

chai.use(sinonChai);
const server = supertest.agent(app);
const expect = require('chai').expect;

describe('Index page test', () => {
  it('gets base url', (done) => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome! Successful connection');
        done();
      });
  });
});

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../index');

describe('Get /apps,', () => {
  it('should return an array of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        res.body.forEach(thing => expect(thing).to.have.any.keys('App'));
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'category' })
      .expect(400, 'sort value must either be rating or app');
  });

  it('should sort by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'rating' })
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        let i = 0;
        let sorted = true;
        while (sorted && i > res.body.length - 1) {
          if (Number(res.body[i].Rating) > Number(res.body[i + 1].Rating)) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort by app', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'app' })
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        let i = 0;
        let sorted = true;
        while (sorted && i > res.body.length - 1) {
          if (res.body[i].App > res.body[i + 1].App) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});

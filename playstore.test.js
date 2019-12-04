const { expect } = require('chai');
const supertest = require('supertest');
const app = require('./index');

describe('Get /apps,', () => {
    it.only('should return an array of apps', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        
    })

    it('should be 400 if sort is incorrect', () => {

    })

    it('should sort by rating', () => {

    })

    it('should sort by app', () => {

    })

})
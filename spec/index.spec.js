process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { expect } = require('chai');
const seedDB = require('../seed/seed');
const { topics, users, articles, comments } = require('../seed/testData')


describe('/api', function()  {
    let articlesDocs, commentsDocs, topicsDocs, usersDocs;
  
    beforeEach(() => {
        return seedDB( topics, users, articles, comments )
        .then(docs => {
            [topics, users, articles, comments] = docs;
        })
        .catch(err => {
            console.log('.....', err);
        })
    })
    after(() => {
        return mongoose.disconnect();
    })
    describe('/topics', () => {
        it('returns 200 for any method on non-existant url', () => {
            return request.get('/api/topics')
            .expect(200)
            .then()
        })  
    })
})
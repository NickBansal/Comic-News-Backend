process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const { expect } = require('chai');
const seedDB = require('../seeds/seed');
const data  = require('../seeds/testdata')


describe('/api', () => {
    let articlesDocs, commentsDocs, topicsDocs, usersDocs;
    beforeEach(() => {
        return seedDB(data)
        .then(docs => {
            [articlesDocs, commentsDocs, topicsDocs, usersDocs] = docs;
        })
    })
    describe('/articles', () => {
        it('', () => {
            expect(usersDocs.name).to.equal('jonny')
        })
    })
})


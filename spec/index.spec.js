process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { expect } = require('chai');
const seedDB = require('../seed/seed');
const { topics, users, articles, comments } = require('../seed/testData');
const { Article } = require('../models')


describe('/api', function()  {
    let articlesDocs, commentsDocs, topicsDocs, usersDocs;
    this.timeout(8000)
    beforeEach(() => {
        return seedDB( topics, users, articles, comments )
        .then(docs => {
            [topicsDocs, usersDocs, articlesDocs, commentsDocs] = docs;
        })
        .catch(err => {
            console.log('.....', err);
        })
    })
    after(() => {
        return mongoose.disconnect();
    })
    it('returns a 200 on the API route page', () => {
        return request.get('/api')
        .expect(200)
    })
    describe('/api/wrongurl', () => {
        it('return 404 error when passed a wrong url', () => {
            return request.get('/api/wrongurl')
            .expect(404)
            .then(res => {
                expect(res.body.msg).to.equal('/api/wrongurl does not exist')
            })
        })
    })
    describe('/topics', () => {
        it('returns 200 and a topic object', () => {
            return request.get('/api/topics')
            .expect(200)
            .then(() => {
                expect(topicsDocs.title).to.equal('Mitch')
                expect(topicsDocs.slug).to.equal('mitch')
            })
        })
        describe('/topics/nick/articles', () => {
            it('returns a 400 for a request with no articles', () => {
                return request.get('/api/topics/nick/articles')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal(`nick does not have any articles available`)
                })
            })
        })
        describe('/topics/mitch/articles', () => {
            it('returns a 200 when passed a user with articles available', () => {
                return request.get('/api/topics/mitch/articles')
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.lengthOf(2)
                    expect(res.body[0].belongs_to).to.equal('mitch')
                })
            })
        })
        describe.only('/topics/mitch/articles', () => {
            it('POST returns a new object and 200 status', () => {
                return request.post('/api/topics/mitch/articles')
                .send({
                    title: "new article", 
                    body: "This is my new article content",
                    belongs_to: "mitch",
                    created_by: "This has a mongo_id"
                })
                .expect(200)
            })
        })
    })
    describe('/users', () => {
        it('returns 200 and an users object', () => {
            return request.get('/api/users')
            .expect(200)
            .then(() => {
                expect(usersDocs.name).to.equal('jonny')
                expect(usersDocs).to.have.property('username')
            })
        })
    })
    describe('/articles', () => {
        it('returns 200 and an articles object', () => {
            return request.get('/api/articles')
            .expect(200)
            .then(() => {
                expect(articlesDocs.title).to.equal('Living in the shadow of a great man')
                expect(articlesDocs).to.be.a('object')
            })
        })
    })
    describe('/comments', () => {
        it('returns 200 and an comments object', () => {
            return request.get('/api/comments')
            .expect(200)
            .then(() => {
                expect(commentsDocs).to.have.property('body')
                expect(commentsDocs.votes).to.equal(7)
            })
        })
    })
})
process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { expect } = require('chai');
const seedDB = require('../seed/seed');
const { topics, users, articles, comments } = require('../seed/testData');


describe('/api', function()  {
    let articlesDocs, commentsDocs, topicsDocs, usersDocs;
    this.timeout(20000)
    beforeEach(() => {
        return seedDB( topics, users, articles, comments )
        .then(docs => {
            [topicsDocs, usersDocs, articlesDocs, commentsDocs] = docs;
        })
        .catch(console.log)
    })
    after(() => mongoose.disconnect())

    it('returns a 200 on the API route page', () => {
        return request.get('/api')
        .expect(200)
    })

    describe('/api/wrongurl', () => {
        it('GET returns 404 error when passed a wrong url', () => {
            return request.get('/api/wrongurl')
            .expect(404)
            .then(res => {
                expect(res.body.msg).to.equal('/api/wrongurl does not exist')
            })
        })
    })

    // TOPICS TESTING!!!

    describe('/topics', () => {
        it('GET returns 200 and a topic object', () => {
            return request.get('/api/topics')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.lengthOf(2)
                expect(res.body[0].title).to.equal('Mitch')
                expect(res.body[0].slug).to.equal('mitch')
            })
        })
        describe('/:topic_slug/articles', () => {
            it('GET returns a 400 for a request with no articles', () => {
                return request.get('/api/topics/nick/articles')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal(`nick does not have any articles available`)
                })
            })
            it('GET returns a 200 when passed a user with articles available', () => {
                return request.get(`/api/topics/${topicsDocs.slug}/articles`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.lengthOf(2)
                    expect(res.body[0].belongs_to).to.equal('mitch')
                    expect(res.body[0]).to.have.property('comment_count')
                })
            })
            it('POST returns a new object and 200 status', () => {
                return request.post(`/api/topics/${topicsDocs.slug}/articles`)
                .send({
                    title: "new article", 
                    body: "This is my new article content",
                    created_by: `${usersDocs._id}`
                })
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.property('belongs_to')
                    expect(res.body).to.be.an('object')
                    expect(res.body.title).to.equal('new article')
                })
            })
            it('POST returns an error when post fields are missing', () => {
                return request.post(`/api/topics/${topicsDocs.slug}/articles`)
                .send({
                    title: "new article" 
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('Bad request')
                })
            })
            it('GET returns a 404 error when passed a wrong url', () => {
                return request.get(`/api/topics/${topicsDocs.slug}/wrongurl`)
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal(`/api/topics/${topicsDocs.slug}/wrongurl does not exist`)
                })
            })
        })
    })

    // USERS TESTING!!

    describe('/users', () => {
        it('GET returns 200 and an users object', () => {
            return request.get('/api/users')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.length(2)
                expect(res.body[0].name).to.equal('jonny')
                expect(res.body[0]).to.have.property('username')
            })
        })
        describe('/:username', () => {
            it('GET returns 200 and the users profile', () => {
                return request.get(`/api/users/${usersDocs.username}`)
                .expect(200)
                .then(res => {
                    expect(res.body.username).to.equal(`${usersDocs.username}`)
                    expect(res.body).to.be.an('object')
                })
            })
            it('GET returns 400 with an unknown username', () => {
                return request.get('/api/users/nick')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('nick is not a valid profile')
                })
            })
        })
    })

    // ARTICLES TESTING!!!

    describe('/articles', () => {
        it('GET returns 200 and an article object', () => {
            return request.get('/api/articles')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.lengthOf(4)
                expect(res.body[0]).to.have.property('comment_count')
                expect(res.body[0].title).to.equal('Living in the shadow of a great man')
                expect(res.body[3].body).to.equal('Bastet walks amongst us, and the cats are taking arms!')
            })
        })
        describe('/:article_id', () => {
            it('GET returns 400 and a error message when given a wrong article ID', () => {
                return request.get(`/api/articles/wrongarticleId`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('Bad request')
                })
            })
            it('GET returns 200 and a specific article', () => {
                return request.get(`/api/articles/${articlesDocs._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.property('body')
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('comment_count')
                    expect(res.body.comment_count).to.equal(4)
                })
            })
            it('GET returns 400 when given a wrong but valid id', () => {
                return request.get(`/api/articles/${usersDocs._id}`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal(`${usersDocs._id} is not a valid article Id`)
                })
            })
            it('PATCH returns 200 and an updated vote_count', () => {
                return request.patch(`/api/articles/${articlesDocs._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('votes')
                    expect(res.body.votes).to.equal(1)
                })
            })
            describe('/comments', () => {
                it('GET returns 200 and all comments for a specific article', () => {
                    return request.get(`/api/articles/${articlesDocs._id}/comments`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.lengthOf(4)
                        expect(res.body[0]).to.have.property('belongs_to')
                        expect(res.body[1]).to.have.property('body', 'This morning, I showered for nine minutes.')
                    })
                })
                it('POST returns 200 and creats a new comment', () => {
                    return request.post(`/api/articles/${articlesDocs._id}/comments`)
                    .send({
                        body: "A new Comment"
                    })
                    .expect(200)
                    .then(res => {
                        expect(res.body.body).to.equal("A new Comment")
                        expect(res.body).to.have.property('created_by')
                        expect(res.body.belongs_to).to.equal(`${articlesDocs._id}`)
                    })
                })
                it('POST returns 400 if fields are missing from the post', () => {
                    return request.post(`/api/articles/${articlesDocs._id}/comments`)
                    .send({
                        title: "Wrong field"
                    })
                    .expect(400)
                    .then(res => {
                        expect(res.body.msg).to.equal('Bad request')
                    })
                })
                it('GET returns a 404 - invalid address', () => {
                    return request.get(`/api/articles/${articlesDocs._id}/wrongurl`)
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal(`/api/articles/${articlesDocs._id}/wrongurl does not exist`)
                    })
                })
            })
        })
    })

    // COMMENTS TESTING!!

    describe('/comments', () => {
        it('GET returns 200 and an comments object', () => {
            return request.get('/api/comments')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.lengthOf(8)
                expect(res.body[0]).to.have.property('body')
                expect(res.body[0].votes).to.equal(7)
            })
        })
        describe('/:comment_id', () => {
            it('PATCH returns 200 and an updated votecount for a comment', () => {
                return request.patch(`/api/comments/${commentsDocs._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body.votes).to.equal(6)
                    expect(res.body).to.have.keys('body', 'votes', 'created_at', 'belongs_to', 'created_by', '__v', '_id' )
                })
            })
            it('PATCH returns 400 if a wrong but valid mongo_id', () => {
                return request.patch(`/api/comments/${usersDocs._id}?vote=down`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal(`${usersDocs._id} is not a correct comment_id`)
                })
            })
            it('PATCH return 400 if an invalid comment_id', () => {
                return request.patch(`/api/comments/nick`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('Bad request')
                })
            })
            it.only('DELETE returns 200 and deletes the specific comment', () => {
                return request.delete(`/api/comments/${commentsDocs._id}`)
                .expect(204)
                .then(res => {
                    expect(res.body).to.be.an('object').that.is.empty
                })
            })
            it('DELETE returns 400 if given a wrong but valid mongo Id', () => {
                return request.delete(`/api/comments/${usersDocs._id}`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal(`${usersDocs._id} has no associated comments`)
                })
            })
        })
    })
})
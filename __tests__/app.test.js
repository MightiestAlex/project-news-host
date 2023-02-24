const app = require('../server.js');
const db = require('../db/connection.js');
const request = require('supertest');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js')


describe('server.js', ()=> {
    beforeEach(()=>{return seed(testData)})
    afterAll(() => {return db.end()})

    describe('api', ()=>{
        describe('/topics', ()=>{
            describe('GET/topics', ()=>{
                test('200: returns array of objects from SQL: table topics', ()=>{
                    return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then((response)=>{
                        const { topics } = response.body                        
                        expect(topics).toHaveLength(3)
                            topics.forEach((element)=>{
                            return expect(element).toMatchObject({
                                    slug: expect.any(String),
                                    description: expect.any(String)
                            })
                        })    
                    })
                })
            })
        })

        describe('/articles', ()=>{
            describe('GET/articles', ()=>{
                test('200, Returns array of objects from SQL: joined tables articles and comments', ()=>{
                    return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then((response)=>{
                        const { articles } = response.body;
                        
                        expect(articles).toHaveLength(12)
                        articles.forEach((element)=>{
                                expect(element).toMatchObject({
                                    article_id: expect.any(Number),
                                    author: expect.any(String),
                                    title: expect.any(String),
                                    topic: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: expect.any(Number),
                                    comment_count: expect.any(Number),
                                    article_img_url: expect.any(String)
                                })
                                expect(articles).toBeSorted({
                                descending: true,
                                key: 'created_at'
                            })
                        })
                    })                 
                })
            })
            describe('GET/articles/:articles', ()=>{
                test('200, returns correct article object from SQL when passed an article_id', ()=>{
                    return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then((response)=>{
                        const { article } = response.body;

                        expect(article.article_id).toBe(1)   
                        expect(article).toMatchObject({
                            article_id: 1,
                            author:'butter_bridge',
                            title: 'Living in the shadow of a great man',
                            topic: 'mitch',
                            created_at: "2020-07-09T20:11:00.000Z",
                            votes: 100,
                            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                        })                    
                    })
                })
                test('400, Returns error if the request parameter is invalid', ()=>{
                    return request(app)
                    .get('/api/articles/a')
                    .expect(400)
                    .then((response)=>{
                        expect(response.body.msg).toBe('Invalid article id‽')
                    })
                })
                test('404, Returns error if the request paramaeter is correctly formatted yet no article exists', ()=>{
                    return request(app)
                    .get('/api/articles/14')
                    .expect(404)
                    .then((response)=>{
                        expect(response.body.msg).toBe('Article not found check article_id.')
                    })
                })
            })
            describe('GET/articles/:articles/comments', ()=>{
                test('200, Returns a comment array with the correct elements and keys',()=>{
                    return request(app)
                    .get('/api/articles/1/comments')
                    .expect(200)
                    .then((response)=>{
                        const { comments } = response.body
                        expect(comments).toHaveLength(11)         
                        comments.forEach((element)=>{
                            expect(element).toMatchObject({
                                comment_id: expect.any(Number),
                                body: expect.any(String),
                                article_id: expect.any(Number),
                                author: expect.any(String),
                                votes: expect.any(Number),
                                created_at: expect.any(String)
                            })
                        })
                    })
                })
                test('200, Returns an empty array when article has no comments', ()=>{
                    return request(app)
                    .get('/api/articles/12/comments')
                    .expect(200)
                    .then((response)=>{
                        const { comments } = response.body
                        expect(comments).toEqual([])
                    })
                })
                test('400, Returns an error if the request paramater is invalid', ()=>{
                    return request(app)
                    .get('/api/articles/13a/comments')
                    .expect(400)
                })    
                test('404, Returns an error when article does not exist', ()=>{
                    return request(app)
                    .get('/api/articles/13/comments')
                    .expect(404)
                })
            })
            describe('PATCH/articles/:articles_id', ()=>{
                test('Returns correctly patched object', ()=>{
                    return request(app)
                    .patch('/api/articles/1/')
                    .send({"inc_votes":140})
                    .expect(200)
                    .then((response)=>{
                        const {article} = response.body
                        expect(article.votes).toBe(240)
                        expect(article).toMatchObject({       
                            article_id: 1,
                            title: "Living in the shadow of a great man",
                            topic: "mitch",
                            author: "butter_bridge",
                            body: "I find this existence challenging",
                            created_at: "2020-07-09T20:11:00.000Z",
                            votes: 240,
                            article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"                          
                        })                      
                    })                   
                })
                test('400, Returns an error if the request paramater is invalid', ()=>{
                    return request(app)
                    .patch('/api/articles/13a/')
                    .send({"inc_votes":140})
                    .expect(400)
                })    
                test('404, Returns an error when article does not exist', ()=>{
                    return request(app)
                    .patch('/api/articles/13/')
                    .send({"inc_votes":140})
                    .expect(404)
                })
                test('200, ignores supurfluous properties', ()=>{
                    return request(app)
                    .patch('/api/articles/1/')
                    .send({
                        "inc_votes":140,
                        "goblins": 2,
                    })
                    .expect(200)
                    .then((response)=>{
                        const {article} = response.body
                        expect(article).toMatchObject({       
                            article_id: 1,
                            title: "Living in the shadow of a great man",
                            topic: "mitch",
                            author: "butter_bridge",
                            body: "I find this existence challenging",
                            created_at: "2020-07-09T20:11:00.000Z",
                            votes: 240,
                            article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"                          
                        })                      
                    })
                })
                test('400, inc_votes key is undefined', ()=>{
                    return request(app)
                    .patch('/api/articles/1/')
                    .send({"NotanExpectedKey":140})
                    .expect(400)
                })
                test('400, inc_votes property is not a number', ()=>{
                    return request(app)
                    .patch('/api/articles/1/')
                    .send({"inc_votes":"stringly"})
                    .expect(400)
                } )
            })
        })
        describe('/comments', ()=>{
            describe('POST/api/articles/:article_id/comments', ()=>{
                test('201, Correct comment has been added', ()=>{
                    return request(app)
                        .post('/api/articles/11/comments')
                        .send({
                            "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                            "username": "icellusedkars"
                            })
                        .expect(201)
                        .then((response)=>{
                            const {author, body} = response.body.post
                            expect(author).toBe('icellusedkars')
                            expect(body).toBe('Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.')
                        })
                })
                test('201, Ignores unecessary properties', ()=>{
                    return request(app)
                    .post('/api/articles/11/comments')
                    .send({
                        "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                        "username": "icellusedkars",
                        "goblins": 2
                        })
                    .expect(201)
                    .then((response)=>{
                        expect(response.body.post).toEqual(
                        {
                        "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                        "author": "icellusedkars"
                        })
                    }) 
                })
                test('400, request paramater is invalid', ()=>{
                    return request(app)
                    .post('/api/articles/a/comments')
                    .send(    
                        {
                        "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                        "username": "icellusedkars"
                        })
                    .expect(400)
                })    
                test('404, article does not exist', ()=>{
                    return request(app)
                    .post('/api/articles/13/comments')
                    .send(    
                        {
                        "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                        "username": "icellusedkars"
                        })
                    .expect(404)
                })
                test('400, username and/or body property not on post body', ()=>{
                    return request(app)
                    .post('/api/articles/11/comments')
                    .send(    
                        {}
                        )
                    .expect(400)
                })
                test('404, username does not exist', ()=>{
                    return request(app)
                    .post('/api/articles/11/comments')
                    .send(    
                        {
                        "body": "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
                        "username": "MightyAlex"
                        })
                    .expect(404)
                    .then((response)=>{
                        expect(response.body.msg).toBe('Invalid username')
                    })
                })
            })
        })
        describe('/users', ()=>{
            describe('GET/api/users', ()=>{
                test('200, Complete array of all users',()=>{
                    return request(app)
                    .get('/api/users')
                    .expect(200)
                    .then((response)=>{
                        const { users } = response.body
                        expect(users).toHaveLength(4)
                        
                        users.forEach((element)=>{
                            expect(element).toMatchObject({
                                username: expect.any(String),
                                name: expect.any(String),
                                avatar_url: expect.any(String)
                            })
                        })
                    })
                })
            })
        })
    })
})

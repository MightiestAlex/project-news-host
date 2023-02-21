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
                        const { articles } = response.body
                        expect(articles).toHaveLength(12)
                        articles.forEach((element)=>{
                                expect(element).toMatchObject({
                                article_id: expect.any(Number),
                                author: expect.any(String),
                                title: expect.any(String),
                                topic: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String),
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
        })
    })
})

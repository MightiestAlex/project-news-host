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

            describe('GET', ()=>{
                test('200: returns an array of objects from table topics', ()=>{
                    return request(app)
                        .get('/api/topics')
                        .expect(200)
                        .then((res)=>{
                            let { topics } = res.body
                            expect(topics).toHaveLength(3)
                             topics.forEach((element)=>{console.log(element)
                                return expect(element).toMatchObject({
                                    slug: expect.any(String),
                                    description: expect.any(String)
                                })
                            })    
                        })
                })
            })
        })
    })
})

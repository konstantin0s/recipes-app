const request = require('supertest');
const express = require('express'); 
const app = require('../routes/auth');
 
// test("Shoud sing up for a user", async () => {
//     await request(app).post('/signup')
//     .send({
//         username: 'test',
//         password: 'test123'
//     })
//     expect(201)
//     console.log('say pula')
// })

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
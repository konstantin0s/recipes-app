const request = require('supertest')


  process.env.NODE_ENV = 'test';

  const axios = require('axios');
// const request = require('supertest')
const app = require('../routes/recipes')
const auth = require('../routes/auth')


// describe('Get@/recipes',  () => {
//   it('should get a  with status 200', async () =>{
//    const result = await axios.get('http://localhost:5000/recipes', {
//       title: 'Rocky',
//       genre: 'Action',
//       plot: 'Silverster Stalone'
//     })
//     .then(function (response) {
//       console.log(response);
//       console.log('result', result);
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//   })
// });

// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await axios.post('hhtp://localhost:5000/films/add', {
//         title: 'Super Star',
//       genre: 'Action',
//       plot: 'Bebe lush',
//       id: 123
//       })
//       .then(function (result) {
//         // console.log('result post', result);
//         expect(res.statusCode).toEqual(200)
//         expect(res.statusMessage).toEqual('OK')
//         expect(res).toEqual({
//           title: 'Super Star',
//           genre: 'Action',
//           plot: 'Bebe lush',
//           id: 123
//               })
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//   })
// })



// describe('GET Endpoints', () => {
//   it('should get all recipes', async () => {
//     const res = await axios.get('http://localhost:5000/recipes', {
//   })
//   console.log('res', res);
//   expect(res.statusCode).toEqual(200)
//   expect(res.body).toHaveProperty('recipes')
// })
// });

// describe('Post Endpoints', () => {
//   it('should create a new user', async () => {
//     const res = await request('http://localhost:5000/signup')
//       .post('/signup')
//       .send({
//         id: 1,
//         username: 'testol',
//         password: 12345
//       })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHaveProperty('username')
//   })
// })

// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })


// // const chai = require('chai');
// // const chaiHttp = require('chai-http');
// // const tvmaze = require('../routes/tvmaze');
// // let should = chai.should();
// // // let expect = require('expect');
// // const expect = require('chai').expect;
// // chai.use(chaiHttp);


    describe('/GET all recipes', () => {
   it('should get a  with status 200', async () =>{
        const result = await axios.get('http://localhost:5000/recipes', {
    })
    .then(function (response) {
      // console.log(response);
      // console.log('result', result);
      expect(response.statusCode).toEqual(200)
            // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
        
        });
      });

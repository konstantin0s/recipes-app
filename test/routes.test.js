const request = require('supertest')


  process.env.NODE_ENV = 'test';

  const axios = require('axios');
// const request = require('supertest')
const app = require('../routes/recipes')
const auth = require('../routes/auth')




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

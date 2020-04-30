

// Recipes.find({}).removeAsync()
// .then(() => {
//   Recipes.create({
//     title: 'Soup',
//     level: 'easy',
//     ingredients: 'carrots, onions',
//     cuisine: 'italian',
//     dishType: 'dinner',
//     image: 'https://unsplash.com/photos/al9eh9QkdPA',
//     duration: 33,
//     creator: 'Gina',
//     created: '22-01-2019'
//   });
// });

let faker = require('faker');
let Recipes = require('./models/recipes');
    const mongoose = require('mongoose');
    require('dotenv').config();

    // connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });
    
  

    // remove all data from the collection first
    Recipes.find({})
        .then(() => {
            let recipes = [];
            for (let i = 0; i < 30; i++) {
                recipes.push({
                    title: faker.name.title(),
                    level: faker.name.findName(),
                    ingredients: faker.name.findName(),
                    cuisine: faker.lorem.sentence(),
                    image: faker.image.image(),
                    dishType: faker.date.past(),
                    duration: faker.date.recent()
                }); 
            }
            return Movie.create(movies);
        })
        .then(() => {
            console.log('The seeds are planted :)')
            process.exit();
        })
        .catch((e) => {
            console.log(e);
            process.exit(1);
        });
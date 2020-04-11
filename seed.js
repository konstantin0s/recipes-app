let Recipes = require('./models/recipes');

Recipes.find({}).removeAsync()
.then(() => {
  Recipes.create({
    title: 'Soup',
    level: 'easy',
    ingredients: 'carrots, onions',
    cuisine: 'italian',
    dishType: 'dinner',
    image: 'https://unsplash.com/photos/al9eh9QkdPA',
    duration: 33,
    creator: 'Gina',
    created: '22-01-2019'
  });
});
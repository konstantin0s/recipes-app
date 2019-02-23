let mongoose = require('mongoose');

//Movie schema
let recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  cusine: {
    type: String,
    required: true
  },
  disType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});

let Recipes = module.exports = mongoose.model('Recipes', recipeSchema);

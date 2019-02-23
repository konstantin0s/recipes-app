let mongoose = require('mongoose');

//Movie schema
let recipesSchema = mongoose.Schema({
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
  dishType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
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

let Recipes = module.exports = mongoose.model('Recipes', recipesSchema);

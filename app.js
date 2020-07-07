const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');
const flash = require('req-flash');

require("dotenv").config();

const app = express();
app.use(cookieParser());


hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

//database on constantintofan85@gmail.com account - mongo db atlas
//ADD YOUR ENV VAR TO HEROKU CONFIG VARS
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function(req, res) {
    res.cookie('name', 'recipes'); //Sets name = recipes
    res.render('index');
});


//add session
app.use(session({
    secret: "basic-auth-secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 900000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    })
}));

//display message on update/delete..
app.use(flash());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



app.locals.title = 'CuiSZone';

const index = require('./routes/index');
app.use('/', index);

const password = require('./routes/password');
app.use('/', password);

const authRouter = require('./routes/auth');
app.use('/', authRouter);


app.use((req, res, next) => {
    if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
        next(); // ==> go to the next route ---
        // let user = req.session.currentUser;
        // res.json(user);
    } else { //    |
        res.redirect("/login"); //    |
    } //    |
});

const recipes = require('./routes/recipes');
app.use('/', recipes);
const recipe = require('./routes/recipe');
app.use('/', recipe);
const addRecipe = require('./routes/addRecipe');
app.use('/', addRecipe);
const edit = require('./routes/edit');
app.use('/', edit);
const deleteRecipe = require('./routes/delete');
app.use('/', deleteRecipe);

;

app.listen(process.env.PORT || 5000, function() {
    console.log("Server started on port 5000 :)");
});

//close mongodb
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

module.exports = app;
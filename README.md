# recipes-app
Create a recipe App with Nodejs, Express &amp; MongoDb

1. clone repo
2. Run: " npm install "
3. Create .env file in root folder.
4. Add mongodb connection link, and other variables used across whole project(variables from test folder) into env file and assign it to a variable, use this variable in your app.js file
5. Add < "start": "nodemon app.js" > in your package.json file.
6. Run < nodemon app > in your terminal, in root folder.
7. Open the app in your browser ( ie. http://localhost:5000 )
8. To run tests (jest), type into your terminal: "npm test"

(deploy with codeship).
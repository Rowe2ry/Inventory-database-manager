const express = require('express'); // to create api HTTP methods
const routes = require('./routes'); // to route the URL to the HTTP requests
const sequelize = require('./config/connection') // to access ad interface with the database

const app = express(); // initialize the applicaiton
const PORT = process.env.PORT || 3001; // default 3001 or whatever is available

app.use(express.json()); // add the ability to work with json files
app.use(express.urlencoded({ extended: true })); // add the ability to pull paramters from user supplied URLs

// make the routes work
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force : false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
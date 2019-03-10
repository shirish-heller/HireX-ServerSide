const express = require('express');
const mongoose = require('mongoose');
const createMongoCollections = require('./src/models/indexModel');
const routerConfig = require('./src/routerConfig');
const dotenv = require('dotenv');
const cors = require('cors');

/**
 * Load env variables
 */

dotenv.config();
/**
 * Load the app
*/
app = express();
/**
 * Make Mongo Connection
*/
let connect = mongoose.connect("mongodb://localhost:27017/intuit",{
  useNewUrlParser: true,
  keepAlive:1
});

let conn = mongoose.connection;

conn.on('error',() => {
  console.log("Error in connecting with the database");
  server.close();
})

conn.on('open',() => {
  console.log("Successful in connecting with the database");
  createMongoCollections.createCollections();
})

app.use(cors());

/**
 * Mount the router config
 */
routerConfig.mount(app);
/**
 * Start the application
 */
let server = app.listen(5000,() => {
  console.log("Server running on port 5000");
})
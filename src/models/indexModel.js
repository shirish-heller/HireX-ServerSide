const mongoose = require('mongoose');
const userSchemaName = require('./userModel');
const jobPostSchemaName = require('./jobPostModel');
const bidSchemaName = require('./bidModel');

//Make an array of schema imports
let schemaImportArray = [userSchemaName,jobPostSchemaName,bidSchemaName];

//loop over the entire array and create collections
createCollections = () => {
    for(let i = 0;i<=schemaImportArray.length-1;i++){
      mongoose.connection.db.createCollection(schemaImportArray[i].modelName);
      console.log(`Created Mongo Collection with name ${schemaImportArray[i].modelName}`);
    }
  }

  module.exports = {
    createCollections
  }
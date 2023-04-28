//Define the database for the development environment
const localDB = "mongodb://localhost:27017/bloggy";
//Environment variable MONGODB_URI will be available in Heroku production environment.
//Otherwise use the development databse
const currentDB = process.env.MONGODB_URI || localDB;

//Exports the appropriate database on the current environment
module.exports = currentDB;

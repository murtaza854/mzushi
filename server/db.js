const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DATABASE_URL;

var _db;

const createServer = async ( callback ) => {
  await mongoose.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true });
  _db  = mongoose.connection;
}

module.exports = {
  connectToServer: createServer,
  getDb: function() {
    return _db;
  }
};
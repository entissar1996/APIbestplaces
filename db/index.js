require('dotenv').config()
const mongoose = require('mongoose');
const config=require('../config/db_connect');

const DB_URI = process.env.MONG_DB_CONNECTION_STRING || 'mongodb://localhost:27017/bestplace';


function connect() {
  return new Promise((resolve, reject) => {
  console.log(process.env.MONG_DB_CONNECTION_STRING)
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true ,useFindAndModify:false })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        })
    } else {
        mongoose.connect(DB_URI,
          { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:false })
          .then((res, err) => {
            if (err) return reject(err);
            resolve(res);
          })
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
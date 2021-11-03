require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const multer=require('multer')


const usersRouter = require('./auth/users');





// setting up express app
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// api endpoint
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:'500 Server error :('});
});
//images upload
app.use('/uploads', express.static(__dirname +'/uploads'));
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname)
    }
  })

  var upload = multer({ storage: storage })
  app.post('/upload', upload.single('myFile'), async(req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }


      const imagepost= new model({
        image: file.path
      })
      const savedimage= await imagepost.save()
      res.json(savedimage)

  })

  app.get('/image',async(req, res)=>{
   const image = await model.find()
   res.json(image)

  })
  app.use('/uploads', express.static(__dirname +'/uploads'));
module.exports = app;

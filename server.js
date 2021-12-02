require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

const usersRouter = require('./auth/users');
const avatarRouter =require('./auth/uploadsavatar');
const postRouter = require('./profile/posts/postroute');
const commentsRouter = require('./profile/comments/commentsroute');
const markersRouter = require('./markers/marker.route');

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
app.use('/markers', markersRouter);
app.use('/uploadsavatar', avatarRouter);
app.use('/uploadsavatar',express.static(path.join(__dirname, 'uploads')), avatarRouter);

// images upload
/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use('/uploadsavatar1', express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')));*/
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);

/* app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {

  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = req.file.path

  return res.send(response)
})

 app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    console.log(JSON.stringify(req.file))

    for(var i=0;i<req.files.length;i++){
       var response += req.files[i].path;
    }

    return res.send(response)
}) */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)) ;
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: '500 Server error :('});
});

module.exports = app;

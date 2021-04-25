const  createError = require('http-errors');
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const passport =  require('passport')
const mongoose = require('mongoose');
const session = require('express-session')
const User = require('./models/user');
const  indexRouter = require('./routes/index');
const  postRouter = require('./routes/posts');
const  usersRouter = require('./routes/users');


const  app = express();
// conect to DB

mongoose.connect('mongodb+srv://admin:h5VtkVVkwL1v1WZx@cluster0.3oqox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db  = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
  console.log('we connected');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// config passport and session
app.use(session({
  secret: 'hang ten dude!',
  resave: false,
  saveUninitialized: true,

})) 

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/posts',postRouter);
app.use('/', indexRouter);
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
  res.render('error');
});

module.exports = app;

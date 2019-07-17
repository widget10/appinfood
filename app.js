var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport=require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose=require('passport-local-mongoose');
var mongoose=require('mongoose');
var User = require('./models/user');
var  sass    = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const session =require("express-session");
var MongoStore = require('connect-mongo')(session);


const SendOtp = require('sendotp');
// const sendOtp = new SendOtp('285517A3lUDFLUd5d2ebf40', 'Otp for your FOODHUB is {{otp}}, please do not share it with anybody');

// sendOtp.send("7839156089", "PRIIND", function (error, data) {
//   console.log(data);
// });
//Database connection here
// mongoose.Promise=global.Promise;



// const multer = require('multer');
mongoose.connect('mongodb://localhost:27017/FoodData');
 

// const storage =multer.diskStorage({
//   dsetination:function(req,res,cb){
//     cb(null,'uploads/')
//   }
// });


// const upload = multer({
//   storage: storage
// });

// Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: 'mongodb://localhost:27017/FoodData',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });


//  All Routes here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var adminRouter = require('./routes/admin')
var custRoutes = require('./routes/customer');
var shoppingcartRouter= require('./routes/shoppingcart');






// express app here
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares here
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(session({
secret:"any english sentence to encode or decode",
resave:false,
saveUninitialized:false,
store: new MongoStore({mongooseConnection : mongoose.connection}),
cookie :{ maxAge:180*60*1000}
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  sassMiddleware({
      src: __dirname + '/sass', 
      dest: __dirname + '/public/stylesheets',
      prefix:  '/stylesheets',
      debug: true,         
  })
);    

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.session = req.session;
next();
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/admin',adminRouter);
app.use('/customer', custRoutes);
app.use('/shoppingcart',shoppingcartRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

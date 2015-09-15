
/**
 * Module dependencies.
 */

var blog = require('./controller/blog');
var user = require('./controller/user');
var express = require('express');
var path = require('path');
var Loader = require('loader');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var errorhandler = require('errorhandler');
var config = require('./config');
var _ = require('lodash');

var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set static, dynamic helpers
_.extend(app.locals, {
  config: config,
  //Loader: Loader
});

//app.use(user.auth);

//列表
app.get('/', blog.list);
app.get('/blog', blog.list);
app.get('/blog/:id', blog.detail);
app.post('/blog/remove/:id', blog.remove);
app.get('/note', blog.list);

//关于
//app.get('/about', about.me);

//内容查看
//app.get('/detail', blog.detail);

//用户信息
//app.get('/users', users.list);
//app.get('/proinfo', users.proinfo);

//内容编辑
app.get('/post', blog.post);
app.post('/post', blog.postSave);
app.get('/blog/edit/:id',blog.edit);

//登录注册
app.get('/signin',user.login);
app.post('/signin', user.postLogin);
app.get('/signup',user.register);
app.post('/signup',user.postRegister);
app.get('/password_reset',user.password_reset);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!config.debug) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}else{
  app.use(function (err, req, res, next) {
    return res.send(500, '500 status');
  });
}


module.exports = app;
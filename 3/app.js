var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var ejs = require('ejs');


var http = require('http').createServer(app);
var io = require('socket.io')(http);

const models = require('./models/Article.js');
const Article = models.Article;


// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/message_board'
  , options = {};
  
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};
  
mongoose.createConnection(connectionString, options, function(err, res) {  
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connectionString);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




io.on('connection',function(socket){

    socket.on("post_article",function(data){

        var article = new Article({ 
            user_name : data.user_name,
            content : data.content
        }); 
        article.save();
        //send article to all user 
        socket.emit("add_article",article);
        socket.broadcast.emit("add_article",article);

        
    });
});

http.listen(3000,function(){
    console.log("listening on port 3000");
});



module.exports = app;

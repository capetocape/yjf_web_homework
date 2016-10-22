var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/message_board');

var Article = require('../models/Article.js').Article;
/* GET home page. */
router.get('/', function(req, res, next) {
    Article.fetch(function(error,result){
        res.render('index', { articles:result});
    });
});



module.exports = router;

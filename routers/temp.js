var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  //llog("liao11833");
  //res.render('index', { title: 'Express' });


  log("liao1938,,");


  var col = ct.mongo.test;
  col.findOne(res, {age:ct.utils.random()}, function(ret) {
    return res.send({code: 1});
  });


  //res.send({key: "hello,world"});
});

module.exports = router;


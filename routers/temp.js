var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  //llog("liao11833");
  //res.render('index', { title: 'Express' });


  log("liao1938,,");


  var col = ct.mongo.test;

  //读
  //col.findOne(res, {age:ct.utils.random(0,100000)}, function(ret) {
  //  return res.send({code: 1,data: ret});
  //});
  //col.findOne(res, {age: ct.utils.radom()})
  //col.insertOne

  //写
  col.insertOne(res, {age:ct.utils.random(0,100000)}, function(ret) {
    return res.send({code: 1,data: ret});
  });


  //res.send({key: "hello,world"});
});

module.exports = router;


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //llog("liao11833");
  //res.render('index', { title: 'Express' });
  res.send({key: "hello,world"});
});

module.exports = router;


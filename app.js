var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cconf = require("cconf");
var conf_loc = "conf/dev/conf.json";
cconf.file(conf_loc);
global.cconf = cconf;
global.log = console.log;
global.ct = require("./lib/context");


var app = express();
var fs = require("fs");

var https = require("https");
var options = {
  key: fs.readFileSync(__dirname + "/resource/https_cert/server_nopwd.key"),
  cert: fs.readFileSync(__dirname + "/resource/https_cert/server.crt")
};

https.createServer(options, app).listen(3334);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
  log("liao2340");
  if (req.secure) {
    log("liaohttps");
  } else {
    log("liaohttp");
  }
  //return res.send({key: "hello,world"});
  next();
});

//function
//
//app.use(function())

//这个中间件要提取出来。

//app.use(function(req, res, next) {
//
//  log("liao21812");
//
//  next();
//});
var method_override = require("./middleware/method_override");
//log("liao2302,", method_override.res_send_override);

app.use(method_override.res_send_override);


//var token_parser = require("./middleware/token_parser");
//app.use(token_parser);

////为啥token_parse后面的app.use都不执行了呢？？哦，明白了，不执行，是因为，还没
//执行到这里，就已经send错误。res不在往下走了。所以，必须要处理的东西，必须要放在token解析之前。
//token解析放在路由加载后面。
app.use(function(req, res, next) {
  log("liao2339");
  next();
});




require("./lib/router-loader")(app, "./routers", cconf.get("core").path_prefix);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  return ct.error_handler.send(res, err);
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  //
  //// render the error page
  //res.status(err.status || 500);
  //res.render('error');

  //ct.error_handler(err, res);
});


require("./tests/crypto_test");
require("./tests/mongo_test");
require("./tests/redis_test");
require("./tests/other_test");



//require("./tests/mongo_test");
//require("./tests/redis_test");



//context.init_autoload({conf: cconf});

//context.register_lib("mongo", new Mongo(cconf.get("mongo")));
//context.register_lib("redis", new Redis());







//var mongo = ct.lib("mongo");
//var redis = ct.lib("redis");
//var mongo = ct.mongo;
//var redis = ct.redis;


//console.log("liao11701", mongo);

//setTimeout(function() {
//  //var Collection = require("./lib/collection_lib");
//  //var col =new Collection(mongo, "col_test");
//  //col.insertOne("", {"key16": 16});
//
//
//  //redis.set("key20", "20");
//  redis.get("key20", function(ret) {
//    //llog("liao11706", ret);
//  })
//},1000);












//console.log("liao71327", cconf.get("mongo"));
//global.klog = console.log;
//
////连接
//var mongoClient = require("mongodb").MongoClient;
////这里test是数据库名
//var url = "mongodb://localhost:27017,localhost:27018,localhost:27019/test?replicaSet=repset";
//mongoClient.connect(url, function(err, db) {
//  console.log("liao72023,", err, db);
//  var col = db.collection("inserts");
//
//
//});

////插入-增
  //col.insertOne({a:1, b:2}, function(err, ret) {
  //  console.log("liao72036,", err, ret);
  //});
  //col.insertMany([{a:1},{a:2},{a:3}], function(err, ret) {
  //  console.log("liao72038,", err, ret);
  //});
  //col.insertOne({a:2, b:3}, function(err, ret) {
  //  console.log("liao72045,", err, ret);
  //});
  //关闭一个副本集后，依旧可以工作。

  ////更新-改
  //

  //
  ////updateone只更新一个，再多的也不更新了，这里{a:1}是查询条件
  ////第一个参数是查询条件，第二个是修改的部分，如果没找到修改的部分，就填写新的
  //update其实是find_and_update
  //col.updateOne({a:1}, {$set: {b: 150}}, function(err, r) {
  //  console.log("liao72053", err, r);
  //  //var log = console.log;
  //  //log("hello,world");
  //  wlog("areyouok----", err, r);
  //
  //});
  //
  ////updatemany会更新所有匹配到的。
  //col.updateMany({a:2}, {$set: {b: 150}}, function(err, ret) {
  //  console.log("liao72052", err, ret);
  //});
  //
  //
  //
  //col.updateMany({a:3}, {$set: {a: 10}}, function(err, ret) {
  //  console.log("liao72052", err, ret);
  //});



  //删除-删

  //col.deleteOne({a:1}, function(err, r) {
  //
  //});
  //col.deleteMany({a:1}, function(err, r) {
  //
  //});


  //查
  //col.count({a:1}, function(err, ret) {
  //  wlog("liao72121", err, ret);
  //})

  //col.find({a:1}).limit(2).toArray(function(err, docs) {
  //  wlog("liao72131", err, docs);
  //});
  //
  //col.find({a:1}, function(err, docs) {
  //  wlog("liao72132", err, docs);
  //});

  //

  //没必要
  //col.findOneAndUpdate({a:1}, {$set: {b: 1}}, {
  //
  //});
  //
  //col.findOneAndDelete({a:2}, function(err, r) {
  //
  //});

  //统计
  //col.count({a:1}, function(err, ret) {
  //  wlog("liao72121", err, ret);
  //})

  //翻页处理

  //见kz-theme

  //redis操作

  //var Redis = require("ioredis");
  //var redis = new Redis();
  //
  //redis.set('foo', 'bar');
  //redis.get('foo', function (err, result) {
  //  console.log(result);
  //});
  //
  //var data = {
  //  "key1": "1",
  //  "key2": "2",
  //  "key3": "3"
  //};
  ////redis.hmset("key2", data, function(err, ret) {
  ////  wlog("liao72304", err, ret);
  ////});
  //redis.hgetall("key2", function(err, ret) {
  //  wlog("liao72315", err, ret);
  //})



  //var a = {
  //  key: "1"
  //};
  //var b = [
  //  {
  //    key1: "1"
  //  },
  //  {
  //    key2: "2"
  //  }
  //];
  //var c = "hello";
  //
  ////klog("liao0018", a.length,"liao0019", b.length, c.length,instanceof(a));
  //
  //function test(col, data, callback,type) {
  //  if (type) {
  //    callback(col);
  //    return;
  //  }
  //  callback(data);
  //}
  //test("col", "data", function(ret) {
  //  klog("liao70024", ret);
  //}, "type");
  //
  //console.log("liao70128", typeof(test));









module.exports = app;

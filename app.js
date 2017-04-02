//原来的app.js文件。
function fork_child() {
  var express = require('express');
  var path = require('path');
  var debug = require('debug')('wifi-share:server');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var cconf = require("cconf");
  var pos = "dev";//online,pre

  var conf_loc = __dirname + "/conf/" + pos + "/conf.json";
  cconf.file(conf_loc);
  global.cconf = cconf;

  function log(){
    var close = false;
    if (close) {
      return;
    }
    console.log.apply(console, arguments);
  };

  global.log = log;
  global.ct = require("./lib/context");

  log("liao1423,",__dirname);
  var app = express();//
  var fs = require("fs");

  var https = require("https");
  var options = {
    key: fs.readFileSync(__dirname + "/resource/https_cert/server_nopwd.key"),
    cert: fs.readFileSync(__dirname + "/resource/https_cert/server.crt")
  };

  https.createServer(options, app).listen(3334);

  var http = require("http");

  var server = http.createServer(app);
  server.listen(3333);
  server.on('error',function(error) {
    log("liao1447,",error);
    ct.error_handler.save(error);
  });
  server.on("listening", function() {
    log("liao1448");
    var addr = server.address();
    debug('Listening on ' + addr);
  })

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'resource')));
  var method_override = require("./middleware/method_override");
  app.use(method_override.res_send_override);
  var token_parser = require("./middleware/token_parser");
  app.use(token_parser);
  require("./lib/router-loader")(app, "./routers", cconf.get("core").path_prefix);
  app.use(function(req, res) {
    log("liao1633");
    var err = new Error('Not Found');
    err.status = 404;
    return ct.error_handler.send(res, err);
  });


  require("./tests/crypto_test");
  require("./tests/mongo_test");
  require("./tests/redis_test");
  require("./tests/other_test");
}
//module.exports = app;

//--------------------------



var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
console.log("liao1751,,,", numCPUs);


if (cluster.isMaster) {
  console.log("master start...");

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('listening',function(worker,address){
    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  fork_child();
}





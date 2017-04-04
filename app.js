//原来的app.js文件。


function fork_http() {
  var express = require('express');
  var app = express();//
  var fs = require("fs");

  var path = require('path');
  var http = require("http");

  var server = http.createServer(app);
  app.use(express.static(path.join(__dirname, 'resource')));
  server.listen(3333);
  console.log("liao");


  var https = require("https");
  var options = {
    key: fs.readFileSync(__dirname + "/resource/https_cert/server_nopwd.key"),
    cert: fs.readFileSync(__dirname + "/resource/https_cert/server.crt")
  };

  https.createServer(options, app).listen(3334);


}
function fork_child() {
  var argv = require("optimist").argv;
  //默认http 是3333，https是3334
  var http_port = argv.http_port? parseInt(argv.http_port): 3333;
  var https_port = argv.https_port? parseInt(argv.https_port): 3334;
  //不设置命令行，就用本地环境
  var env = argv.env? argv.env: "dev";//online,pre
  //不设置命令行，就用本地配置。
  var printlog = argv.log? parsebool(argv.log): true;



  var express = require('express');
  var path = require('path');
  var debug = require('debug')('wifi-share:server');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var cconf = require("cconf");




  var conf_loc = __dirname + "/conf/" + env + "/conf.json";
  cconf.file(conf_loc);
  global.cconf = cconf;

  function parsebool(str) {
    if (str == "true") {
      return true;
    }
    return false;
  }



  function log(){
    if (printlog) {
      console.log.apply(console, arguments);
    }

  };

  global.log = log;
  global.ct = require("./lib/context");

  log("liao1423,",__dirname);
  //log("liao1344, ", argv.port);
  //log("liao1345, ", parsebool(argv.close));


  var app = express();//
  var fs = require("fs");

  var https = require("https");
  var options = {
    key: fs.readFileSync(__dirname + "/resource/https_cert/server_nopwd.key"),
    cert: fs.readFileSync(__dirname + "/resource/https_cert/server.crt")
  };



  log("liao1421,,,", typeof http_port);
  https.createServer(options, app).listen(https_port);

  var http = require("http");

  var server = http.createServer(app);


  log("liao1422,,,", https_port);
  server.listen(http_port);
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


////多核处理方案
//var cluster = require('cluster');
//var numCPUs = require('os').cpus().length;
//if (cluster.isMaster) {
//  for (var i = 0; i < numCPUs; i++) {
//    cluster.fork();
//  }
//
//  cluster.on('listening',function(worker,address){
//    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
//  });
//
//  cluster.on('exit', function(worker, code, signal) {
//    console.log('worker ' + worker.process.pid + ' died');
//  });
//} else {
//  fork_child();
//}
//
////单核处理方案
//fork_child();

fork_http();


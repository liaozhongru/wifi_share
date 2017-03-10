/**
 * Created by liaozhongru on 17/3/10.
 */
console.log("liao1413,",__dirname);

var fs = require("fs");
var a = fs.readFileSync(__dirname + "/resource/https_cert/server_nopwd.key");

require("./tests/mongo_test");
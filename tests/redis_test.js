/**
 * Created by liaozhongru on 17/2/6.
 */

var Redis = require("../lib/redis_lib");

var redis  = new Redis();
//redis.set("key","1");

//redis.get("keykkk", function(ret) {
//    log("liao11621", ret);
//})



//redis.hmset("key2", {
//    kye1: "value1",
//    "key2": "value2",
//    key3: "value3"
//}, function(ret) {
//    log("liao22305,", ret);
//});

//redis.hgetall("key2", function(ret){
//    log("liao11626", ret);
//    if (ret) {
//        log("liao21609,", ret);
//    }
//});

//function liao(ret) {
//    log("liao21613", ret);
//
//}
//
////liao();
//var a = {};
//if (a === {}) {
//    log("=======");
//}

//redis.del("key2");
//var a;
//log("liao20004,",a);
//if (!a) {
//    log("liao20005,", a);
//}

//ct.redis.hmset("","liao", {
//    name: "liaozhongru",
//    set: "nan",
//    marry: "no"
//});

//ct.redis.hgetall("","liao", function(ret) {
//    log("liao1450, ", ret);
//    //if (!ret) {
//    //    return res.send({code: 1});
//    //}
//
//    //ct.redis.del(res, req.userID, function(ret) {
//    //    res.send({code: 1});
//    //});
//});

ct.redis.del("", "liao", function(ret) {
    log("liao1450, ", ret);
})
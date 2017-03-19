/**
 * Created by liaozhongru on 17/2/7.
 */

////llog("hello,world");
//var date = new Date();
////llog("liao10012,",date);
//var expire_time = date.getTime() + 604800000;
//
////var exp = date.getTimestamp() + 604800000;
//var expire_timestamp = new Date().getTime() + 604800000
//
////llog("liao10015,", expire_timestamp);
//

//var a = "0";
//var b = a[0];
//
//if (a) {
//    log("liao21227,",a);
//    //return;
//} else {
//    log("liao21228m,",a);
//}

//var a = cconf.get("wifi_collection");
//log("liao1520,", a);
//
//"index_name": ["col"],
//    "index_type":["2dsphere"]

//res.send([body])
//Sends the HTTP response.
//
//    The body parameter can be a Buffer object,
//    a String, an object, or an Array. For example:


//var a = "hello";
//var b = {key: 1};
//var c = [1,2,3];
//var d = new Buffer("world");
//
//
//log("liao2238, ", d.code);
//if (a.code != 1) {
//    log("liao2239,");
//}

//var e = "1";
//log("liao2248,, ", typeof e == "number", e);
//var b = {};
//var c = [];
//b.ss = c;
//log("liaof1236,", b);

//var a = "hello,world";
//var b =  a.substring(0, 5);
//log("liao1208, ", b);
//
//var rand = Math.random() - 0.00000001;
//log("liao1211, ", rand);
//var c = Math.round(rand * 100);
//log("liao1213, ", c);
//
//var d = "世界杯足球队美国人中国人日本人";
//var count = d.length;
//var range = Math.round(rand * count);
//range = Math.round(range / 3) * 3;
//log("liao1305,", range);
//log("liao1306, ", d.substring(range,range + 3));
//
//var e = ct.utils.random_name();
//log("liao1312, ", e);
//
//


//var n = ct.utils.random(0,10);
//log("liao1336, ", n);


//var dd = ct.utils.get_timestamp();
//log("liao2233, ", dd);
////log("liao1407, ", dd);
////var p =  '/Users/liaozhongru/Desktop/11.Wifi/wifi_share/resource/public_pic/upload_24600046d87be6772d37d67d50860b80';
////
////var ss = p.indexOf("public_pic/");
////log("liao2130, ", ss);
////var pp = p.substring(ss);
////log("liao2131, ", pp);
//
//var async = require("async");
//
////var

//var file_path =  '/Users/liaozhongru/Desktop/11.Wifi/wifi_share/resource/public_pic/upload_24600046d87be6772d37d67d50860b80';
var file_path = "public_pic/upload_24600046d87be6772d37d67d50860b80";
var pos = file_path.indexOf("public_pic/");
//log("liao2130, ", ss);
var part_file_path = file_path.substring(pos);
//
log("liao1059, ",part_file_path);

var path = ct.utils.trim2relative_path("public_pic",file_path);
log("liao1111, ", path);

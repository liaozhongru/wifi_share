/**
 * Created by liaozhongru on 17/2/6.
 */

var crypto = require("../lib/crypto_lib");

//crypto.bcrypt_hash("", "liaozhongru", function(hash) {
//    llog("liao12237,", hash);
//})

//$2a$10$oLVENKeJY0DIWMqO5TfoKeGgQOe1vY3m6rm9RmZ5uSwjvZWTmeYtq


//var hash = "$2a$10$0qn9mf0jDYK380Eprbaz/OWffCOo5jWmN/4QI3IjH6wFEUjuOI28C";
//var hash = "$2a$10$oLVENKeJY0DIWMqO5TfoKeGgQOe1vY3m6rm9RmZ5uSwjvZWTmeYtq";
//crypto.bcrypt_compare("", "liaozhongru1", hash, function(ret) {
//    //llog("liao12242,", ret);
//})
//
//crypto.token_create();
//crypto.sha512("hello");



//var crypt_buf = crypto.rsa_crypt("hello,world----");
//
//log("liao0100,", crypt_buf);
//
//var decrypt_buf = crypto.rsa_decrypt(crypt_buf);
//log("liao0105,",decrypt_buf);
//
var token = "aa6ee7c0a1252d51846b598ff1949e9727d4eed550f7b49ce4fcd333c2d384481e612dbec557d153e0d1a4c681057fad6dc155b0d6bb872682020fe0feb5cca6";
var expire_time = "1588264350";

var str = crypto.sha512(token+expire_time);
log("liao1236, ", str);

//00a1247cacf6302593c9a87bae145de075139159884e78fdd4ca745d2c3757b6c59946308b2d913ff9dd4eb066b8a615619e1db14d701a31df6ab04cfbf95429
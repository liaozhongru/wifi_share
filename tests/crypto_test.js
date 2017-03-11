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
var token = "b75f54c407ea9a77fc804164cea0bb2f53605c63505670f085bd1cd0883b3826d73955235837716267ef6f9cd6166aa644812344d6636350508037739675d464";
var expire_time = "1588264350";

var str = crypto.sha512(token+expire_time);
log("liao1236, ", str);

//c3e671da2f7d1fa736e6ccaab7ee6a7f9d14d0b36309a3c12ddb760a9f90fb49b6cc1d11c2e81deca48a33fbe41ef938eefe8a75987a8822ad531b15ab4c73d4
/**
 * Created by liaozhongru on 17/2/6.
 */
/**
 *
 * @type {{}}
 */

var bcrypt = require("bcrypt");
var crypto = require("crypto");
var fs = require("fs");
var private_key = fs.readFileSync('resource/rsa/rsa_private_key.pem','utf-8');
var public_key = fs.readFileSync('resource/rsa/rsa_public_key.pem','utf-8');

//require("../resource/rsa/temp");

var KZCrypto = {
    /**
     * 明文转慢哈希
     * @param res
     * @param password
     * @param callback：返回hash值
     */
    bcrypt_hash: function(res, password, callback) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                return res.send({error: "慢哈希出错"});
            }
            if (callback) {
                callback(hash);
            }
        })
    },
    /***
     * 明文与慢哈希比对
     * @param res
     * @param password
     * @param hash
     * @param callback:返回ret为布尔值，表征是否一致
     */
    bcrypt_compare: function(res, password, hash, callback) {
        bcrypt.compare(password, hash, function(err, ret) {
            if (err) {
                return res.send({error: "比对密码出错"});
            }
            if (callback) {
                callback(ret);
            }
        })
    },
    /**
     * 生成token
     * @returns {*}
     */
    token_create: function() {
        var date = new Date();

        var str = date.toString();
        var project_identifier = cconf.get("core").project_identifier;
        var str2 =  this.sha512(str + project_identifier);
        //console.log("liao12309,", str2, project_identifier);
        return str2;
    },
    /**
     * 判断token哈希值是否一致。
     * @param token
     * @param req_expire_time
     * @param token_hash
     * @returns {boolean}
     */
    token_hash_compare: function(token, req_expire_time, token_hash) {
        var str = this.sha512(token + req_expire_time);
        return (str == token_hash);
    },
    /**
     * sha512哈希算法
     * @param str
     * @returns {*}
     */
    sha512: function(str) {

        //var sha512 = crypto.createHmac("sha512","");
        //sha512.update("hello,world");
        //var str = sha512.digest("hex");
        //llog("liao12324,", str);

        var sha512 = crypto.createHash("sha512");
        sha512.update(str);
        var str = sha512.digest("hex");
        return str;
    },
    /**
     * rsa加密:使用公钥加密
     * @param str：字符串类型，返回加密的数据，是Buffer类型
     */
    rsa_crypt: function(str) {

        //console.log(md5Str);
        //md5Str = 'xuexibao';
        var buffer = crypto._toBuf(str);//这是原始的buffer：<Buffer 68 65 6c 6c 6f 2c 77 6f 72 6c 64>
        //console.log('原始的buffer',buffer);
        //var crypt_buffer =crypto.privateEncrypt(private_key,buffer);//这是生成的加密buffer
//<Buffer 2f ad 98 8c f1 2f ee ee 38 2a 07 d0 6c f2 4e 67 77 c2 3d 3c 0d 96 fa b......

       var crypt_buffer = crypto.publicEncrypt(public_key, buffer);

        //console.log('加密后的buffer = ',crypt_buffer);
        //fs.writeFileSync('source/key',cryptBuffer);
        //fs.writeFileSync(path,cryptBuffer);
        return crypt_buffer;

    },
    /**
     * rsa解密：使用私钥解密
     * @param str：传入Buffer类型，返回字符串str
     */
    rsa_decrypt: function(crypt_buffer) {


        var str = crypto.privateDecrypt(private_key, crypt_buffer).toString();
        //var result = crypto.publicDecrypt(public_key, crypt_buffer).toString();
        //console.log('解密后的buffer = ',result);
        return str;
    }
};
module.exports = KZCrypto;


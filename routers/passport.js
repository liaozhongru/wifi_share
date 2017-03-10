/**
 * Created by liaozhongru on 17/2/6.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
var crypto = require("../lib/crypto_lib");

/**
 * 返回code 0:表示参数缺失，1:表征成功，2：表示已经有人注册了。
 */
router.post("/register", function(req, res) {
    if (!req.secure) {
        return res.send({code: 8});
    }

    var col = ct.mongo.password_col;
    //llog("liao12114", col);

    //llog("liao11956");
    //if (!req.secure) {
    //    return next();
    //}
    var phone = req.body.phone;
    var password = req.body.password;
    if (!(phone && password)) {
        return res.send({code: 0});
    }

    col.findSome(res, {phone: phone}, 1, function(ret) {
        //llog("liao12121", ret);
        if (ret) {
            return res.send({
                code: 2
            })
        }

        log("liao2327");



        crypto.bcrypt_hash(res, password, function(hash) {
            //llog("liao12233,", hash);

            var token = crypto.token_create();
            var expire_timestamp = new Date().getTime() + 604800000;

            col.insertOne(res, {
                phone: phone,
                password_hash: hash,
                token: token,
                expire_timestamp: expire_timestamp,
                value: 0
            }, function(ret) {
                if (ret) {
                    var userID = ret.insertedId;
                    res.send({
                        code: 1,
                        userID: userID,
                        token: token,
                        phone: phone
                    });
                    ct.redis.hmset(res, userID, {
                        token: token,
                        expire_timestamp: expire_timestamp
                    })
                }

            })
        })



    })
});

/**
 * code 3：用户不存在,4，用户密码错误,5,更新token到数据库失败
 */
router.post("/login", function(req, res, next) {
    //if (!req.secure) {
    //    return next();
    //}
    if (!req.secure) {
        return res.send({code: 8});
    }

    var col = ct.mongo.password_col;

    var phone = req.body.phone;
    var password = req.body.password;

    if (!(phone && password)) {
        return res.send({code: 0});
    }
    col.findSome(res, {phone:phone}, 1, function(ret) {
        log("liao1616,", ret);
        //ret = ret[0];
        if (!ret) {
            return res.send({code: 3})
        }
        //llog("liao21222, ", ret);
        //ret = ret[0];
        crypto.bcrypt_compare(res, password, ret.password_hash, function(ret1) {
            //短的处理情况写前面。
            if (!ret1) {
                return res.send({code: 4});
            }

            var token = crypto.token_create();
            var expire_timestamp = new Date().getTime() + 604800000;

            //要判断出ret._id是什么类型，不然搞不定的。
            //llog("liao21234,",col.is_object_id(ret._id));

            //llog("liao21239,", ret._id,",,,,",ret._id.toString());
            var userID = ret._id;

            col.updateOne(res, {_id: userID}, {
                expire_timestamp: expire_timestamp,
                token: token
            }, function(ret2) {
                //llog("liao20200,",ret);
                if (ret2.modifiedCount < 1) {
                    return res.send({code: 5});
                }
                ct.redis.hmset(res, userID, {
                    token: token,
                    expire_timestamp: expire_timestamp
                }, function(ret) {
                    //llog("liao10043,", err, ret);
                });
                return res.send({
                    code: 1,
                    userID: userID.toString(),
                    token: token,
                    phone: phone
                });

            });
        })
    })
});

router.post("/logout", function(req, res) {
    var col = ct.mongo.password_col;
    log("liao1626,", req.userID);

    //col.updateOne("", {name: "mengzhonghao"}, {token: 1}, "$unset", function(ret) {
    //    log("liao1411, ", ret);
    //});


    col.updateOne(res, {_id: req.userID}, {token: 1, expire_timestamp: 1}, "$unset",function(ret) {
        log("liao1627, ",ret);
        ct.redis.del(res, req.userID);
        res.send({code: 1});

        //ct.redis.hgetall(res, req.userID, function(ret) {
        //    if (!ret) {
        //        return res.send({code: 1});
        //    }
        //
        //
        //});
    });

    //col.deleteOne(res, {_id: req.userID}, function(ret) {
    //
    //
    //});
});


module.exports = router;

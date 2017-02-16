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
router.post("/register", function(req, res, next) {
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
                //llog("liao12353,", ret);

                if (ret) {
                    var userID = ret.insertedId;
                    //你需要确认这个insertedId是否是ObjectID对象。
                    //log("liao21549,",col.is_object_id(userID));//确实是ObjectID

                    res.send({
                        code: 1,
                        userID: userID,
                        token: token
                    });
                    //ct.redis.set(phone, token, function(err, ret) {
                    //    llog("liao10003,",err, ret);
                    //});
                    ct.redis.hmset(res, userID, {
                        token: token,
                        expire_timestamp: expire_timestamp
                    }, function(err ,ret) {
                        //llog("liao10043,", err, ret);
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
        ret = ret[0];
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
                }, function(err ,ret) {
                    //llog("liao10043,", err, ret);
                });
                return res.send({
                    code: 1,
                    userID: userID.toString(),
                    token: token
                });

            });
        })
    })
});

router.post("/logout", function(req, res, next) {
    var col = ct.mongo.password_col;
    col.deleteOne(res, {_id: req.userID}, function(ret) {
        ct.redis.hgetall(res, req.userID, function(ret) {
            if (!ret) {
                return res.send({code: 1});
            }

            ct.redis.del(res, req.userID, function(ret) {
                res.send({code: 1});
            });
        });

    });
});


module.exports = router;

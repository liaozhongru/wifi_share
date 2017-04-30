/**
 * Created by liaozhongru on 17/2/6.
 */
var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
var crypto = require("../lib/crypto_lib");

router.post("/time", function(req, res) {

    log("liao1402,",req.token);
    return res.send({
        code: 1,
        time: ct.utils.get_timestamp()
    });
});
router.post("/his_info", function(req, res) {
    log("liao1702, ",req.body);
    var his_userID = ct.mongo.get_object_id(req.body.his_userID);
    if (!his_userID) {
        return res.send({code: 0});
    }
    var col = ct.mongo.password_col;
    col.findOne(res, {_id: his_userID}, function(ret) {
        if (!ret) {
            return res.send({code: 3});
        }
        //var data = {};
        log("liao1725, ", ret);
        return res.send({
            code: 1,
            gender: ret.gender,
            name: ret.name,
            avatar_url: ret.avatar_url,
            status: ret.status,
            value: ret.value
        });
    })
});


router.post("/change_nickname", function(req, res) {
    if (!req.secure) {
        return res.send({code: 8});
    }
    var nickname = req.body.nickname;
    if (!nickname) {
        return res.send({code: 0});
    }
    var col = ct.mongo.password_col;
    col.updateOne(res, {_id: req.userID}, {name: nickname}, function(ret) {
        return res.send({code: 1});
    })
});


router.post("/change_gender", function(req, res) {
    if (!req.secure) {
        return res.send({code: 8});
    }

   var gender = parseInt(req.body.gender);

    if (!gender) {
        return res.send({code: 0});
    }
    var col = ct.mongo.password_col;
    col.updateOne(res, {_id: req.userID}, {gender: gender}, function(ret) {
        return res.send({code: 1});
    })
});

router.post("/change_phone", function(req, res) {
    log("liao1103,");
    if (!req.secure) {
        return res.send({code: 8});
    }
    var phone = req.body.phone;
    if (!phone) {
        return res.send({code: 0});
    }
    var col = ct.mongo.password_col;
    col.updateOne(res, {_id: req.userID}, {phone: phone}, function(ret) {
        return res.send({code: 1});
    })
});

router.post("/change_password", function(req, res) {
    if (!req.secure) {
        return res.send({code: 8});
    }
    var password = req.body.password;
    if (!password) {
        return res.send({code: 0});
    }
    crypto.bcrypt_hash(res, password, function(password_hash) {
        var col = ct.mongo.password_col;
        col.updateOne(res, {_id: req.userID}, {password_hash: password_hash}, function(ret) {
            return res.send({code: 1});
        })
    });
})


/**
 * 返回code 0:表示参数缺失，1:表征成功，2：表示已经有人注册了。
 *
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

    log("liao1326, ",__dirname);

    var dir = path.resolve(__dirname, '..') + "/resource/avatar";
    log("liao1329,,", dir);
    var images = fs.readdirSync(dir);
    log("liao1330, ",images);
    var rand = ct.utils.random(0, images.length - 1);
    var match = images[rand].match(/^([^.]+)\.jpg$/);
    while (!match) {
        rand = ct.utils.random(0, images.length - 1);
        match = images[rand].match(/^([^.]+)\.jpg$/);
    }
    log("liao1340, ",images[rand]);

    var avatar_url = "avatar/" + images[rand];
    log("liao1341, ", avatar_url);
    //var rand =

    //for(var i in images) {
    //    var matches = images[i].match(/^([^.]+)\.jpg$/);
    //    if (!matches) {
    //        log("liao1332, ", images[i]);
    //    }
    //}





    //var routers = fs.readdirSync();
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
            expire_timestamp = Math.ceil( expire_timestamp / 1000);

            var name = ct.utils.random_name();
            log("liao1723, ",name);
            log("liao1724, ",avatar_url);

            var data = {
                phone: phone,
                password_hash: hash,
                token: token,
                expire_timestamp: expire_timestamp,
                value: 0,
                status:0,
                gender:0,
                name: name,
                avatar_url: avatar_url

            };

            col.insertOne(res, data, function(ret) {
                if (ret) {
                    //var userID = ;
                    data.userID = ret.insertedId;
                    data.code = 1;
                    data.token_hash = ct.crypto.sha512(data.token + "1588264350");



                    res.send(data);
                    log("liao1955,");
                    ct.redis.hmset(res, data.userID, {
                        token: token,
                        expire_timestamp: expire_timestamp
                    }, function(ret) {
                        log("liao1953 ", ret);
                    })
                }

            })
        })



    })
});

/**
 * code 3：用户不存在,4，用户密码错误,5,更新token到数据库失败
 */


var fid = ct.mongo.get_object_id("58cbae7975b9fc047e13ece4");

ct.redis.hgetall("", fid, function(ret) {
    log("liao2029,", ret);
});


router.post("/login", function(req, res) {
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
            expire_timestamp = Math.ceil(expire_timestamp / 1000);

            //要判断出ret._id是什么类型，不然搞不定的。
            //llog("liao21234,",col.is_object_id(ret._id));

            //llog("liao21239,", ret._id,",,,,",ret._id.toString());
            var userID = ret._id;
            log("liao1957, ",ct.mongo.is_object_id(userID));

            col.updateOne(res, {_id: userID}, {
                expire_timestamp: expire_timestamp,
                token: token
            }, function(ret2) {
                //llog("liao20200,",ret);
                if (ret2.modifiedCount < 1) {
                    return res.send({code: 5});
                }
                log("liao2026, userID = ", userID,"TOKEN IS, ", token);
                ct.redis.hmset(res, userID, {
                    token: token,
                    expire_timestamp: expire_timestamp
                }, function(ret) {
                    log("liao10043,", ret);
                });
                ret.code = 1;
                ret.userID = ret._id.toString();
                ret.token_hash = ct.crypto.sha512(token + "1588264350");
                ret.token = token;
                return res.send(ret);

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

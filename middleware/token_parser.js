/**
 * Created by liaozhongru on 17/2/7.
 */
/**
 * 要注意，这个中间件的所放位置，必须放在body解析后，路由设定前。
 * 解析HTTP的token，最终req会带上userID和token，这个中间件所放位置，要放在路由设定前面。
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next) {
    log("liao21809");

    var req_expire_time= req.body.expire_time;
    if (!req_expire_time) {
        return res.send({code: 0});
    }
    //log("liao2111", req_expire);
    var cur_timestamp = new Date().getTime();
    //code: -1表征该请求不在有效期内。
    if (cur_timestamp > req_expire_time) {
        return res.send({code:-1});
        //var err = new Error("请求不在有效期内");
        //err.status = 403;
        //return ct.error_handler(res, err);
    }

    //如果传了token过来，无论是http，还是https，都要验证，如果不传token，那么，只有https才放行。

    req.userID = ct.mongo.get_object_id(req.body.userID);

    var token_hash = req.body.token;
    //if (!token_hash) {
    //    if (req.secure) {
    //        return next();
    //    }
    //    return res.send({code: 0});
    //}
    //
    //
    //if (!req.userID) {
    //    return res.send({code: 0});
    //}

    //如果走https,req.userID && token_hash都有，就处理，都没有，就next，否则抛出参数缺少
    //if (req.secure) {
    //    if(req.userID && token_hash) {
    //
    //    } else if (!(req.userID && token_hash)) {
    //        return next();
    //    } else {
    //        return res.send({code: 0});
    //    }
    //}


    //如果走http，则必须两者都要有。
    //if ()

    //if (req.userID && token_hash) {
    //    //必须处理
    //} else if (!(req.userID && token_hash)) {
    //
    //} else {
    //
    //}
    //if (req.secure) {
    //
    //}
    //同时存在，就必须处理
    //if (req.userID && token_hash) {
    //    //必须处理
    //} else {
    //    //都不存在，
    //    if ((!req.userID) && (!token_hash)) {
    //
    //    } else {
    //
    //    }
    //}
    //都不存在，只有https放行，http提示参数不全
    if ((!req.userID) && (!token_hash)) {
        if (req.secure) {
            return next();
        }
        return res.send({code: 0});
    } else if (req.userID && token_hash) {
        //都存在，不用管，自然就会去验证token
    } else {
        //有其中一个存在，另一个不存在,就提示参数错误
        return res.send({code: 0});
    }


    //下面是处理逻辑

    ct.redis.hgetall(req.userID, function(ret) {
        if (ret) {
            var is_same = ct.crypto.token_hash_compare(ret.token, req_expire_time, token_hash);
            if (!is_same) {
                return res.send({code: 6});
            }

            var token_expire_time = ret.expire_timestamp;
            //var cur_timestamp = new Date().getTime();
            if (cur_timestamp > token_expire_time) {
                return res.send({code: 7});
            }

            req.token = ret.token;
            //这里要判断token是否过期


            return next();
        }

        ct.mongo.password_col.findSome(res, {_id: req.userID}, 1, function(ret) {

            if (!ret) {
                return res.send({code: 3});//用户不存在
            }

            if (!ret.token) {
                return res.send({code: -2});//用户未登录
            }

            var is_same = ct.crypto.token_hash_compare(ret.token, req_expire_time, token_hash);
            if (!is_same) {
                return res.send({code: 6});
            }


            var token_expire_time = ret.expire_timestamp;
            if (cur_timestamp > token_expire_time) {
                return res.send({code: 7});//token过期
            }

            req.token = ret.token;

            ct.redis.hmset(req.userID, {
                token: ret.token,
                expire_timestamp: ret.expire_time
            }, function(err, ret) {
                log("liao21714,", err, ret);
            });
            next();
        })
    });

};
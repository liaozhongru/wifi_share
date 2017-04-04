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



function parser(req, res, next) {


    //if (!req.body)
    log("liao21809, body = ", req.body);

    log("liao1942, file = ", req.files);

    var req_expire_time= req.body.expire_time;
    log("liao1703, ", req_expire_time);
    if (!req_expire_time) {
        return res.send({code: 0});
    }
    //log("liao2111", req_expire);
    var cur_timestamp = new Date().getTime() / 1000;
    log("liao1446,", cur_timestamp,",",req_expire_time);
    //code: -1表征该请求不在有效期内。
    if (cur_timestamp > req_expire_time) {
        return res.send({code:11});
    }
    var userID_str = req.body.userID;
    log("liao1452,",req.userID,",",req.body.userID);
    var token_hash = req.body.token;
    log("liao2018, ", token_hash);

    if ((!userID_str) && (!token_hash)) {
        if (req.secure) {
            log("liao103333");
            return next();
        }
        return res.send({code: 0});
    } else if (userID_str && token_hash) {
        //都存在，不用管，自然就会去验证token
    } else {
        //有其中一个存在，另一个不存在,就提示参数错误
        return res.send({code: 0});
    }


    //下面是处理逻辑
    req.userID = ct.mongo.get_object_id(userID_str);
    log("liao1431, ",userID_str, ",,,", req.userID,"isobjeid,",ct.mongo.is_object_id(req.userID));
    log("liao1613,");
    ct.redis.hgetall(res, req.userID, function(ret) {
        if (ret) {
            log("liao1614,token ", ret.token);
            var is_same = ct.crypto.token_hash_compare(ret.token, req_expire_time, token_hash);
            if (!is_same) {
                log("liao1950, ", ret.token);
                return res.send({code: 6});
            }
            var token_expire_time = ret.expire_timestamp;
            //var cur_timestamp = new Date().getTime();
            if (cur_timestamp > token_expire_time) {
                return res.send({code: 7});
            }
            req.token = ret.token;
            //这里要判断token是否过期
            log("liao2115");
            return next();
        }
        ct.mongo.password_col.findSome(res, {_id: req.userID}, 1, function(ret) {

            log("liao1430, ", ret);
            if (!ret) {
                return res.send({code: 3});//用户不存在
            }
            if (!ret.token) {
                log("liao1357,");
                return res.send({code: 12});//用户未登录
            }
            var is_same = ct.crypto.token_hash_compare(ret.token, req_expire_time, token_hash);
            if (!is_same) {
                log("liao1949");
                return res.send({code: 6});
            }
            var token_expire_time = ret.expire_timestamp;
            if (cur_timestamp > token_expire_time) {
                return res.send({code: 7});//token过期
            }
            req.token = ret.token;

            ct.redis.hmset(res, req.userID, {
                token: ret.token,
                expire_timestamp: ret.expire_time
            }, function(ret) {
                log("liao21714,", err, ret);
            });
            next();
        })
    });
}
log("liao2055");

module.exports = function(req, res, next) {
    log("liao2056");

    //这里处理的form-data格式的post请求体
    if (ct.utils.is_object_empty(req.body)) {
        ct.utils.parser_upload_file(req, res, function(fields, files) {
            if (!fields) {
                log("liao1929,");
                return res.send({code: 0});
            }
            log("liao2057");
            req.body = fields;
            req.files = files;
            parser(req, res, next);
        });
    } else {
        //这里处理的是x-www-form-urlencoded的post请求体
        parser(req, res, next);
    }
};
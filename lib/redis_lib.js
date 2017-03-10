/**
 * Created by liaozhongru on 17/2/6.
 */

var Redis = require("ioredis");
var redis = new Redis();
redis.on("error", function(error) {
    log("liao1501, ",error);
});

redis.on("connect", function(ret) {
    log("liao1502, ", ret);
});

redis.on("close", function(ret) {
    log("liao1503, ", ret);
})


/**
 * 这里的错误暂时不处理，以后，在统一写这里的逻辑。
 * @param opt
 * @constructor
 */
function KZRedis() {

}

KZRedis.prototype = {
    /**
     *
     * @param key
     * @param value
     * @param callback:成功返回true，失败返回false
     */
    set: function(res, key, value, callback) {
        redis.set(key, value, function(err, ret) {
            log("liao22257,", err, ret);

            if (err) {
                err.code = 151;
                return ct.error_handler.send(res, err);

            }
            if (callback) {
                if (ret == "OK") {
                    return callback(true);
                } else {
                    callback(false);
                }
            }
        });
    },
    /**
     *
     * @param key
     * @param callback:返回ret,失败返回null
     */
    get: function(res, key, callback) {
        redis.get(key, function(err, ret) {
            if (err) {
                //llog("redis_err_get");
                //return ct.error_handler.save(err);
                err.code = 152;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }

        })
    },
    /**
     *
     * @param key
     * @param value
     * @param callback:ret成功返回true,失败返回false
     */
    hmset: function(res, key, value, callback) {
        redis.hmset(key, value, function(err, ret) {
            if (err) {
                //return ct.error_handler.save(err);
                err.code = 153;
                return ct.error_handler.send(res, err);

            }
            if (callback) {
                if (ret == "OK") {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        })
    },
    /**
     *
     * @param key
     * @param callback:返回ret结果,找到返回正确结果对象，找不到返回undefined
     */
    hgetall: function(res, key, callback) {
        redis.hgetall(key ,function(err, ret) {
            if (err) {
                //llog("redis_err_hgetall");
                //return ct.error_handler.save(err);
                err.code = 154;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                if (ct.utils.is_object_empty(ret)) {
                    callback();
                } else {
                    callback(ret);
                }

            }

        })
    },
    /**
     * 删除键值对
     * @param key
     * @param callback:返回ret，0表示没有的删除，1表示删除了1个。
     */
    del: function(res, key, callback) {
        redis.del(key, function(err ,ret) {
            log("liao22244",err, ret);
            if (err) {
                //return ct.error_handler.save(err);
                err.code = 155;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }

        });
    }
};


module.exports = KZRedis;
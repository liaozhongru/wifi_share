/**
 * Created by liaozhongru on 17/2/5.
 */
    //数据库必须要封装一层，如果在业务中，直接使用原生接口，以后原生接口发生变化了，那么要
    //改动的地方就会很多，很麻烦，所以，必须封装一层
    //函数注释方法 输入/**，然后回车即可。

var mongoClient = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;

function KZMongo(opt) {
    var m = this;
    m.opt = opt;
    m.db = null;
    m.connect(function(db) {
        m.db = db;
        //log("liao20102,",db);
        //下面的这个方法应该是一个同步方法,确实是一个同步方法，github上确认了，官方确认了
        m.test_col = db.collection("kz_test1");

        ////打开password的表，并保存起来。
        var Collection = require("./collection_lib");
        //var col_name = cconf.get("core").passport_collection;
        var password_col_config = cconf.get("password_collection");

        m.password_col = new Collection(m, password_col_config.col_name);
        //
        var wifi_col_config = cconf.get("wifi_collection");
        log("liao2141,", wifi_col_config.index);
        m.wifi_col = new Collection(m, wifi_col_config.col_name, wifi_col_config.index);


        var public_col_config = cconf.get("public_collection");
        m.public_col = new Collection(m, public_col_config.col_name);



        var vegetable_col_config = cconf.get("vegetable_collection");
        log("liao1548, ", vegetable_col_config);

        m.v_col = new Collection(m, vegetable_col_config.col_name);

        m.test = new Collection(m, "test_1",[{name: "age"}]);






    });
}

KZMongo.prototype = {

    /**
     * 判断某个对象是不是ObjectID类型。
     * @param obj
     * @returns {boolean}
     */
    is_object_id: function(obj) {
        return (obj instanceof ObjectID);
    },
    /**
     * 我们使用主键ID查找的时候，传入的必须是ObjectID类型
     * @param str
     * @returns {*} : 如果转换失败，返回undefined
     */
    get_object_id: function(str) {

        try {
            var obj = new ObjectID(str);
            //callback(obj);
            return obj;
        } catch(err) {
            ct.error_handler.save(err);
            return;//这等于return undefined
            //callback();
        }
        //return new ObjectID(str);
    },
    connect: function(callback) {
        var m = this;
        var host = m.opt.host;
        var dbname = m.opt.dbname;
        var replicaSet = m.opt.replicaSet;
        var url = "mongodb://" + host + "/" + dbname + "?replicaSet=" + replicaSet;
        mongoClient.connect(url, function(err, db) {
            if(err) {
                log("liao2138, err", err);
                err.code = 113;
                ct.error_handler.save(err);
                return;
            }
            callback(db);
        })
    }
};

module.exports = KZMongo;

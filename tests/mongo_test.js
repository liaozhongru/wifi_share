/**
 * Created by liaozhongru on 17/2/6.
 */

//var Mongo = require("../lib/mongo_lib");
var Collection = require("../lib/collection_lib");

var ObjectID = require('mongodb').ObjectID;


//var mongo = new Mongo({
//    host: "localhost:27017,localhost:27018,localhost:27019",
//    dbname: "test",
//    replicaSet: "repset"
//});
var mongo = ct.mongo;


//setInterval(function() {
//    //log("liao1754");
//    var col = ct.mongo.v_col;
//    col.findAll("",{}, function(ret) {
//        log("liao1807,", ret);
//    })
//}, 500);

setTimeout(function() {


    var a;
    //var b = ct.utils.trim(a);
    //log("liao1800,--", b.length);
    //var array = [{a:1},{a:2,b:""}];
    ////var comment = [{},{}];
    //log("liao1754, ", comment.length);
    //for (var i in array) {
    //    //log("liao5,", array[i].b);
    //    if (!array[i].b) {
    //        log("liao7,", array[i]);
    //    }
    //}
    //
    //var b = "";
    //if (b) {
    //    log("liao8,", b);
    //} else {
    //    log("liao9", b);
    //}
    //var col = new Collection(mongo, "ctest");
    var col = ct.mongo.test;


    //col.count("",{},function(ret) {
    //    log("liao1921,, ", ret);
    //})
    //
    setInterval(function() {

        //
        for (var i=0; i < 10000; ++i) {
            col.insertOne("", {age: ct.utils.random(0,100000)}, function(ret) {
                //log("liao1917,,");
            })
        }

        log("liao1945,,");


    }, 1000 * 20);


    //



    //col.insertOne("", {name: "wangzhongying",array:[{key1:1,key2:2},{key1:3,key2:4}]}, function(ret) {
    //    log("liao0005, ", ret);
    //})

    //col.updateOne("",{name: "wangzhongying"}, {array: {key1:5,key2:6}},"$push", function(ret) {
    //    log("liao2107, ", ret);
    //})
    //col.updateOne("",{name: "wangzhongying"}, {array: {key1:5}}, "$pull", function(ret) {
    //    log("liao2109, ", ret);
    //})
    //({“fruit”:{“$all”:["apple","banana"]}})

    //查询数组里面是否包含某个数。
    //col.findOne("",{name: "wang", "array": {"$all": ["zhongying"]}}, function(ret) {
    //    log("liao1340, ", ret);
    //})
    //var objID = ct.mongo.get_object_id("58b69c6b019bb129951a296d");
    //
    //col.insertOne("", {_id: objID, bssid: "world"}, function(Ret) {
    //    log("liao1210, ",Ret);
    //});
    //col.insertOne("", {name: "zhaolinxin", token: "hello,world", expire_time: "hhh"}, function(ret) {
    //    log("liao1405, ", ret);
    //});
    //
    //col.updateOne("", {name: "zhaolinxin"}, {token: 1, expire_time: 1}, "$unset", function(ret) {
    //    log("liao1411, ", ret);
    //});




    //col.insertOne("", {key2: [{key3: 3},{key3: 4},{key3: 5}],key1:1});


    //这是可行的
    //col.insertOne("", {liao:1, liao2: [{key1: 1, key2: 2}, {key1: 3, key2:4}]});
    //往数组里添加数据
    //col.updateOne("", {liao: 1}, {liao2: {key1: 5,key2: 6}}, "$push", function(ret) {
    //    log("ret = ", ret);
    //})

    ////往数组里删除数据。不用全部匹配，部分匹配，就可以删除数组里面某个成员
    //col.updateOne("", {liao: 1}, {liao2: {key1: 5}}, "$pull", function(ret) {
    //    log("ret=, ", ret);
    //})

    //自增某个数据值，只能对某个对象自增，不能对某个数组里面的对象自增
    //col.updateOne("", {liao: 1}, {liao: 5}, "$inc", function(ret) {
    //    log("liao1744: ", ret);
    //})

    //把数据库里面所有数据自增
    //
    //col.updateMany("", {}, {liao:8}, "$inc", function(ret) {
    //    log("liao1813, ", ret);
    //});

    //对数据库里面所有数据的某个数组里面所有数据的某个字段做自增

    //col.insertMany("",[{key1:1,array:[{key1:3,key2:3},{key1:3, key2:3}]},{key1:2, array: [{key1:3,key2:3},{key1:3, key2:3}]},{key1:3, array: [{key1:3,key2:3},{key1:3, key2:3}]}], function(ret) {
    //    log("liao1821");
    //})

    //col.insertOne("",{
    //    key1: 2,
    //    array:[
    //        {key2:2,key3:3},
    //        {key2:4,key3:5}
    //    ]
    //})

    //col.updateMany("", {}, {"array": {key2: 3}}, "inc", function(ret) {
    //
    //});

    //col.findAll("", {}, function(ret) {
    //    log("liao1809, ", ret.length);
    //})



    //var col = new Collection(mongo, "col_test").col;
    //col.findOneAndUpdate()
    //col.updateMany()

    //col.insertOne("",{key113:1});

    //col.updateMany("", {key113: 1},{key111:5},"$push", function(ret) {
    //    log("liao0024, ", ret);
    //})
    //col.insertOne("",{key109: 2, key101:[{key1:1,key2:2},{key3:3,key4: 4}]});


    //col.updateOne("", {key109: 2}, {key101: {key1: 5, key2: 6}},"$push", function(ret) {
    //
    //    log("liao1410, ",ret);
    //});
    //col.updateOne("",{key1: 1}, {key2:{key3: 6}}, "$push", function(ret) {
    //
    //});


    //col.insertMany("",[{a: 1}, {b: 2}, {a: 2}, {a: 3}, {a: 4}]);

    //col.deleteOne("", {a: 100});
    //多次查询合并为1次查询。
    //col.findAll("", {a: {"$in": [1,2,4]}}, function(ret) {
    //    log("liao1228,", ret);
    //})
    //var wifi_col = ct.mongo.wifi_col;
    //
    //function aa() {
    //
    //}
    //log ("liao1210,,", typeof  aa == "function");

    //col.bulk("", [{find: {filter:{a: 2}}}], function(err, ret) {
    //    log("liao1205,", err, ret);
    //});
    //wifi_col.insertOne("", {_id: ct.mongo.get_object_id("hell"), name: "liao"});

    //col.insertOne("", {_id: ct.mongo.get_object_id("hello"), name: "liao", sex: "man"});

    //col.insertOne("", {key: 1}, function(err, ret) {
    //    log("liao1652, ", err, ret);
    //})

    //var buf = new Buffer("hello,world");
    //log("liao0124, ",buf);
    ////col.insertOne("", {key10: buf}, function(ret) {
    ////    log("liao0125,",ret);
    ////})
    //
    //var ObjectID = require('mongodb').ObjectID;
    //
    //try {
    //    log("liao1715,");
    //    var kk = new ObjectID("HELLL");
    //    log("liao1716,")
    //} catch(err) {
    //    log("err == ", err);
    //}
    //log("liao1717");
    //var buf = ct.mongo.get_object_id("00589bef37de881c129d7ae4f7");
    //
    //log("liao1726,", typeof buf);
    //if (buf) {
    //    log("liao1718");
    //} else {
    //    log("liao1719");
    //}


    //col.findOne("", {_id: buf}, function(ret) {
    //    log("liao0126,", ret);
    //})
    //col.findSome("", {key: 1},1, function(err, ret) {
    //    log("liao1653, ", err, ret);
    //})

    //col.findAll("", {key: "99"}, function(docs) {
    //    log("liao3,", docs);
    //})

    //var name = "loc";
    //var type = "2d";
    ////var option = {this.name: type};
    //var option = {};
    //option[name] = type;
    //log("liao2148, ", option);

    //var lbs_col = mongo.db.collection("wifi_lbs_a");
    //这是创建地理位置索引。
    //lbs_col.createIndex({
    //    loc:"2dsphere"
    //});


    //-83
    //这是插入
    //lbs_col.insertOne(
    //    {
    //        loc : { type: "Point", coordinates: [ -73.97, 40.77 ] },
    //        name: "Central Park",
    //        category : "Parks"
    //    }, function(err, ret) {
    //        log("liaoa,", err, ret);
    //    }
    //)

    //var aa = lbs_col.findOne(function(err, ret) {
    //    log("liaoc, ", err, ret);
    //});
    //lbs_col.findOne({
    //    loc: {
    //        $geoIntersects: {
    //            $geometry: {
    //                type: "Point", coordinates: [ -73.93414657, 40.82302903 ]
    //            }
    //        }
    //    }
    //}, function(err, ret) {
    //    log("liaoc, ", err, ret);
    //})
    //var neighborhood = lbs_col.findOne( {
    //    loc: {
    //        $geoIntersects: {
    //            $geometry: {
    //                type: "Point",
    //                coordinates: [ -73.93414657, 40.82302903 ]
    //            }
    //        }
    //    }
    //});
    //
    //
    ////log("liaod, ", neighborhood);
    //lbs_col.find( {
    //    loc: {
    //        $geoWithin: {
    //            $geometry: neighborhood.loc
    //        }
    //    }
    //}).count(function(err, ret) {
    //    log("liaoe, ", err, ret);
    //});

//    var aa = lbs_col.find({ location:
//    { $geoWithin:
//    { $centerSphere: [ [ -73.93414657, 40.82302903 ], 5 / 3963.2 ] } } }).count();
//
//    //}).count();
//
//log("liaoa,", aa);

    //根据多边形来查找。
    //lbs_col.find( {
    //    loc : {
    //        $geoIntersects : {
    //            $geometry : {
    //                type : "Polygon" ,
    //                coordinates: [ [
    //        [ -83 , 50 ] ,
    //        [ -63 , 50 ] ,
    //        [ -63 , 30 ] ,
    //        [ -83 , 30 ] ,
    //        [-83, 50]
    //    ] ]
    //}
    //        }
    //    }
    //}).toArray(function(err, ret) {
    //    log("liao2,", err, ret);
    //});


    //log("liaob,", aa);
    //lbs_col.insertOne(
    //    {
    //        loc : { type: "Point", coordinates: [ -73.88, 40.78 ] },
    //        name: "La Guardia Airport",
    //        category : "Airport"
    //    }
    //);
    //lbs_col.insertOne({
    //    loc: [119.1,29.1],
    //    name: "home"
    //}, function(err, ret) {
    //    log("liao21320, ", err, ret);
    //});

    //lbs_col.find({
    //    "loc": {
    //        "geoNear": [115.1, 25.1]
    //    }
    //}, function(err, ret) {
    //    log("liao21326, ",err, ret);
    //});




    //lbs_col.insert(
    //    {
    //        loc:{
    //            type: "Point",
    //            coordinates: [113.332264, 23.156206]
    //        },
    //        name: "广州东站"
    //    }
    //);

    //lbs_col.ensureIndex(
    //    {
    //        loc: "2dsphere"
    //    }
    //)
    //lbs_col.createIndex({
    //    loc: "2dsphere"
    //});

    //lbs_col.createIndex({
    //    loc: "2dsphere"
    //}, function(err, ret) {
    //    log("liao21216, ", err, ret);
    //});

    //lbs_col.find(function(err, ret) {
    //    log("liao21233, ", err, ret);
    //});

    //lbs_col.findOne(
    //    {
    //        loc: {
    //            $near:{
    //                $geometry:{
    //                    type: "Point",
    //                    coordinates: [113.323568, 23.146436]
    //                },
    //                $maxDistance: 1000000
    //            }
    //        }
    //    }, function(err, ret) {
    //        log("liao21217, ",err, ret);
    //    }
    //);





    //lbs_col.createIndex("coordinate", "2dsphere");
    //lbs_col.insertOne({"name": "liao", "coord": })
    //lbs_col.insertOne({
    //    "name": "liao",
    //    "location": [1,2]
    //}, function(err, ret) {
    //    log("liao21155,", ret);
    //})
    //lbs_col.insertOne({
    //    name: "liao",
    //    coordinate: {
    //        longitude: 113.39,
    //        latitude: 23.06
    //    }
    //}, function(err, ret) {
    //    log("liao21200, ",err, ret);
    //})

    //lbs_col.find({
    //    "coordinate": {
    //        "$nearSphere": [113.1, 23.8],
    //        "$spherical": true,
    //        "$maxDistance": 1000/6378137,
    //        "distanceMultiplier": 637813
    //    }
    //}, function(err, ret) {
    //    log("liao21208,", err, ret);
    //});

    //

    //col.insertOne("", {key: "99"}, function(ret) {
    //    log("liao11338", ret, ret.insertedId);
    //});


    //var obj = new ObjectID("5898b5eb5f2c59065e2b2fb3");
    //col.updateOne("", {_id: obj}, {key: "0000"}, function(ret) {
    //    llog("liao10136,", ret);
    //});

    //col.find


    //col.updateOne("", {key: ""})
    //col.insertMany("", [{key12: 12, key13:13}, {key14: 15}], function(ret) {
    //    log("liao11359", ret);
    //});


    //col.deleteOne("",{key:"999999"}, function(ret) {
    //    log("liao11401", ret);
    //})

    //col.deleteMany("",{key14:15}, function(ret) {
    //    console.log("liao11402", ret);
    //})

     //col.updateOne("",{key: 000000},{key11:13}, function(ret) {
    //
    //    log("liao21253,",ret);
    //});
    //成功返回CommandResult对象，modifiedCount、matchedCount表示修改了几个，匹配了几个

    //col.updateMany("", {key: "99"},{key13:15}, function(ret) {
    //    log("liao21309,",ret,",,,",ret.matchedCount);
    //});
//返回CommandResult，modifiedCount、matchedCount表示修改了几个，匹配到了几个
//    col.findSome("",{key1111: "0000"},1, function(ret) {
//        console.log("liao11408", ret);
//    })
    ////col.findAll("", {key10: 10},function(ret) {
    ////    llog("liao11413", ret);
    ////})
    //
    //col.count("",{key14442: 15}, function(count) {
    //
    //    if (count) {
    //        log("liao11630", count);
    //    } else {
    //        log("liao3333,",count);
    //    }
    //})

    //var a = 0.0;
    //log("liao1159, ", parseFloat(a));
    //if(a) {
    //    log("liao1201");
    //}


    //var a = "["a","b"]";


    //var a = {sex: "true",age : "1"};
    ////if (a) {
    ////    log("liao2043");
    ////}
    //
    //var b = ct.utils.is_object_empty(a);
    //log("liao2045, ",b);

    //找出附近的人 传入经纬度信息，以及半径--ok ,半径以米为单位
    //var col = ct.mongo.wifi_col.col;

    //var kk = {
    //    "$geometry": {
    //        type: "Point",
    //        coordinates: [116.4024286571739, 39.91474174605558]
    //    },
    //    "$minDistance": 10,
    //    "$maxDistance":100000
    //}
    //
    //col.find({"loc": {"$nearSphere": kk}}).toArray(function(err, docs) {
    //    log("liao2047, err, docs,", err, docs);
    //})

    //var col = ct.mongo.wifi_col;
    //
    //
    //var filter = {
    //    "$nearSphere":{
    //        "$geometry": {
    //            type: "Point",
    //            coordinates: [116.4024286571739, 39.91474174605558]
    //        },
    //        "$minDistance": 10,
    //        "$maxDistance":100000
    //    }
    //}
    //col.findAll("", {loc: filter}, function(ret) {
    //    log("liao2101, ret", ret[0].loc);
    //})


    //var routers = fs.readdirSync(router_dir);



}, 2000);
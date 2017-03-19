/**
 * Created by liaozhongru on 17/2/9.
 */
var express = require('express');
var router = express.Router();
var async = require("async");

/* GET home page. */
router.get('/', function(req, res, next) {
    //llog("liao11833");
    res.render('index', { title: 'Express' });
});

router.post("/wifi_nearby", function(req, res) {
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    if (!longitude || ! latitude) {
        log("liao1742,,");
        return res.send({code: 0});
    }
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
    var col = ct.mongo.wifi_col;
    var filter = {
        "$nearSphere":{
            "$geometry": {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            "$minDistance": 0,
            "$maxDistance":100000
        }
    };
    var loc_index = col.indexs[0].name;
    col.findAll(res, {loc: filter}, function(ret) {
        //log("liao2101, ret", ret[0].loc);
        var array = [];
        var userIDs = [];
        for (var i in ret) {
            var data = {};
            data.wifiID = ret[i]._id.toString;
            data[loc_index] = ret[i][loc_index];
            data.category = ret[i].category;
            data.bssid = ret[i].bssid;
            data.favor_number = ret[i].favor_userIDs? ret[i].favor_userIDs.length: 0;
            data.owner = ret[i].owner.toString();//把这个传回去，是给别人查看这个用户行为
            array.push(data);
            userIDs.push(ret[i].owner);
        }

        var password_col = ct.mongo.password_col.col;

        function user_info(userID, callback) {
            password_col.find({_id: userID}).limit(1).toArray(function(err, rets) {
                callback(null,rets[0]);
            });
            //password_col.findOne(res, {_id: userID}, function(ret) {
            //    callback(null, ret);
            //})
        }
        log("liao2021, ", userIDs);

        async.map(userIDs, user_info, function(err, rets) {
            if (err) {
                err.code = 107;
                return ct.error_handler.send(res, err);
            }

            log("liao2020, ", rets, "count is ", rets.length);
            log("liao2021, ", rets[0]);
            for(var i in rets) {
                array[i].gender = rets[i].gender;
                array[i].name = rets[i].name;
                array[i].avatar_url = rets[i].avatar_url;
                array[i].status = rets[i].status;
            }

            log("liao1036,,", array);

            res.send({code: 1, data: array});
        })
    })
});
/**
 * 如果是正方形，至少要有5个点，A,B,C,D,A，如果是三角形，就4个点就够了，A,B,C,A---这些暂时不用。
 */
router.post("/wifi_polygon_region", function(req, res) {
    log("liao1143,", req.body);
    var locs = req.body.locs;
    if (!locs) {
        return res.send({code: 0});
    }
    locs = JSON.parse(locs);
    if (locs.length < 4) {
        return res.send({code: 9, message: "区域尚未闭合到起点"});
    }
    locs = [];
    locs.push(JSON.parse(req.body.locs));
    var col = ct.mongo.wifi_col;
    var filter = {};
    var loc_index = col.indexs[0].name;
    filter[loc_index] = {
        $geoIntersects: {
            $geometry: {
                type : "Polygon" ,
                coordinates: locs
            }
        }
    };
    col.findAll(res, filter, function(ret) {
        var array = [];
        for (var i in ret) {
            var data = {};
            data.wifiID = ret[i]._id.toString;
            data[loc_index] = ret[i][loc_index];
            data.bssid = ret[i].bssid;
            data.favor_number = ret[i].favor_userIDs? ret[i].favor_userIDs.length: 0;
            data.category = ret[i].category;
            data.owner = ret[i].owner.toString();//把这个传回去，是给别人查看这个用户行为
            array.push(data);
        }



        res.send({code: 1, data: array});

    })
});

module.exports = router;



/**
 * Created by liaozhongru on 17/2/7.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



router.post("/upload", function(req,res, next) {
    if (!req.secure) {
        return res.send({code: 8});
    }
    var bssid = req.body.bssid;
    var wifi_password = req.body.wifi_password;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    //var userID = req.userID;

    if (!(bssid && wifi_password && longitude && latitude)) {
        return res.send({code: 0});
    }
    wifi_password = ct.crypto.rsa_crypt(wifi_password);


    var obj = {
        _id: req.userID,
        bssid: bssid,
        wifi_password: wifi_password,
        category: "private"
    };
    var wifi_col = ct.mongo.wifi_col;

    var index_name = wifi_col.indexs[0].name;
    obj[index_name] = {
        type: "Point",
        coordinates: [longitude, latitude]
    };

    ct.mongo.wifi_col.insertOne(res, obj, function(ret) {
        if (!ret) {
            return res.send({code: 201});
        }
        res.send({code: 1});

    })
});

router.post("/download", function(req, res, next) {

    if (!req.secure) {
        return res.send({code: 8});
    }
    var bssid = req.body.bssid;

    if (!bssid) {
        return res.send({code: 0});
    }
    var col = ct.mongo.wifi_col;

    //col.findSome(res, {bssid: bssid}, 1, function(ret) {
    //    if (!ret) {
    //        return res.send({code: 202});
    //    }
    //
    //});
    //ct.mongo.wifi_col.findOne()
    col.findOne(res, {bssid: bssid}, function(ret) {
        if (!ret) {
            return res.send({code: 202});
        }
        ret.wifi_password = ct.crypto.rsa_decrypt(ret.wifi_password);
        ret.code = 1;
        res.send(ret);

    })
});

router.post("/wifis_status", function(req, res, next) {
    var bssids = req.body.bssids;
    if (!bssids || bssids.length < 1) {
        return res.send({code: 0});
    }


    var col = ct.mongo.wifi_col;



    //bssids是数组
    col.findAll(res, {bssid: {"$in": bssids}}, function(ret) {
        //log("liao1228,", ret);
        //if (!ret) {
        //
        //}

        var array = [];
        for (var i in ret) {
            array.push(ret.bssid);
        }
        var data = {};
        data.code = 1;
        data.bssids = array;
        res.send(data);

    })
});

//router.post("/user_status", function(req, res, next) {
//
//})


module.exports = router;

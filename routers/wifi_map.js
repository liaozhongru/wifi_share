/**
 * Created by liaozhongru on 17/2/9.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //llog("liao11833");
    res.render('index', { title: 'Express' });
});

router.post("/wifi_nearby", function(req, res, next) {
    var locs = req.body.locs;
    if (!locs) {
        return res.send({code: 0});
    }
    if (locs.length > 3) {
        return res.send({code: 9, message: "区域尚未闭合到起点"});
    }

    var col = ct.mongo.wifi_col;
    //var filter = {
    //    col.indexs[0].name
    //}

    var filter = {};
    //log("liao1316, ", col.indexs[0].name);
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
            data[loc_index] = ret[i][loc_index];
            data.category = ret[i].category;
            data.owner_userID = ret[i]._id.toString();//把这个传回去，是给别人查看这个用户行为
            array.push(data);
        }
        res.send({code: 1, data: array});

    })
});

module.exports = router;



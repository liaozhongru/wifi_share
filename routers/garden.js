/**
 * Created by liaozhongru on 17/2/12.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //llog("liao11833");
    res.render('index', { title: 'Express' });
});


setInterval(function() {
    log("liao1803");
    var col = ct.mongo.v_col;


}, 1000 * 60);

router.post("/add_vegetable", function(req, res, next) {
    var type = req.body.type;
    var position = req.body.position;

    if (!type || !position) {
        return res.send({code: 0});
    }

    var col = ct.mongo.v_col;
    var vegetable = {
        type: type,
        position: position,
        status: 0
    };
    col.updateOne(res, {_id: req.userID}, {vegetable: vegetable}, "$push", function(ret) {
        if (!ret) {
            return col.insertOne(res, {_id: req.useriD, vegetable: [vegetable]}, function(ret) {
                if (!ret) {
                    return res.send({code: 301});
                }
                res.send({code: 1});
            })
        }
        res.send({code: 1});
    });
});


router.post("/vegetable_info", function(req, res) {
    var lz_userID_str = req.body.lz_userID_str;

    if (!lz_userID_str) {
        return res.send({code: 0});
    }
    var lz_userID = ct.mongo.get_object_id(lz_userID_str);
    if (!lz_userID) {
        return res.send({code: 112});
    }
    var col = ct.mongo.v_col;

    col.findOne(res, {_id: lz_userID}, function(ret) {
        if (!ret) {
            return res.send({code: 302});
        }
        res.send({code: 1, data: ret.vegetable});
    })
});

router.post("/get_vegetable", function(req, res) {
    var timestamp = req.body.timestamp;
    var lz_userID_str = req.body.lz_userID_str;
    if (!timestamp || !lz_userID_str) {
        return res.send({code: 0});
    }

    var lz_userID = ct.mongo.get_object_id(lz_userID_str);
    if (!lz_userID) {
        return res.send({code: 112});
    }

    var col = ct.mongo.v_col;
    col.updateOne(res, {_id: lz_userID}, {vegetable: {timestamp: timestamp}}, "$pull", function(ret) {
        if (!ret) {
            return res.send({code: 303});
        }
        var col = ct.mongo.password_col;
        //更新原有用户的价值！！

        //加法，这里要检查一下，看这么用，对不对。
        col.updateOne(res, {_id: lz_userID}, {value: 2}, "$inc", function(ret) {
            if (!ret) {
                return res.send({code: 304});
            }
            return res.send({code: 1});
        });
        //res.send({code: 1, value: 2});//返回这颗菜的价值。
    })
});



//还要加一个定时器，定时让蔬菜成长


module.exports = router;



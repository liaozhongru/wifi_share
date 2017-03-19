var express = require('express');
var router = express.Router();


/**
 * 查看用户权限,是否有使用wifi的权限
 */
router.post("/permission", function(req, res) {
  var userID = req.userID;
  var col = ct.mongo.password_col;

  col.findOne(res, {owner: userID}, function(ret) {
    if (!ret) {
      return res.send({code: 3, status: 0});
    }
    res.send({code: 1, status: ret.status});
  })
});

router.post("/add_log", function(req, res) {

  var files = req.files;
  if (!files) {
    return res.send({code: 0});
  }
  res.send({code: 1});
});

/**
 * 发布阳台信息
 */


/**
 * 发布帖子
 */
router.post("/add_info", function(req, res) {

  log("liao1425---, ", req.body);

  var files = req.files;

  //if (!files) {
  //  return res.send({code: 0});
  //}

  var content = req.body.content;
  var bssid = req.body.bssid;
  var file_path = files.files ? files.files.path: "";
  if (!content || !files.files || !bssid) {
    log("liao1930");
    return res.send({code: 0});
  }


  log("liao2120, ",file_path);

  //var p =  '/Users/liaozhongru/Desktop/11.Wifi/wifi_share/resource/public_pic/upload_24600046d87be6772d37d67d50860b80';

  //var pos = file_path.indexOf("public_pic/");
  ////log("liao2130, ", ss);
  var part_file_path = ct.utils.trim2relative_path("public_pic", file_path);
  //log("liao2131, ", part_file_path);



  //var part_file_path =
  //log("liao2121, ", files.files);

  var col = ct.mongo.public_col;
  col.insertOne(res, {
    owner: req.userID,
    bssid: bssid,
    content: content,
    public_timestamp: ct.utils.get_timestamp(),
    pic_path: part_file_path }, function(ret) {
    if (!ret) {
      return res.send({code: 252});
    }
    var password_col = ct.mongo.password_col;
    password_col.updateOne(res, {_id: req.userID},{status: 2}, function(ret) {
        res.send({code: 1});
    });
  });




  //})

});


/**
 * 获取阳台信息
 */
router.post("/get_info", function(req, res) {
  //var seller_userID_str = req.body.seller_userID;
  var bssid = req.body.bssid;
  var lz_userID = ct.mongo.get_object_id(req.body.lz_userID);

  if (!bssid || !lz_userID) {
    return res.send({code: 0});
  }


  var col = ct.mongo.public_col;
  col.findOne(res, {bssid: bssid}, function(ret) {
    if (!ret) {
      return res.send({code: 10});
    }
    ret.code = 1;
    ret.pic_path = ct.utils.trim2relative_path("public_pic", ret.pic_path);
    var wifi_col = ct.mongo.wifi_col;

    wifi_col.findOne(res, {bssid: bssid, favor_userIDs: {"$all": [req.userID]}}, function(ret1) {
      if (ret1) {
        ret.is_favor = true;
      }  else {
        ret.is_favor = false;
      }
      //ret.favor_number = ret1.favor_userIDs? ret1.favor_userIDs.length: 0;

      return res.send(ret);

      //var password_col = ct.mongo.password_col;
      //password_col.findOne(res, {_id: lz_userID}, function(ret2) {
      //  if (!ret2) {
      //    return res.send({code: 3});
      //  }
      //  ret.gender = ret2.gender;
      //  ret.name = ret2.name;
      //  ret.avatar_url = ret2.avatar_url;
      //  ret.status = ret2.status;
      //  return res.send(ret);
      //});
    });
  })
});
/**
 * 删除整个阳台信息
 */
router.post("/delete_info", function(req, res) {
  var userID = req.userID;
  var col = ct.mongo.public_col;
  col.deleteOne(res, {owner: userID}, function(ret) {
    log("liao2133, ", ret);
    var password_col = ct.mongo.password_col;
    password_col.updateOne(res, {_id: userID}, {status: 1}, function(ret) {
      res.send({code: 1});
    });

  })
});
//添加，或者删除赞。  //查找数据库，有数据就删除数据，没有数据就添加数据
router.post("/add_favor", function(req, res) {
  //var value = req.body.value;
  var lz_userID = ct.mongo.get_object_id(req.body.lz_userID);
  if (!lz_userID) {
    //return res.send{code: 0};
    return res.send({code: 0});
  }

  var col = ct.mongo.wifi_col;



  //col.findOne("",{name: "liao", "array": {"$all": ["10"]}}, function(ret) {
  //  log("liao, ", ret);
  //})
  col.findOne(res, {owner: lz_userID, favor_userIDs: {"$all":[req.userID]}}, function(ret) {

    log("liao0016, ", ret);
    if (!ret) {
      //.....
      col.updateOne(res, {owner: lz_userID}, {favor_userIDs: req.userID}, "$push", function(ret) {


        return res.send({code: 1, status: 1});
      })
    } else {
      col.updateOne(res, {owner: lz_userID}, {favor_userIDs: req.userID}, "$pull", function(ret) {
        log("liao1443, ", ret);
        return res.send({code: 1, status: 0});
      })
    }


    //col.updateMany("", {key113: 1},{key111:5},"$push", function(ret) {
    //  log("liao0024, ", ret);
    //})

  });
  //col.updateOne(res, {_id: lz_userID}, {value: 2}, "$inc", function(ret) {
//这个要试验一下，看是不是可以用。
//  col.updateOne(res, {owner: lz_userID}, {favor_number: value}, "$inc", function(ret) {
//    res.send({code: 1});
//  });
});

setTimeout(function() {
  var lz_userID = ct.mongo.get_object_id("58cbab3175b9fc047e13ecd5");
  var col = ct.mongo.public_col;
  //col.updateOne("", {owner: lz_userID}, {
  //  comment_array: {
  //    comment: "111",
  //    comment_timestamp: 1234,
  //    owner: "58cbab3175b9fc047e13ecd5",
  //    name: "shabi",
  //    avatar_url: "ffff",
  //    gender: 0,
  //  }}, "$push", function(ret) {
  //  log("liao2217, ", ret);
  //});
  //col.updateOne("", {owner:lz_userID}, {
  //  comment_array: {
  //    comment_timestamp: "1489755080"
  //  }
  //}, "$pull", function(ret) {
  //  log("liao2121, ", ret);
  //})

}, 1000);


router.post("/add_comment", function(req, res) {
  var comment = ct.utils.trim(req.body.comment);
  var lz_userID = ct.mongo.get_object_id(req.body.lz_userID);
  var comment_timestamp = req.body.comment_timestamp;
  //var userID = req.userID;
  if (!comment || comment.length < 1 || !lz_userID || !comment_timestamp) {
    log("liao2139,");
    return res.send({code: 0});
  }

  var password_col = ct.mongo.password_col;
  password_col.findOne(res, {_id: req.userID}, function(ret0) {

    var col = ct.mongo.public_col;
    log("liao2114,", lz_userID);
    col.updateOne(res, {
      owner: lz_userID
    }, {
      comment_array: {
        comment: comment,
        comment_timestamp: comment_timestamp,
        owner: req.userID.toString(),
        name: ret0.name,
        avatar_url: ret0.avatar_url,
        gender: ret0.gender,

      }
    }, "$push", function(ret) {
      log("liao1909, ", ret);
      if (!ret) {
        return res.send({code: 253});
      }
      res.send({code: 1});
    })


  })
});

//自己发的信息，自己可以删除，别人删除不了
router.post("/delete_comment", function(req, res) {

  var lz_userID_str = req.body.lz_userID;
  var comment_timestamp = req.body.comment_timestamp;
  if (!lz_userID_str || !comment_timestamp) {
    log("liao2158");
    return res.send({code: 0});
  }
  var lz_userID = ct.mongo.get_object_id(lz_userID_str);
  if (!lz_userID) {
    return res.send({code: 112});
  }
  log("liao2132, ",comment_timestamp,"type is ", typeof comment_timestamp);

  //var temp = ct.mongo.get_object_id("58b7ba9429cbb139493a0a44");
  var col = ct.mongo.public_col;
  col.updateOne(res, {owner: lz_userID}, {
    comment_array: {
      comment_timestamp: comment_timestamp
    }
  }, "$pull", function(ret) {
    log("liao2207,", ret);
    if (!ret) {
      return res.send({code: 254});
    }
    res.send({code: 1});

  });
});

module.exports = router;

var express = require('express');
var router = express.Router();


/**
 * 查看用户权限,是否有使用wifi的权限
 */
router.post("/permission", function(req, res) {
  var userID = req.userID;
  var col = ct.mongo.wifi_col;
  col.findOne(res, {owner: userID}, function(ret) {
    if (!ret) {
      return res.send({code: 1, wifi_permission: false});
    }
    res.send({code: 1, wifi_permission: true});
  })
});

/**
 * 发布阳台信息
 */
router.post("/add_info", function(req, res) {

  log("liao1425---, ", req.body);

  var files = req.files;

  if (!files) {
    return res.send({code: 0});
  }

  var content = req.body.content;
  var file_path = files.files ? files.files.path: undefined;
  if (!content || !file_path) {
    log("liao1930");
    return res.send({code: 0});
  }

  log("liao2120, ",file_path);
  var col = ct.mongo.public_col;
  col.insertOne(res, {
    owner: req.userID,
    content: content,
    pic_path: file_path
  }, function(ret) {
    if (!ret) {
      return res.send({code: 252});
    }
    res.send({code: 1});
  });




  //})

});


/**
 * 获取阳台信息
 */
router.post("/get_info", function(req, res) {
  var seller_userID_str = req.body.seller_userID;
  if (!seller_userID_str) {
    return res.send({code: 0});
  }
  //如果这个id是错误的呢
  var seller_userID = ct.mongo.get_object_id(seller_userID_str);
  if (!seller_userID) {
    return res.send({code: 112});
  }
  var col = ct.mongo.public_col;
  col.findOne(res, {owner: seller_userID}, function(ret) {
    if (!ret) {
      return res.send({code: 3});
    }
    ret.code = 1;
    res.send(ret);
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
    res.send({code: 1});
  })
});

router.post("/add_comment", function(req, res) {
  var comment = ct.utils.trim(req.body.comment);
  var lz_userID = ct.mongo.get_object_id(req.body.lz_userID);
  var comment_timestamp = req.body.comment_timestamp;
  //var userID = req.userID;
  if (!comment || comment.length < 1 || !lz_userID || !comment_timestamp) {
    log("liao2139,");
    return res.send({code: 0});
  }

  var col = ct.mongo.public_col;
  col.updateOne(res, {
    owner: lz_userID
  }, {
    comment_array: {
      comment: comment,
      comment_timestamp: comment_timestamp,
      author: req.userID
    }
  }, "$push", function(ret) {
    log("liao1909, ", ret);
    if (!ret) {
      return res.send({code: 253});
    }
    res.send({code: 1});
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

  //var temp = ct.mongo.get_object_id("58b7ba9429cbb139493a0a44");
  var col = ct.mongo.public_col;
  col.updateOne(res, {owner: lz_userID}, {
    comment_array: {
      comment_timestamp: comment_timestamp,
      author: req.userID
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

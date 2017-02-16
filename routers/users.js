var express = require('express');
var router = express.Router();

///* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});
/**
 * 查看用户权限,是否有使用wifi的权限
 */
router.post("/permission", function(req, res) {
  var userID = req.userID;
  var col = ct.mongo.wifi_col;
  col.findOne(res, {_id: userID}, function(ret) {
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

  //log("liao1425,");
  //var Form = require("formidable");
  //var form = new Form.IncomingForm();
  //
  //form.encoding = 'utf-8';
  //form.uploadDir = 'resource/public_pic';
  //form.maxFieldsSize = 10 * 1024 * 1024;
  //form.parse(req, function(err, fileds, files) {
  //  log("liao1421,", err, fileds, files);
  //  var file_name = files.files.name;
  //  var file_path = files.files.path;
  //  var content = fields.content;
  //  //log("liao")
  //
  //
  //  res.send({code: 1,file_name: file_name, file_path: file_path});
  //
  //})
  ct.utils.parser_upload_file(req, res, function(fields, files) {
    if (!fields || !files) {
      return res.send({code: 0});
    }

    var content = fields.content;
    var file_path = files.files ? files.files.path: undefined;
    if (!content || !file_path) {
      return res.send({code: 0});
    }

    var col = ct.mongo.public_col;
    col.insertOne(res, {
      _id: req.userID,
      content: content,
      pic_path: file_path
    }, function(ret) {
      if (!ret) {
        return res.send({code: 252});
      }
      res.send({code: 1});
    })


  })

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
  col.findOne(res, {_id: seller_userID}, function(ret) {

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
  col.deleteOne(res, {_id: userID}, function(ret) {

    res.send({code: 1});
  })
});

router.post("/add_comment", function(req, res) {
  var comment = ct.utils.trim(req.body.comment);
  var lz_userID = ct.mongo.get_object_id(req.body.lz_userID);
  var comment_timestamp = req.body.comment_timestamp;



  //var userID = req.userID;
  if (!comment || comment.length < 1 || !lz_userID || comment_timestamp) {
    return res.send({code: 0});
  }

  var col = ct.mongo.public_col;
  col.updateOne(res, {
    _id: lz_userID
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

router.post("/delete_comment", function(req, res) {

  var lz_userID_str = req.body.lz_userID;
  if (!lz_userID_str) {
    return res.send({code: 0});
  }

  var lz_userID = ct.mongo.get_object_id(lz_userID_str);
  if (!lz_userID) {
    return res.send({code: 112});
  }

  var col = ct.mongo.public_col;
  col.updateOne(res, {_id: lz_userID}, {comment_array: {author: req.userID}}, "$pull", function(ret) {
    if (!ret) {
      return res.send({code: 254});
    }
    res.send({code: 1});

  });



});





module.exports = router;

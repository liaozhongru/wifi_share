var moment = require('moment');
var http_timeformat = 'ddd, DD MMM YYYY HH:mm:ss Z';
var crypto = require('crypto');

module.exports = {
    /**
     * Decode JSON String
     */
    decode_json: function(str, callback) {
        try {
            var parsed = JSON.parse(str);
            callback(null, parsed);
        } catch (e) {
            callback(e, null);
        }
    },
    date_2_http_format: function(date) {
        if (!date) date = Date.now();
        return moment(date).format(http_timeformat);
    },
    parse_http_date: function(str) {
        return moment(str, http_timeformat);
    },
    get_timestamp: function(date) {
        var time_in_ms = date ? date.getTime() : Date.now();
        return Math.round(time_in_ms / 1000);
    },
    random_int: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    /**
     * 获取一个 sha1 随机字符串
     * @return {String}
     */
    random_str: function() {
        var random_str = crypto.randomBytes(32).toString('hex') + new Date().getTime();
        var hash = crypto.createHash('sha1');
        return hash.update(random_str).digest('hex');
    },
    /**
     * 判断对象是否=={}
     * @param obj
     * @returns {boolean}
     */
    is_object_empty: function(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    },
    parser_upload_file: function(req, res, options, callback) {

        if (!callback) {
            callback = options;
            options = null;
        }
        log("liao1425,");
        var Form = require("formidable");
        var form = new Form.IncomingForm();

        form.encoding = 'utf-8';
        form.uploadDir = (options && options.upload_dir)? options.upload_dir: 'resource/public_pic';
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.parse(req, function(err, fields, files) {
            log("liao1421,", err, fields, files);
            if (err) {
                //return res.send({code: 251,})
                err.code = 251;
                return ct.error_handler(res, err);
            }

            if (callback) {
                fields = this.is_object_empty(fields)? undefined: fields;
                files = this.is_object_empty(files)? undefined: files;
                callback(fields, files);
            }
            //var file_name = files.files.name;
            //var file_path = files.files.path;
            //var content = fields.content;
            //
            //
            //res.send({code: 1,file_name: file_name, file_path: file_path});

        })
    },
    trim: function(str, type) {
        if (!str) {
            return;
        }
        if (!type) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (type == "right") {
            return str.replace(/(\s*$)/g, "");
        }
        if (type == "left") {
            return str.replace(/(^\s*)/g, "");
        }

    }
}

/**
 * Created by liaozhongru on 17/2/6.
 */

/**
 *
 * @param mongo
 * @param coll_name
 * @param options 必须含有index字段，index字段中必须含有name字段，
 * index中type字段可选，不选默认type是1。一般用于2dsphere。
 * @constructor
 */
function KZCollection(mongo, coll_name, indexs) {

    this.col = mongo.db.collection(coll_name);
    this.indexs = indexs;
    if (indexs) {
        for (var i in indexs) {
            //var ret = array[i];
            var name = indexs[i].name;
            var type = indexs[i].type;
            //log("liao2144, ",name, type);
            var option = {};
            if (!type) {
                type = 1;
            }
            option[name] = type;
            this.col.createIndex(option);


            //if (type) {
            //
            //
            //    //this.col.createIndex(name, type);
            //} else {
            //    //真的是这么写？？
            //    //var option
            //    //索引升序处理。
            //    option[name] = 1;
            //    this.col.createIndex(option);
            //}
            //this.col.createIndex()
        }

    }
}


KZCollection.prototype = {

    /**
     * 增
     * @param res 没有，传入空字符串
     * @param object
     * @param callback：    成功返回CommandResult对象，
     * 该对象有insertedCount、insertedId表征插入个数，
     * 以及_id，插入失败返回undefined
     */
    insertOne: function(res, object, callback) {
        this.col.insertOne(object, function(err, ret) {
            if (err) {
                err.code = 101;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                if (ret.insertedCount < 1) {
                    return callback();
                }
                callback(ret);
            }
        });
    },
    /**
     *
     * @param res
     * @param array
     * @param callback:成功，返回对象，对象insertedCount、insertedIds
     * 字段表征插入几个，以及_id数组,数组不是全部插入成功，返回undefined
     */
    insertMany: function(res, array, callback) {
        this.col.insertMany(array, function(err, ret) {
            if (err) {

                err.code = 102;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                if (ret.insertedCount < 1) {
                    return callback();
                }
                if (ret.insertedCount != insertedIds.length) {
                    return callback();
                }
                callback(ret);
            }
        })
    },
    /**
     * 删
     * @param res
     * @param filter
     * @param callback:  返回CommandResult，该对象deletedCount表征删除了
     * 几个，1表示成功删除,0表示没找到,所以没删除，删除没有失败之说，
     * 因为可能数据库根本没数据。
     */
    deleteOne: function(res, filter, callback) {
        this.col.deleteOne(filter, function(err, ret) {
            if (err) {
                err.code = 103;
                return ct.error_handler.send(res, err);
            }

            //log("liao1743, ", ret);
            if (callback) {
                callback(ret);
            }
        });
    },
    /**
     *
     * @param res
     * @param filter
     * @param callback: 返回CommandResult对象，该对象deletedCount表征删
     * 了几个，0个表示没找到，所以没删除
     */
    deleteMany: function(res, filter, callback) {
        this.col.deleteMany(filter, function(err, ret) {
            if (err) {
                err.code = 104;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }
        })
    },
    /**
     * 改
     * @param res
     * @param filter
     * @param update：如果结果中没有更新部分，则在结果中添加该部分
     * @param callback：返回的ret是一个对象，matchedCount,modifiedCount字段
     * 表征查到了几个，和修改了几个。
     */
    updateOne: function(res, filter, update, type, callback) {
        if (!callback) {
            callback = type;
            type = "$set";
        }


        //var type = "$push";
        var up = {};
        up[type] = update;
        //log(""){$set: update}
        this.col.updateOne(filter, up, function(err, ret) {
            if (err) {
                err.code = 105;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }
        });
    },
    /**
     *
     * @param res
     * @param filter
     * @param update:如果结果中没有更新部分，则在结果中添加该部分
     * @param callback:返回的ret是一个对象，matchedCount,modifiedCount字段
     * 表征查到了几个，和修改了几个。
     */
    updateMany: function(res, filter, update, type,callback) {

        if (!callback) {
            callback = type;
            type = "$set";
        }

        var up = {};
        up[type] = update;


        this.col.updateMany(filter, up, function(err, ret) {
            if (err) {
                err.code = 106;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }
        })
    },
    /**
     * 查
     * @param res
     * @param filter:如果是用主键查找的话，是这样{_id,ObjectID}，注意，这个值必须是ObjectID类型。
     * @param limit
     * @param callback：返回ret，是一个对象，没有找到，返回undefined。
     */
    findOne: function(res, filter, callback) {
        //this.findSome(res, filter, 1, callback})
        this.findSome(res, filter, 1, callback);
    },
    /**
     * 查
     * @param res
     * @param filter:如果是用主键查找的话，是这样{_id,ObjectID}，注意，这个值必须是ObjectID类型。
     * @param limit
     * @param callback：返回ret,limit是1，返回对象，limit超过1，返回数组，不存在返回undefined。
     */
    findSome: function(res, filter, limit, callback) {
        log("liao1502,", filter, limit);
        this.col.find(filter).limit(limit).toArray(function(err, docs) {
            if (err) {
                err.code = 107;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                //log("liao21656,", docs);
                if (docs.length < 1) {
                    return callback();
                }
                if (docs.length == 1) {
                    return callback(docs[0]);
                }

                callback(docs);
            }
        });
    },
    /**
     *
     * @param res
     * @param filter
     * @param callback:找到数据，返回数组，找不到，返回undefined
     */
    findAll: function(res, filter, callback) {

        //必须要用toArray的方式，因为直接用回调，可能得到的是Couror
        this.col.find(filter).toArray(function(err, docs) {
            if (err) {
                err.code = 108;
                return ct.error_handler.send(res, err);

            }
            if (callback) {
                if (docs.length < 1) {
                    return callback();
                }
                callback(docs);
            }
        });

        //this.col.find(filter, function(err, docs) {
        //    if (err) {
        //        err.code = 108;
        //        return ct.error_handler.send(res, err);
        //
        //    }
        //    if (callback) {
        //        if (docs.length < 1) {
        //            return callback();
        //        }
        //        callback(docs);
        //    }
        //})
    },

    /**
     * 统计
     * @param res
     * @param filter
     * @param callback:返回数字类型count，0表示没有
     */
    count: function(res, filter, callback) {
        this.col.count(filter, function(err, count) {
            if (err) {
                err.code = 109;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(count);
            }
        })
    },
    /**
     * 分页数据
     * @param res
     * @param params
     * @param callback
     */
    get_paged_list: function(res, params, callback) {
        var query = params.query,
            sort = params.sort,
            cur_page = params.cur_page ? parseInt(params.cur_page) : 1,
            per_page = params.per_page ? parseInt(params.per_page) : 10;

        per_page = per_page > 0 ? per_page : 10;
        var m = this;

        m.count(res, query, function(count) {
            if (count == 0) {
                return callback({
                    list: [],
                    has_more: false,
                    total_num: 0,
                    total_page: 0
                });
            }
            m.col.aggregate([
                {
                    $match: query
                },
                {
                    $sort: sort
                },
                {
                    $skip: (cur_page - 1) * per_page
                },
                {
                    $limit: per_page
                }
            ], function(err, ret) {
                if (err) {
                    err.code = 110;
                    return ct.error_handler.send(res, err);

                }
                var total_page = Math.ceil(count / per_page);
                return callback({
                    list: ret,
                    has_more: (cur_page < total_page),
                    total_num: count,
                    total_page: total_page
                })
            })
        });
    },
    /**
     * 仅仅支持insertOne, insertMany, updateOne, updateMany, removeOne, removeMany, deleteOne, deleteMany
     * @param res
     * @param operations:见mongodb文档的CRUD部分
     * @param callback
     */
    bulkWrite: function(res, operations, callback) {
        this.col.bulkWrite(operations, {ordered: true}, function(err, ret) {
            log("liao1159, ", err, ret);
            if (err) {
                err.code = 111;
                return ct.error_handler.send(res, err);
            }
            if (callback) {
                callback(ret);
            }
        })
    }
    //,
    //bulkRead: function(res, operations, callback) {
    //
    //}
};

module.exports = KZCollection;
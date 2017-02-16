/**
 * Created by liaozhongru on 17/2/8.
 */

function KZTable(database, coll_name) {
    ////如果options不存在，表示使用mongodb
    //if (!options) {
    //    return this.col = database.db.collection(coll_name);
    //}
    ////如果options存在，表示使用某种数据库
    //
    //if (options.database == "mysql") {
    //    return this.col = "自己实现一个col类，这个类要有下面的各种方法";
    //}

}


KZTable.prototype = {
    insertOne: function(res, object, callback) {

    },
    insertMany: function(res, array, callback) {

    },
    deleteOne: function(res, filter, callback) {

    },
    deleteMany: function(res, filter, callback) {

    },
    updateOne: function(res, filter, update, callback) {

    },
    updateMany: function(res, filter, update, callback) {

    },
    findSome: function(res, filter, limit, callback) {

    },
    findAll: function(res, filter, callback) {

    },
    count: function(res, filter, callback) {

    },
    get_paged_list: function(res, params, callback) {

    }
};

module.exports = KZTable;
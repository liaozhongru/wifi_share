/**
 * Created by liaozhongru on 17/2/8.
 */
function KZMySQL(opt) {
    var m = this;
    m.opt = opt;
    m.db = null;
    m.connect(function(db) {

    });
}
KZMySQL.prototype = {
    connect: function(callback) {

    }
};

module.exports = KZMySQL;
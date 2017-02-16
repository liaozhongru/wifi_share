/**
 * 提供一个全局的命令空间,用于存储对象，存储初始化对象，以及提供后续存储对象
 */

var context = {

};

/**
 * 挂载必要的全局变量
 */
var Mongo = require("./mongo_lib");
var Redis = require("./redis_lib");
var error_handler = require("./error_handler_lib");
var utils = require("./utils_lib");
var crypto = require("./crypto_lib");

context.mongo = new Mongo(cconf.get("mongo"));
context.redis = new Redis();
context.error_handler = error_handler;
context.utils = utils;
context.crypto = crypto;

module.exports = context;

////var uproto = require('uproto');
//var typed_allowed = ['api', 'ds', 'lib', 'model'];
//var dir_map = {
//    api: 'api',
//    lib: 'lib',
//    model: 'models'
//};
//
//var context = {
//    _ref_pool: {}, //引用池
//    register: function(type, name, ins) {
//        if (typed_allowed.indexOf(type) === -1) {
//            throw new Error("unkonw context type:  " + type);
//        }
//        if (this._ref_pool[type][name]) {
//            throw new Error(type + " with name " + name + " already exists.");
//        }
//        this._ref_pool[type][name] = ins;
//    },
//    /**
//     * 初始化自动加载机制
//     */
//    init_autoload: function(opt) {
//        this.conf = opt.conf;
//    },
//    /**
//     * 自动加载模块
//     * @param {String} type
//     * @param {String} name
//     * @return {Object}
//     */
//    autoload: function(type, name) {
//        var dir = dir_map[type] ? dir_map[type] : type;
//        var module_path = '../' + dir + '/' + name.replace(/\_/g, '-');
//        var TheModule = require(module_path);
//        var ins = TheModule.__name ? TheModule : new TheModule({
//            context: this,
//            conf: this.conf.get(type + '_' + name)
//        });
//        //console.log('autoload: ' + type + ': ' + name + ' ' + module_path);
//        context.register(type, name, ins);
//        return ins;
//    }
//}
//
//typed_allowed.forEach(function(type) {
//    //add namespace
//    context._ref_pool[type] = {};
//
//    //add getters
//    context[type] = (function(type) {
//        return function(name) {
//            if (!this._ref_pool[type][name]) {
//                var ins = this.autoload(type, name);
//                if (!ins) {
//                    throw new Error(type + " not found: " + name);
//                }
//            }
//            return this._ref_pool[type][name];
//        };
//    })(type);
//
//    //add setters
//    context['register_' + type] = (function(type) {
//        return function(name, ins) {
//            this.register(type, name, ins);
//            return this;
//        };
//    })(type);
//});
//
//module.exports = context;
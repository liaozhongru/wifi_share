var fs = require('fs');
var path = require('path');
var utils = require('./utils');

var sources = {};
var parsers = {};

module.exports = {
    register_format: function(name, parser) {
        parsers[name] = parser;
    },
    //current config namespace
    currentNamespace: 'default',
    //check config file
    file_exists: function(path) {
        var fs = require('fs');
        try {
            var stat = fs.statSync(path);
            return true;
        } catch (e) {
            return false;
        }
    },
    file_extension: function(filename) {
        return filename.substr(filename.lastIndexOf('.') + 1);
    },
    file: function (namespace, file_path, options) {
        if (arguments.length === 1) {
            file_path = namespace;
            namespace = 'default';
        }
        if (!this.file_exists(file_path)) {
            throw new Error('Config file not found: ' + file_path);
        }
        if (!options) {
            options = {};
        }
        if (path.step === '//') {
            file_path = file_path.replace('/', path.step);
        }

        var format = options.format ? options.format : 'auto';
        if (format === 'auto') {
            format = this.file_extension(file_path);
        }
        var parser = parsers[format];
        var str = fs.readFileSync(file_path, {encoding: 'utf-8'});
        var obj = parser.parse(str);
        this.merge(obj);
    },
    namespace: function() {
        return this.currentNamespace;
    },
    use: function(namespace) {
        if (!sources[namespace]) {
            sources[namespace] = {};
        }
        this.currentNamespace = namespace;
        return this;
    },
    get: function(name) {
        return sources[this.currentNamespace][name];
    },
    set: function(name, value) {
        sources[this.currentNamespace][name] = value;
    },
    merge: function(obj) {
        if (obj && typeof obj === 'object') {
            var n = this.currentNamespace;
            if (!sources[n]) {
                sources[n] = {};
            }
            sources[n] = utils.object_merge(sources[n], obj);
        }
    },
    export: function(namespace) {
        if (namespace) {
            this.use(namespace);
        }
        return sources[this.currentNamespace];
    }
};
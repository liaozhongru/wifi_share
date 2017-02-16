var scalar_types = ["undefined", "boolean", "number", "string"];

module.exports = {
    is_scalar: function (value) {
        //type of null === 'object'
        if (value === null) {
            return true;
        }
        var type = typeof value;
        return scalar_types.indexOf(type) > -1;
    },
    is_object: function(value) {
        return value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value);
    },
    is_array: Array.isArray,
    deep_copy: function(obj) {
        var me = this;
        if (me.is_scalar(obj)) {
            return obj;
        } else if (me.is_array(obj)) {
            var new_arr = [];
            for(var key in obj) {
                var v = obj[key];
                new_arr[key] = me.deep_copy(v);
            }
            return new_arr;
        } else {
            var new_obj = {};
            Object.keys(obj).forEach(function(key) {
                var v = obj[key];
                new_obj[key] = me.deep_copy(v);
            });
            return new_obj;
        }
    },
    object_deep_merge: function(a, b, options) {
        var me = this;
        if (!me.is_object(a) || !me.is_object(b)) {
            return me.deep_copy(b);
        } else {
            var base = me.deep_copy(a);
            Object.keys(b).forEach(function(key) {
                var v = b[key];
                base[key] = me.object_deep_merge(base[key], v);
            });
            return base;
        }
    },
    object_merge: function() {
        var me = this,
            new_obj;
        if (arguments.length == 1) {
            return this.deep_copy(arguments[0]);
        }
        var base = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            base = me.object_deep_merge(base, arguments[i]);
        }
        return base;
    }
};
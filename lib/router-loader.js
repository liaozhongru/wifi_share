var fs = require('fs');
module.exports = function(app, router_dir, path_prefix) {

    //llog("liao11813");
    function load_router(router_dir, path_prefix) {
        var routers = fs.readdirSync(router_dir);
        //llog("liao11814", routers, router_dir);
        routers.forEach(function(filename) {
            var matches = filename.match(/^([^.]+)\.js$/);
            if (matches && matches.length === 2) {
                var url_pathname = path_prefix + '/' + matches[1],
                    router_path = router_dir + '/' + filename;
                var router = require(router_path);
                app.use(url_pathname, router);
                //console.log('Load router: ' + url_pathname + ', ' + router_path);
            } else {
                var sub_router_dir = router_dir + '/' + filename;
                var stats = fs.statSync(sub_router_dir);
                if (stats.isDirectory()) {
                    load_router(sub_router_dir, path_prefix + '/' + filename);
                }
            }
        });
    }
    router_dir = fs.realpathSync(router_dir);
    //setTimeout(function() {
        load_router(router_dir, path_prefix);
    //}, 500);

};
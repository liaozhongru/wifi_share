/**
 * Created by liaozhongru on 17/2/7.
 */

/**
 * 这里之所以添加这个错误处理类，是为了方便以后在这里批处理错误，包括日志的录入等等。
 * @param res
 * @param err:自己不要生成错误，自己生成的逻辑错误，返回自己的一套错误码，系统自动生成的错误，才用这个函数
 */

module.exports = {
    save: function(err) {
        log("liaoerror== ", err);
    },
    /**
     *
     * @param res
     * @param err: 最好要指明err.status,err.code, err.message,
     * @param not_save:true是不保存，不设定，默认是保存
     */
    send: function(res, err, not_save) {
        if (typeof res.status == "function") {
            var code = err.code? err.code: -3;
            var message = err.message? err.message: "程序员哥哥没写message";
            res.status(err.status || 500).send({
                code: code,
                message: message
            });
        }

        if (!not_save) {
            this.save(err);
        }
    }
};
//module.exports = function(res, err) {
//
//    //log("liao11111", res);
//    //log("err.massge ---", err);
//    //res.locals.message = err.message;
//    //res.locals.error = app.get('env') === 'development' ? err : {};
//
//    //res.locals.error = err;
//    // render the error page
//    //res.status(err.status || 500);
//    //res.render('error');
//
//
//    //res.send({code: 0});
//
//};
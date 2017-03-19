/**
 * Created by liaozhongru on 17/2/8.
 */

module.exports = {
    /**
     * 这个路由放在哪里都可以
     * 重写send方法:重写系统方法时候，不要用下划线，比如重写send方法，不要用_send，会与原有方法冲突

     * res.send([body])
     Sends the HTTP response.
     The body parameter can be a Buffer object, a String, an object,
     or an Array. For example:
     * @param req
     * @param res
     * @param next
     */
    res_send_override: function(req, res, next) {
        res.new_send = res.send;
        res.send = function(body) {
            log("liao1704,send,body is ",body);
            if (typeof body.code == "number" && (body.code != 1)) {
                ct.error_handler.save(body);
                res.status(500);
            }
            res.new_send(body);
        };
        next();
    }
};
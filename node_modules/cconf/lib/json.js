var cconf = require('./cconf');
cconf.register_format('json', {
    parse: JSON.parse
});
module.exports = cconf;
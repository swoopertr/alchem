let token_cache = {};

var dataCache = {
    token: {
        check_token: function (token, cb) {
            if (token_cache[token]) {
                cb && cb(token_cache[token]);
            } else {
                cb && cb(null);
            }
        },
        add_token: function (token, expire, type, cb) {
            token_cache[token] = {
                expire: expire,
                type : type
            };
            cb && cb(token_cache[token]);
        },
        remove_token: function (token, cb) {
            delete token_cache[token];
            cb && cb();
        }
    }
};

module.exports = dataCache;
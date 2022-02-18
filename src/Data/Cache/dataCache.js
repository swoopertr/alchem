let tokens = require('./../Tokens/token');


let getunExpiredTokens = async function () {
    global.token.token_cache = {};
    let results = await tokens.async.getUnexpiredTokens();
    let len = results.length;
    for (let i = 0; i < len; i++) {
        let item = results[i];
        global.token.token_cache[item.token] = {
            expire: item.token_exp,
            type: item["Type"],
            userName: item["Name"],
        };
    }
};


var dataCache = {
    init: async function () {
        global.token = {};
        await getunExpiredTokens();
    },

    token: {
        check_token: function (token, cb) {
            if (global.token.token_cache[token]) {
                cb && cb(global.token.token_cache[token]);
            } else {
                cb && cb(null);
            }
        },
        add_token: function (token, expire, name, type) {
            global.token.token_cache[token] = {
                expire: expire,
                type: type,
                userName: name,
            };
        },
        remove_token: function (token, cb) {
            delete global.token.token_cache[token];
            cb && cb();
        }
    }
};

module.exports = dataCache;
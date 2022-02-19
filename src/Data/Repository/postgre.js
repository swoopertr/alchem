var setting = require('../../Config/setting');
const {Client} = require('pg');

var dataAccess = {

    query: async function (query, cb, cbErr) {
        const client = new Client({
            user: setting.postGreDb.user,
            host: setting.postGreDb.ip,
            database: setting.postGreDb.dbname,
            password: setting.postGreDb.pass,
            rejectUnauthorized: false,
        });

        try {
            await client.connect();
            const res = await client.query(query);
            switch (res.command) {
                case "DELETE":
                case "UPDATE":
                    cb && cb(res.rowCount);
                    break;
                case "INSERT":
                    cb && cb(res.rows);
                    break;
                case "SELECT":
                    if (res.rows) {
                        cb && cb(res.rows);
                    }
                    break;
            }
        } catch (e) {
            console.log({e});
            cbErr && cbErr(e);
        } finally {
            await client.end();
        }
    }
};
module.exports = dataAccess;
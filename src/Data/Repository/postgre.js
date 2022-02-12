var setting = require('../../Config/setting');

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: setting.postGreDb.user,
    host: setting.postGreDb.ip,
    database: setting.postGreDb.dbname,
    password: setting.postGreDb.pass,
    port: setting.postGreDb.port,
})




var dataAccess = {

    query: function (query, cb, cbErr) {
        try{
            const client = new Client({
                connectionString : setting.PostGreConnection,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            client.connect();
            client.query(query, (err, res) => {
                if(err){
                    client.end();
                    console.log(err, res);
                    cbErr && cbErr(err);
                }
                switch (res.command) {
                    case "DELETE":
                    case "UPDATE":
                        cb && cb(res.rowCount);
                        break;
                    case "INSERT":
                        cb && cb(res.rows);
                        break;
                    case "SELECT":
                        if (res.rows){
                            cb && cb(res.rows);
                        }
                        break;
                }
            });
        }catch (e){
            console.log({e});
        }finally {
           // client.end();
        }
    }
};
module.exports = dataAccess;
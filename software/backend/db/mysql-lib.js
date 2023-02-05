/**
 * Created by Mohit Singh
 */
const Mysql = require('mysql');
const Util = require('util');
const Config = require('../config').ENV;

const defaultConfig = {
   host: Config.DB_CONFIG.HOST,
   user: Config.DB_CONFIG.USER,
   password: Config.DB_CONFIG.PASSWORD,
   database: Config.DB_CONFIG.DB_NAME,
   port: Config.DB_CONFIG.PORT,
   multipleStatements: true,
   connectionLimit: 10
};

function initializePool(dbPoolConfiguration) {


    let dbConnectionsPool = Mysql.createPool(dbPoolConfiguration);

    return dbConnectionsPool;
}


let defaultConnection = initializePool(defaultConfig);


defaultConnection.query = Util.promisify(defaultConnection.query);
defaultConnection.getConnection = Util.promisify(defaultConnection.getConnection);

module.exports = {
    defaultConnection: defaultConnection
}









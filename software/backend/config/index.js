
const Constants  = require("./env-constants");
const localEnv = 'local';

module.exports = {
    //ENV: Constants[process.env.NODE_ENV || localEnv]
    ENV: Constants[localEnv]
}

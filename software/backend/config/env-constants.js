
module.exports =  {
    local: {
        SERVER_PORT: 3005,
        SERVER_HOST: "127.0.0.1",
        FRONT_SERVER_HOST: process.env.FRONT_SERVER_HOST,

        PROTOCOL: 'http',
        DB_CONFIG: {
            HOST: "database-2.c5y9kezazlfe.us-east-1.rds.amazonaws.com",
            USER: "admin",
            PASSWORD: "password",
            DB_NAME: "medialert",
            PORT: 3306,
            CONNECTION_LIMIT: 10,
            ACCOUNT_NAME : "mysql"
        },

        LOGGER_CONFIG: {
            redact: ['req.headers.authorization'], //for obscuring values of specific properties in recorded logs
            level: 'info',
            serializers: {
                req (req) {
                    return {
                        method: req.method,
                        url: req.url,
                        headers: req.headers,
                        hostname: req.hostname,
                        remoteAddress: req.ip,
                        remotePort: req.connection.remotePort,
                        // params: req.params,
                        // query: req.query,
                        // body: req.body
                    }
                },
                res (res) {
                    return {
                        statusCode: res.statusCode,
                        payload: res.payload,
                    }
                }
            }
        },

    },
}

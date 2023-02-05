const DbConnections = require('../db')
class User {

    constructor() {
        this.id = null
        this.name = null
        this.email = null
        this.password = null
        this.user_name = null
    }

    async addUser(body) {

        try {
            let values = [body.name, body.email, body.password];

            if (body.name == undefined ||  body.email == undefined || body.password == undefined)
                return {};

            const sql = 'INSERT INTO tb_user_info (name, email, password) VALUES (?, ?, ?)';

            await DbConnections.MySql.defaultConnection.query(sql)

            return { message: 'User added successfully' , statusCode: 200}
        } catch (e) {
            console.log("error", e)
            return { message: 'Failed' , statusCode: 401, data: e}
        }
    }

}

const user = new User();

module.exports = user;

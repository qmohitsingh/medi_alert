const DbConnections = require('../db')
class User {

    constructor() {
        this.id = null
        this.name = null
        this.email = null
        this.password = null
        this.user_name = null
    }

    async addUser(email, password, firstName, lastName) {

        try {
            let values = [firstName, email, password];

            const sql = 'INSERT INTO tb_user_info (name, email, password) VALUES (?, ?, ?)';

            await DbConnections.MySql.defaultConnection.query(sql, values)

            return { message: 'User added successfully' , statusCode: 200}
        } catch (e) {
            console.log("error", e)
            return { message: 'Failed' , statusCode: 401, data: e}
        }
    }

    async getUser(email, password) {

        try {
            let values = [email, password];

            const sql = 'SELECT email, user_id FROM tb_user_info WHERE email = ? and password = ?';

            const data = await DbConnections.MySql.defaultConnection.query(sql, values)

            return { message: 'Success' , statusCode: 200, data: data}
        } catch (e) {
            console.log("error", e)
            return { message: 'Failed' , statusCode: 401, data: e}
        }
    }

}

const user = new User();

module.exports = user;

const DbConnections = require('../db')
class Meds {

    constructor() {
        this.med_id = null
        this.med_name = null
        this.interval_time = null
        this.next_time = null
        this.vibration = null
        this.user_id = null
        this.dosage = null
    }

    async getMeds(userId) {

        try {

            const sql = `SELECT * FROM tb_medication_info where user_id = ` + userId;

            const data = await DbConnections.MySql.defaultConnection.query(sql)

            return { message: 'Success' , statusCode: 200, data: data}
        } catch (e) {

            return { message: 'Failed' , statusCode: 401, data: e}
        }
    }

    async updateMedsHistory(body) {

        try {

            if (body == undefined || body.length == undefined || body.length == 0)
                return { message: 'Success' , statusCode: 200, data: []}

            let values = [];

            body.forEach( obj => {
                values.push([obj.med_id, obj.user_id, obj.time_taken, obj.delay])
            })


            //const sql = `INSERT INTO tb_medication_history (med_id, user_id, time_taken, delay) VALUES (?, ? , ?, ?)`;
            const sql = `INSERT INTO tb_medication_history (med_id, user_id, time_taken, delay) VALUES ?`;


            const data = await DbConnections.MySql.defaultConnection.query(sql, [values])

            return { message: 'Success' , statusCode: 200, data: data}
        } catch (e) {

            return { message: 'Failed' , statusCode: 401, data: e}
        }
    }

}

const meds = new Meds();

module.exports = meds;

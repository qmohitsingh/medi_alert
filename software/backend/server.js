const express = require('express');
const app = express();

const DbConnections = require('./db');

const meds = require('./meds/meds')

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/meds/:userId', async (req, res) => {
    const userId = req.params.userId;

    console.log(userId)
    try {
        const resp = await meds.getMeds(userId);
        res.status(200).send(resp);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to retrieve meds",
            error: error.message
        });
    }
});

const start = async () => {
    //await mysql.connect();
    app.listen(3005, () => {
        console.log('App listening on port 3005!');
    });
}

start()
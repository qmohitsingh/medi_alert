const express = require('express');
const app = express();

const DbConnections = require('./db');

const meds = require('./meds/meds')
const user = require('./user/user')

app.use(express.json());

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

app.post('/user/login', async (req, res) => {

    const body = req.body;

    console.log("body: ", body, req.body)

    try {
        const resp = await user.getUser(body.email, body.password);

        res.status(200).send(resp);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to retrieve meds",
            error: error.message
        });
    }
});

app.post('/user', async (req, res) => {

    const body = req.body;

    console.log("body: ", body, req.body)

    try {
        const resp = await user.addUser(body.email, body.password, body.first_name, body.last_name);

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
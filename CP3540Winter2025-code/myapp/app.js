const express = require('express')
const mongoose = require('mongoose');
const courseRoute = require ("./routers/course.router.js");
const app = express()
const port = 3000
// With cors, may use port 5000 for backend and 3000 for front end, in future. March 13th, 2025

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use ("/api/courses", courseRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('POST message!')
})

app.get('/username', (req, res) => {
    res.send('<h1>Hello Paul!<\h1>')
})

mongoose.connect('mongodb+srv://Student00:pass6454@home00.vrq4z.mongodb.net/?retryWrites=true&w=majority&appName=home00', { dbName: 'home00' })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch(() => {
        console.log("Failed to connect to the database.");
    });
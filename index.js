'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const friendRoutes = require('./routes/friend');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));

// parsing request of content-type as application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/api/friend', friendRoutes);
app.use('/api/protected', protectedRoutes);

const DB_CONN = 'mongodb://localhost:27017/laxzdb';
mongoose.connect(DB_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        "auth": { "authSource": "admin" },
        "user": "laxzadmin",
        "pass": "laxzsecret"
    }).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log('MongoDB connection error: ', err);
    });

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
    console.log(`Server is listening on port ${PORT}`);
})
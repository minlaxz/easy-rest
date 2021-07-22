const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({origin: 'http://localhost:3000'}));


// parsing request of content-type as application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

const friendRoutes = require('./routes/friend');
app.use('/api/friend', friendRoutes);

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
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
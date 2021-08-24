import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import friendRoutes from './routes/friendRoute.js';
// import protectedRoutes from './routes/protected.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors({ origin: 'http://localhost:3000' }));

// parsing request of content-type as application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!!');
});

app.use('/friend', friendRoutes);
// app.use('/protected', protectedRoutes);
// app.use('/user', )

mongoose.connect(process.env.DB_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        "auth": { "authSource": "admin" },
        "user": "laxzadmin",
        "pass": "laxzsecret"
    }).then(() => {
        const PORT = process.env?.PORT ?? 3002;
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started at port ${PORT}`));
    }).catch((err) => console.log('MongoDB connection error: ', err));

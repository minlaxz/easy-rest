import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import glob from 'glob';
// import path from 'path';
import app from './app.js';

// Make sure it is node 10.0+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
    console.log(
        "Please go to nodejs.org and download version 10 or greater. 👌\n "
    );
    process.exit();
}

dotenv.config({ path: "./.env" });
mongoose.connect(process.env.NODE_ENV === "development" ? process.env.CLOUD_DB_CONN : process.env.CLOUD_DB_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, // https://stackoverflow.com/a/51962721/10582082
        useFindAndModify: false,
        // "auth": { "authSource": "admin" },
        // "user": "laxzadmin",
        // "pass": "laxzsecret"
    })
    .then(() => console.log("DB connected."))
    .catch((err) => console.log('MongoDB connection error: ', err));

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
    console.error(`🚫 Error → : ${err.message}`);
});

// glob.sync(path.join(__dirname, './models/*.js')).forEach((file) => {
//     require(path.resolve(file));
// });

app.set("port", process.env.PORT || 3001);
const server = app.listen(app.get("port"), () => {
    console.log(`🚀 Server is listening on port ${server.address()?.port}`);
});
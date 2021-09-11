import mongoose from 'mongoose';
import app from './app.js';
// import glob from 'glob';
// import path from 'path';

/* Make sure it is node 10.0+ */
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
    console.log(
        `Please go to nodejs.org and download version 10 or greater. 👌\n `
    );
    process.exit();
}

mongoose.connect(app.get("CONN"),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, // https://stackoverflow.com/a/51962721/10582082
        useFindAndModify: false,
        // "auth": { "authSource": "admin" },
        // "user": "laxzadmin",
        // "pass": "laxzsecret"
    })
    .then(() => console.log("DB is connected."))
    .catch((err) => console.log('MongoDB connection error: ', err));

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
    console.error(`🚫 Error → : ${err.message}`);
});

// glob.sync(path.join(__dirname, './models/*.js')).forEach((file) => {
//     require(path.resolve(file));
// });
const PORT = app.get("PORT") || 6969; /* 6969 is an error 👻 */
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${server.address().address}:${PORT}`);
});
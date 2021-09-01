import express from 'express';
import cors from 'cors';
import friendRoutes from './routes/friendRoute.js';
import path from 'path';
import * as handlers from './handlers/errorHandlers.js'
import protectedRoutes from './routes/protectedRoute.js';
import userRoutes from './routes/userRoute.js';
import notFoundRoutes from './routes/404Route.js';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './auth/passportConfig.js';

const app = express();
dotenv.config({ path: "./.env" });

app.use(cors({ origin: 'http://localhost:3000' }));

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'public/views'));

// Set view engine as EJS
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

/* Database */
const SessionStore = MongoStore.create({
    mongoUrl: process.env.CLOUD_DB_CONN,
    collectionName: "sessions"
});

// Sessions allow to Contact data on visitors from request to request
// This keeps admins logged in and allows to send flash messages
app.use(session({
    secret: process.env.JWT_SECRET,
    // key: process.env.KEY,
    resave: false,
    saveUninitialized: true, // DAMN moment when i set this to false
    store: SessionStore,
    cookie: {
        maxAge: 1000 * 10 // * 60 * 24 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// pass variables to templates + all requests
// app.use((req, res, next) => {
//     res.locals.admin = req.admin || null;
//     res.locals.currentPath = req.path;
//     next();
//   });

// promisify some callback based APIs
// app.use((req, res, next) => {
//     req.login = promisify(req.login, req);
//     next();
//   });

app.get('/', (req, res, next) => {
    if (req.session.viewCound) {
        req.session.viewCound++
    } else {
        req.session.viewCound = 1
    }
    res.status(200).json({
        success: true,
        message: `Hello World!! ${req.session.viewCound} times`,
        authenticated: `${req.isAuthenticated()}`});
});

app.use('/friend', friendRoutes);
app.use('/protected', protectedRoutes);
app.use('/user', userRoutes);
app.use('/notfound', notFoundRoutes);


// If that above routes didnt work, 404 them and forward to error handler
app.use(handlers.notFound);

// Otherwise this was a really bad unexpected error
if (app.get("env") === "development") {
    /* Development Error Handler - Prints stack trace */
    app.use(handlers.devErrors);
}

// production error handler
app.use(handlers.prodErrors);

export default app;

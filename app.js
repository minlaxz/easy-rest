import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
/* Handlers */
import { notFound, devErrors, prodErrors } from './handlers/errorHandlers.js'
/* Routes */
import protectedRoutes from './routes/protectedRoute.js';
import userRoutes from './routes/userRoute.js';
import notFoundRoutes from './routes/404Route.js';
import githubRoutes from './routes/githubRoute.js';
// import friendRoutes from './routes/friendRoute.js';
/* Sessions */
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { rateLimiter } from './middlewares/rateLimitMiddleware.js';
import { Response } from './responses/generalResponse.js';

/* Commented out for Using custom JWT strategy */
// import './auth/passportConfig.js'; /* session auth */
// import './auth/passportJwtConfig.js'; /* jwt auth */
const app = express();
// app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

/* serves up static files from the public folder. Anything in public/ will just be served up as the file it is */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

/* Takes the raw requests and turns them into usable objects */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Set 'views' directory for any views being rendered res.render() */
// app.set('view engine', 'ejs');


if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "./.env" });
    console.log("App is loaded for Production.");
    app.set("MODE", "production");
    app.set("PORT", 3001);
    app.set("CONN", process.env.CLOUD_DB_CONN);
} else {
    dotenv.config({ path: "./.env" });
    console.log("App is loaded for Development.");
    app.set("MODE", "development");
    app.set("PORT", process.env.PORT)
    app.set("CONN", process.env.CLOUD_DB_CONN);
};

/* Store Session in Database */
const SessionStore = MongoStore.create({
    mongoUrl: app.get("CONN"),
    collectionName: "sessions"
});

/* 
Sessions allow to Contact data on visitors from request to request
This keeps admins logged in and allows to send flash messages 
*/
app.use(session({
    secret: process.env.SECRET,
    // key: process.env.KEY,
    resave: false,
    saveUninitialized: true, /* DAMN moment when I set this to false */
    store: SessionStore,
    cookie: {
        secure: app.get("MODE") === "production" ? true : false,
        maxAge: 1000 * 10 // * 60 * 24 // 1 day
    }
}));

/* Commented out for Using Custom JWT strategy */
// app.use(passport.initialize());
// app.use(passport.session()); /* Session authentication */


/* pass variables to templates + all requests */
// app.use((req, res, next) => {
//     res.locals.admin = req.admin || null;
//     res.locals.currentPath = req.path;
//     next();
//   });

/* promisify some callback based APIs */
// app.use((req, res, next) => {
//     req.login = promisify(req.login, req);
//     next();
//   });

app.get('/', (req, res, next) => {
    req.session?.viewCound ? req.session.viewCound++ : req.session.viewCound = 1;
    return new Response(res, `Hello World!! ${req.session.viewCound} times`)
        .welcome();
});

// app.use('/friend', friendRoutes);
app.use('/protected', rateLimiter, protectedRoutes);
app.use('/user', rateLimiter, userRoutes);
app.use('/github', githubRoutes);
app.use('/notfound', notFoundRoutes);


/* If that above routes didnt work, 404 them and forward to error handler */
app.use(notFound);

/* Otherwise this was a really bad unexpected error */
if (process.env.NODE_ENV === "development") {
    /* Development Error Handler - Prints stack trace */
    app.use(devErrors);
}

/* production error handler or if somthing went wrong, just remove verbosity */
app.use(prodErrors);

export default app;

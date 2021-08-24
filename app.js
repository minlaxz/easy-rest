import express from 'express';
import cors from 'cors';
import friendRoutes from './routes/friendRoute.js';
import path from 'path';
import { devErrors, notFound, prodErrors } from './handlers/errorHandlers.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));


// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions allow us to Contact data on visitors from request to request
// This keeps admins logged in and allows to send flash messages
// app.use(
//     session({
//       secret: process.env.SECRET,
//       key: process.env.KEY,
//       resave: false,
//       saveUninitialized: false,
//       store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
//     })
//   );

// pass variables to our templates + all requests
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

app.get('/', (req, res) => {
    res.status(200).send('Hello World!!');
});

app.use('/friend', friendRoutes);
// app.use('/protected', protectedRoutes);
// app.use('/user', )

app.use(notFound);

if (app.get("env") === "development") {
    /* Development Error Handler - Prints stack trace */
    app.use(devErrors);
}

// production error handler
app.use(prodErrors);

export default app;

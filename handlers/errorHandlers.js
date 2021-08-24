/*
Catch Errors Handler
With async/await, you need some way to catch errors
Instead of using try{} catch(e) {} in each controller, wrap the function in
catchErrors(), catch any errors they throw, and pass it along to express middleware with next()
*/

export const catchErrors = (fn) => {
    return (req, res, next) => {
        const resp = fn(req, res, next);
        if (resp instanceof Promise) {
            return resp.catch(next);
        }
        return resp;
    }
};


export const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource could not be found."
    });
};

export const devErrors = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    err.stack = err?.statck || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            "<mark>$&</mark>"
        ),
    };
    res.status(500).json({
        success: false,
        message: "Development Server error is handled",
        errorDetails
    });
};


export const prodErrors = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({
        success: err.success || false,
        message: err.message || `Guess what, this is internal error 🥴`
    });
};
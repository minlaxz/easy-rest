// my super duper error handler
// router.use((error, req, res, next) => {
//     console.log(error.stack);
//     if (res.headersSent) {
//         return next(error);
//     }
//     res.status(error?.status || 500).send({
//         message: error?.message || 'Internal Server Error'
//     });
// });
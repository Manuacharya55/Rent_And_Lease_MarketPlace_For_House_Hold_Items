
export const GlobalError = (err, req, res, next) => {
    console.log("dude")
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : undefined
    })
}
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRouter from "./routers/Auth.router.js"
import reviewRouter from "./routers/Review.router.js"
import productRouter from "./routers/Product.router.js"
import wishlistRouter from "./routers/Wishlist.router.js"

dotenv.config()
import connectDB from "./database/connection.js"
const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())

connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log("server runnning at port")
    })
}).catch((err)=>{
    console.log(err)
    process.exit(1)
})

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/wishlist",wishlistRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})


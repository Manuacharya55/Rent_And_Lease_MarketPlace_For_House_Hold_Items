import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./database/connection.js"
const app = express()

connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log("server runnning at port")
    })
}).catch((err)=>{
    console.log(err)
    process.exit(1)
})
app.get("/",(req,res)=>{
    res.send("Hello World")
})


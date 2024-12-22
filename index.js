import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import dbConnect from "./libs/dbconnect.js"
import dotenv from "dotenv";
dotenv.config();


const app = express()
const port = process.env.PORT || 8000

dbConnect() //database connection
app.use(express.json()) // parse incoming JSON payloads from HTTP requests
// app.use(cors()) //cross origin resourse sharing
app.use(cookieParser())


app.use("/api", authRoute)

app.listen(port, () => {
  console.log("Server is listening on port")
})
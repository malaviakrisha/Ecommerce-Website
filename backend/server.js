import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import ceramicRouter from "./routes/ceramicRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import workshopRouter from "./routes/workshopRoute.js"

const app=express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/ceramic",ceramicRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user',userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/workshop",workshopRouter)


app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

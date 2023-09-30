const express = require("express");
const path=require("path")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter=require("./routes/user")
const productRouter=require("./routes/product")
const orderRouter=require("./routes/order")
const analyticsRouter=require("./routes/analytics")

const db = require("./config/db");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());


app.use("/api",userRouter);
app.use("/api",productRouter);
app.use("/api",orderRouter);
app.use("/api",analyticsRouter);



app.listen(process.env.port,()=>{
    console.log(`Express app is running on port ${process.env.port}`)
})

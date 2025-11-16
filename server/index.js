const express  = require("express");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;



app.listen (port ,()=>{
    console.log(`Server runs at port ${port}`);
})

require("./config/database.js").connect();

app.get("/",(req,res)=>{
    res.send("<h1>Job Portel</h1>")
})
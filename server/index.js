const express  = require("express");

const app = express();

require("dotenv").config();

const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

require("./config/database.js").connect();

app.use("/auth/api",require("./routes/auth.js"));
app.use("/jobSeeker/api",require("./routes/jobSeeker.js"));


app.listen (port ,()=>{
    console.log(`Server runs at port ${port}`);
})





app.get("/",(req,res)=>{
    res.send("<h1>Job Portel</h1>")
})


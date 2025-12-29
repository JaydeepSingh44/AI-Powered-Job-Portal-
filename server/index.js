const express  = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());


require("./config/database.js").connect();

app.use("/auth/api",require("./routes/auth.js"));
app.use("/jobSeeker/api",require("./routes/jobSeeker.js"));
app.use("/company/api",require("./routes/company.js"));
app.use("/job/api",require("./routes/job.js"));
app.use("/application/api", require("./routes/application.js"));
app.use("/saved/api", require("./routes/savedJobs"));
app.use("/notification/api", require("./routes/notification"));
app.use("/admin/api", require("./routes/admin.js"));








app.listen (port ,()=>{
    console.log(`Server runs at port ${port}`);
});

app.get("/",(req,res)=>{
    res.send("<h1>Job Portel</h1>")
})


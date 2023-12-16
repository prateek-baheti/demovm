const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
connectDb();
const app = express();

const PORT = process.env.PORT || 5001;

//let handle cors policy
const corsOptions ={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/teacher",require("./routes/teacherRoutes"));
app.use("/student",require("./routes/studentRoutes"));
app.use(errorHandler);

app.get("/",(req,res)=>{
    res.status(200).json({GET : "Home Page"}); 
});

app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
});


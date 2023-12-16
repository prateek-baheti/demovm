const mongoose = require("mongoose");
//Setup our DB Connection Here 
//User --> Just Add CONNECTION_STRING or Db URL in .env file if not present please create in server folder.
const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected...",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports=connectDb;
const mongoose = require("mongoose");


const connectDb = async () => {
    await mongoose.connect("mongodb+srv://rachankarkera300_db_user:qAielWkXxAKiXDlt@cluster0.8xdzojr.mongodb.net/?appName=devTinder");
}

module.exports = connectDb;
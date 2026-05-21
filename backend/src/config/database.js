if (process.env.NODE_ENV !== 'production') {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
};

const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(process.env.DB_CONNECTION);
}

module.exports = connectDb;
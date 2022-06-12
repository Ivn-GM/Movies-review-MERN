const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async() => {

    try {
        await mongoose.connect(process.env.MOVIEREVIEWS_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB is connected");
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = connectDB;

const mongoose = require("mongoose");
const CONFIG = require("../config/config");
const logger = require("../logging/logger");

function connectToDB(){
    mongoose.connect(CONFIG.MONGO_URL)

    mongoose.connection.on("connected", ()=>{
        logger.info("Mongodb connected successfully");
    })

    mongoose.connection.on("error", ()=>{
        logger.error(err);
    })
}

module.exports = connectToDB;
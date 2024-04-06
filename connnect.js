const mongoose = require("mongoose")
mongoose.set("strictQuery", true);
async function connectToMongoDB(url){
    try {
        return await mongoose.connect(url);
    } catch (error) {
        throw new  Error('Failed to connect to database', error);
    }
}

module.exports = {
    connectToMongoDB,
}
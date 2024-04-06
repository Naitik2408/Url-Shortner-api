const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    urlTitle:{
        type: String,
        required: true
    },
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required:true,
    },
    visitHistory: [{timestamp:{type: Number}}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User"
    }
},
{timestamps: true}
)



const URL = mongoose.model("urls", urlSchema);

module.exports = URL;
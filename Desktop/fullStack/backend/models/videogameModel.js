const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema;

const videogameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require:true,
            maxlength:40
        },
        description: {
            type: String,
            trim: true,
            require:true,
            maxlength:500
        },
        price: {
            type: Number,
            trim: true,
            require:true,
            maxlength:40
        },
        category: {
            type: ObjectId,
            ref: "Category",
            require:true
        },
        quantity:{
            type: Number
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Videogame",videogameSchema);
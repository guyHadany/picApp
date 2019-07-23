const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureSchema = new Schema(
    {
        name: String,
        smallUrl: String,
        largeUrl: String,
        apiId: String,
        likes: Number,
        webURL: String,
        photographer: String,
        project: String,
        isSaved: Boolean
    }
)

const Picture = mongoose.model("Photo", PictureSchema)
module.exports = Picture

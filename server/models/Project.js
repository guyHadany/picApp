const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema(
    {
        name: String,
        pictures: [{type: Schema.Types.ObjectId, ref: 'Picture'}]
    }
)

const Project = mongoose.model("Project", ProjectSchema)
module.exports = Project

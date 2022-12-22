import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    md5: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

})

fileSchema.virtual('myFiles', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
})

const FileModel = mongoose.model('files', fileSchema)

export default FileModel
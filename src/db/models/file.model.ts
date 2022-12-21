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
    md5: { String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

})

const FileModel = mongoose.model('images', fileSchema)

export default FileModel
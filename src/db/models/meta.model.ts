import mongoose from "mongoose";


const metaSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    keyphrase: [String],
    link: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const MetaModel = mongoose.model('metas', metaSchema)

export default MetaModel
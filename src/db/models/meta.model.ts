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
    keyphrase: [String]
})

const MetaModel = mongoose.model('meta',metaSchema)

export default MetaModel
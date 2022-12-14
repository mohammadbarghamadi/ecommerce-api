import mongoose from "mongoose";


const metaSchema = new mongoose.Schema({
    keyphrase: {
        type: Array
    },
    description: {
        type: String
    }
})

const MetaModel = mongoose.model('meta',metaSchema)

export default MetaModel
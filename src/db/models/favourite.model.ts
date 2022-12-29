import mongoose, { Types, Document, Model } from "mongoose";


interface FavoriteSchemaInt extends Document {
    userId: Types.ObjectId
    list: {
        prodId: Types.ObjectId
    }[]
}

const favoSchema = new mongoose.Schema<FavoriteSchemaInt>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    list: [{
        prodId: {
            type: Types.ObjectId,
            ref: 'products',
            required: true
        }
    }]

})

const FavoModel = mongoose.model('favourites', favoSchema)

export default FavoModel
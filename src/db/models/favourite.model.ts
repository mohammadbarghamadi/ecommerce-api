import mongoose from "mongoose";


const favSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    list: [{
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        title: {
            type: String    
        }
    }]

})

const FavModel = mongoose.model('favourites',favSchema)

export default FavModel
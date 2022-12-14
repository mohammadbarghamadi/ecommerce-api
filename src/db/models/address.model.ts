import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    provience: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
})

const AddressModel = mongoose.model('addresses',addressSchema)

export default AddressModel
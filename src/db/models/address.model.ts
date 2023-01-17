import mongoose from "mongoose";

// countires
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
})

// provinces and states
const provStateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    }
})

// cities
const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provstates'
    }
})

// addresses
const addressSchema = new mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries',
        required: true
    },
    provState: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provstates',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'cities',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

export const CountryModel = mongoose.model('countries', countrySchema)
export const ProvStateModel = mongoose.model('provstates', provStateSchema)
export const CityModel = mongoose.model('cities', citySchema)

const AddressModel = mongoose.model('addresses', addressSchema)

export default AddressModel
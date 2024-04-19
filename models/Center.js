const mongoose = require('mongoose')
const Joi = require('joi')

// Center Schema
const CenterSchema = new mongoose.Schema({
    governorate: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100, 
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100, 
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100, 
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10, 
    }

})

// Center Schema
const Center = mongoose.model("Center", CenterSchema)

// validate create Center 
function validateCreateCenter(obj){
    const schema = Joi.object({
        governorate: Joi.string().trim().min(2).max(100).required(),
        name: Joi.string().trim().min(2).max(100).required(),
        address: Joi.string().trim().min(2).max(100).required(),
        phoneNumber: Joi.string().trim().min(10).max(10).required()
    })
    return  schema.validate(obj)
}

// Update validate Update Center 
function validateUpdateCenter(obj){
    const schema = Joi.object({
        governorate: Joi.string().trim().min(2).max(100),
        name: Joi.string().trim().min(2).max(100),
        address: Joi.string().trim().min(2).max(100),
        phoneNumber: Joi.string().trim().min(10).max(10)
    })
    return  schema.validate(obj)
}

module.exports = {
    Center,
    validateCreateCenter,
    validateUpdateCenter
}
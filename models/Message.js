const Joi = require("joi")
const mongoose = require("mongoose")

// Message Schema 
const MessageSchema = new mongoose.Schema({
    UserMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    }
},{
    timestamps: true
})

const Message = mongoose.model("Message", MessageSchema)

// Validate Create Message
function validateCreateMessage(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        content: Joi.string().trim().required()
    });
    return schema.validate(obj);
}


// Validate Update Message
function validateUpdateMessage(obj) {
    const schema = Joi.object({
        title: Joi.string().trim(),
        content: Joi.string().trim()
    });
    return schema.validate(obj);
}

module.exports = {
    Message,
    validateCreateMessage,
    validateUpdateMessage
}
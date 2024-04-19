const asyncHandler = require("express-async-handler")
const { Message, validateCreateMessage, validateUpdateMessage } = require("../models/Message")
const { User } = require("../models/User")

/**-----------------------------------------------
 * @desc    Create Message`s User
 * @route   /api/Message/send
 * @method  POST
 * @access  public 
 ------------------------------------------------*/
 module.exports.createMessageCtrl = asyncHandler(async (req, res) => {
    // validation
    const {error} = validateCreateMessage(req.body)
    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    let user = await User.findById(req.user.id)
    
    // Create Message
    const message = await Message.create({
        UserMessage: req.user.id,
        title: req.body.title,
        content: req.body.content,
        phoneNumber: user.phoneNumber,
        username: user.username
    })
    
    // Response to the client
    res.status(201).json({message: "Send Message Successfully", message})
 })

 
/**-----------------------------------------------
 * @desc    Get Message`s User
 * @route   /api/Message/:id
 * @method  GET
 * @access  public 
 ------------------------------------------------*/
 module.exports.getMessageCtrl = asyncHandler(async (req, res) => {
    
    let messages = await Message.find({UserMessage: req.params.id})
    const documentCount = await Message.documentCount({UserMessage: req.params.id})

    // Response to the client
    res.status(201).json( {messages, documentCount, totalCount: messages.length} )
 })

 /**-----------------------------------------------
 * @desc    Delete Message by Message Id
 * @route   /api/Message/:id
 * @method  GET
 * @access  public 
 ------------------------------------------------*/
 module.exports.deleteMessageCtrl = asyncHandler(async (req, res) => {
    
    let messages = await Message.findById(req.params.id)
    if(messages){
        await Message.findByIdAndDelete(req.params.id)
        
        res.status(200).json({ message: "Message has been deleted" });

    }else{
        res.status(404).json({ message: "Message not found" });
    }
 })


 /**-----------------------------------------------
 * @desc    Get Message By Id
 * @route   /api/Message/:id
 * @method  GET
 * @access  public 
 ------------------------------------------------*/
 module.exports.GetMessageIdCtrl = asyncHandler(async (req, res) => {
    
    let message = await Message.findById(req.params.id)
    if(!message){
        return res.status(404).json({ message: "message not found" });

    }
    // Response to the client
    res.status(201).json( message )
 })

  /**-----------------------------------------------
 * @desc    update Message By Id
 * @route   /api/Message/:id
 * @method  UPDATE
 * @access  public 
 ------------------------------------------------*/
 module.exports.UpdateMessageIdCtrl = asyncHandler(async (req, res) => {
    
    // validation
    const {error} = validateUpdateMessage(req.body)
    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // checl if the message exsist
    const message = await Message.findById(req.params.id)
    if(!message){
        return res.status(404).json({message: "Message Not Found"})
    }

    // Update Message
    const updateMessage = await Message.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                content: req.body.content,
            }
        },
        {new: true}
    )

    // response to the client
    res.status(200).json(updateMessage)
 })

  /**-----------------------------------------------
 * @desc    Get All Message 
 * @route   /api/Message
 * @method  GET
 * @access  public 
 ------------------------------------------------*/
 module.exports.GetMessageCtrl = asyncHandler(async (req, res) => {
    let message, documentCount;
    const { page, perPage } = req.query;

    if(page&&perPage){
        message = await Message.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
        documentCount = await Message.countDocuments()

    }else{
        message = await Message.find()
        documentCount = await Message.countDocuments()
    }

    // Response to the client
    res.status(201).json({ message, documentCount, totalCount: message.length})
 })

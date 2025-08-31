import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
    try {
        const { id : receiverId } = req.params //receiver id
        const senderId = req.user._id//from protect route middleware
        const { message } = req.body //content of the message from POST request

        console.log(receiverId,senderId,message)

        //find if already any conversation going on
        let conversation = await Conversation.findOne({
            participants : {$all:[senderId,receiverId]}
        })

        //if no conversation found create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants : [senderId,receiverId]
            })    
        }

        //create the message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        //then push this message to the conversation
        if (newMessage) {
        conversation.messages.push(newMessage._id);            
        }

        //await newMessage.save()//to save the message to db
        //await conversation.save()//to save conversation to db
        //Parallel processign
        await Promise.all([newMessage.save(), conversation.save()])//so it will call 
        //two methods in parallel

        res.status(201).json(newMessage)
        

    } catch (error) {
        console.log('Error in message controller', error)
        res.status(500).json({message:'Internal server error'})
    }
}
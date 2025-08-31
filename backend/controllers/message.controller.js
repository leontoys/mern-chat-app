export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params //receiver id
        const senderId = req.user._id//from protect route middleware
        const { message } = req.body //content of the message from POST request
        
        
    } catch (error) {
        
    }
}
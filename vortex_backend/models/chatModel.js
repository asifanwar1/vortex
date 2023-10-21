import mongoose from 'mongoose'

const chat = new mongoose.Schema({
    userRef: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: { 
        type : String,
        required: true
    },    
    questionNum: { 
        type : Number,
        required: true
    },    
    id: { 
        type : String,
        required: true
    },    
    parentMessageId: { 
        type : String,
        required: true
    },    
    conversationId: { 
        type : String,
        required: true
    }, 
    text: { 
        type : String,
        required: true
    },   
    
})


const Chat = mongoose.model('CHAT', chat);

// module.exports = AddTask;
export default Chat;



import axios from "axios";


const newText = async (userText, token) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('/sendText', {userText}, config)
    return response.data;
}



const textWithParentId = async (msgData, token) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('/sendTextWithParentId', msgData, config)
    return response.data;
}



const getAllChats = async (token) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get('/getAllChats', config);
    return response.data;
}


const deleteChat = async (chatId, token) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('/deleteChat', {chatId}, config)
    return response.data
}


const chatService = {
    newText,
    textWithParentId,
    getAllChats,
    deleteChat,
}
  
export default chatService
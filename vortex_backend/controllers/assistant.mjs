import { Router } from 'express';
const router = Router();
import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import Chat from '../models/chatModel.js';
import userAuth from '../middlewares/authMiddleware.js';


router.post('/sendText', userAuth, async(req, res, next)=>{
  const {userText} = req.body;

  try {
    
    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: process.env.OPENAI_ACCESS_TOKEN,
      apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
    })
      
    const resp = await api.sendMessage(userText)
  
      
    const data = new Chat({  
      userRef: req.user._id,
      question: userText,
      questionNum: 1,
      id: resp.id,
      parentMessageId: resp.parentMessageId,
      conversationId: resp.conversationId,
      text: resp.text,
    });
  
    await data.save();
  
  
    res.status(201).send(data);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.get('/getAllChats', userAuth, async(req, res, next)=>{
  try {
    const findChats = await Chat.find({userRef: req.user._id});
    
    if(findChats){
      const uniqueChatsArray = [];
      const seenNames = {};
      
      findChats.forEach(obj => {
        if (!seenNames[obj.conversationId]) {
          uniqueChatsArray.push(obj);
          seenNames[obj.conversationId] = true;
        }
      });
  
  
      res.status(201).send(uniqueChatsArray);
    }
    else{
      res.status(201).send([]);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

});




router.post('/sendConversationId', async(req, res, next)=>{
  const {conversationId} = req.body;
  try {
    const findChat = await Chat.find({conversationId: conversationId});
  
    if(findChat){
      res.status(201).send(findChat);
    }
    else{
      res.status(400)
      throw new Error('Chat not found.')
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});





router.post('/sendTextWithParentId', userAuth, async(req, res, next)=>{
  const {userText, selectedChat} = req.body;

  let parentMsgId = selectedChat[selectedChat.length - 1].parentMessageId;
  let lastQuestionNum = selectedChat[selectedChat.length - 1].questionNum;
  let conversationMsgId = selectedChat[0].conversationId;
  
  try {
    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: process.env.OPENAI_ACCESS_TOKEN,
      apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
    })
  
    const resp = await api.sendMessage(userText, {
      conversationId: conversationMsgId,
      parentMessageId: parentMsgId
    })
  
    const data = new Chat({  
      userRef: req.user._id,
      question: userText,
      questionNum: lastQuestionNum + 1,
      id: resp.id,
      parentMessageId: resp.parentMessageId,
      conversationId: resp.conversationId,
      text: resp.text,
    });
  
    await data.save();
  
    res.status(201).send(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

});




router.post('/deleteChat', userAuth, async(req, res, next)=>{
  const { chatId } = req.body;
  try {
    const deleteSelectedChat = await Chat.deleteMany({conversationId: chatId});
  
    res.status(201).send({message: 'Chat deleted'});
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});




export default router;

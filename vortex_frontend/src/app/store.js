import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chats/chatSlice'
import selectedChatReducer  from '../features/selectedChats/selectedChatSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats : chatReducer,
    selectedChat: selectedChatReducer,
  },
})

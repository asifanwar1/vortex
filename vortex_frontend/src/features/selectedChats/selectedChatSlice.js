// selectedChatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedChatSlice = createSlice({
  name: 'selectedChat',
  initialState: [], 
  reducers: {
    setSelectedChat: (state, action) => {
      return action.payload;
    },
    addToSelectedChat: (state, action) => {
      return [...state, action.payload];
    },
    resetSelectedChat: () => [],
  },
});

export const { setSelectedChat, addToSelectedChat, resetSelectedChat } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;

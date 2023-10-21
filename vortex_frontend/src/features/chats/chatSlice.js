import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
    chats: [], 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


export const newText = createAsyncThunk(
    'chats/newText',
    async (userText, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        console.log(token)
        return await chatService.newText(userText, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)



export const textWithParentId = createAsyncThunk(
    'chats/textWithParentId',
    async (msgData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.textWithParentId(msgData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)



export const getAllChats = createAsyncThunk(
    'chats/getAllChats',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.getAllChats(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)


export const deleteChat = createAsyncThunk(
    'chats/deleteChat',
    async (chatId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.deleteChat(chatId, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

 

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(newText.pending, (state) => {
          state.isLoading = true
        })
        .addCase(newText.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chats.push(action.payload)
        })
        .addCase(newText.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(textWithParentId.pending, (state) => {
          state.isLoading = true
        })
        .addCase(textWithParentId.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chats.push(action.payload)
        })
        .addCase(textWithParentId.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getAllChats.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllChats.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chats = action.payload
        })
        .addCase(getAllChats.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteChat.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteChat.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chats = state.chats.filter(
            (chat) => chat._id !== action.payload.id
          )
        })
        .addCase(deleteChat.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})


export const { reset } = chatSlice.actions
export default chatSlice.reducer
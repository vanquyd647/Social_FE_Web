import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from '../../utils/apiClient';

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ roomId, messageData }, { rejectWithValue }) => {
        try {
            const response = await messageApi.sendMessage(roomId, messageData);
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMessagesInRoom = createAsyncThunk(
    'messages/getMessagesInRoom',
    async (roomId, { rejectWithValue }) => {
        try {
            const response = await messageApi.getMessagesInRoom(roomId);
            return response.data.messages;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    messages: [],
    loadingFetch: false,
    loadingSend: false,
    error: null,
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        receiveMessage: (state, action) => {
            state.messages.push(action.payload); // Add new message to the state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loadingSend = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loadingSend = false;
                state.messages.push(action.payload);
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loadingSend = false;
                state.error = action.payload;
            })
            .addCase(getMessagesInRoom.pending, (state) => {
                state.loadingFetch = true;
            })
            .addCase(getMessagesInRoom.fulfilled, (state, action) => {
                state.loadingFetch = false;
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(getMessagesInRoom.rejected, (state, action) => {
                state.loadingFetch = false;
                state.error = action.payload;
            });
    },
});

export const { receiveMessage } = messageSlice.actions;
export default messageSlice.reducer;

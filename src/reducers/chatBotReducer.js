import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chat: {
        conversation: []
    },
    isFirstChatOpen: true,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateChat: (state, action) => {
            state.chat.conversation = [...state.chat.conversation, action.payload];
        },
        setFirstChatOpen: (state, action) => {
            state.isFirstChatOpen = action.payload;
        },
    },
});

export const { updateChat, setFirstChatOpen } = chatSlice.actions;
export default chatSlice.reducer;
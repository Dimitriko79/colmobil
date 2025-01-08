import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chat: {
        conversation: [],
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
        updateLastChatValue: (state, action) => {
            const conversation = state.chat.conversation;
            if (conversation.length > 0) {
                const lastMessage = conversation[conversation.length - 1];
                if (lastMessage.type === 'bot') {
                    state.chat.conversation = [
                        ...conversation.slice(0, -1),
                        action.payload
                    ];
                }
            }
        },
        setFirstChatOpen: (state, action) => {
            state.isFirstChatOpen = action.payload;
        },
    },
});

export const { updateChat, updateLastChatValue, setFirstChatOpen } = chatSlice.actions;
export default chatSlice.reducer;
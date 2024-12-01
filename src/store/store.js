import { configureStore } from '@reduxjs/toolkit';
import chatBotReducer from "../reducers/chatBotReducer.js";

const store = configureStore({
    reducer: {
        chat: chatBotReducer
    },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import chatBotReducer from "../reducers/chatBotReducer.js";
import userReducer from "../reducers/userReducer.js";

const store = configureStore({
    reducer: {
        chat: chatBotReducer,
        user: userReducer,
    },
});

export default store;
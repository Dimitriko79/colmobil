import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
// import Cookies from "js-cookie";

// let sessionId = Cookies.get("sessionId");

// if (!sessionId) {
//     sessionId = uuidv4();
//     Cookies.set("sessionId", sessionId, {
//         expires: 1 / 24
//     });
// }

const initialState = {
    user: {
        username: "Current User",
        user_id: uuidv4()
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = { ...action.payload };
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
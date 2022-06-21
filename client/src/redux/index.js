import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import userSlice from "./userSlice";

import registerSlice from "./registerSlice";

const store = configureStore({
    reducer:{
        register : registerSlice.reducer,
        login : loginSlice.reducer,
        user  : userSlice.reducer
    }
})

export default store
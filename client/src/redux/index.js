import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

import registerSlice from "./registerSlice";

const store = configureStore({
    reducer:{
        register : registerSlice.reducer,
        login : loginSlice.reducer
    }
})

export default store
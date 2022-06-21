import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{user:null},
    reducers:{
        setUser(state,data){
            state.user = data
        }
    }
})

export const userActions = userSlice.actions
export default userSlice
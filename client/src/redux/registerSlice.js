import {createSlice} from '@reduxjs/toolkit'


 const registerSlice = createSlice({
    name:'register',
    initialState:{
        isRegistered : false
    },
    reducers:{
        register(state) {
            state.isRegistered = true
        }
    }
})

export const registerActions = registerSlice.actions
export default registerSlice
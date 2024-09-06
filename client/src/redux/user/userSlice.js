import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

   
    sigInstart : (state)=>{
        state.loading = true
        state.error = null
    },
    sigInSuccess : (state,action)=>{
        state.currentUser = action.payload,
        state.loading = false,
        state.error= null
    },
    sigInFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    }
}
})
export const  {sigInstart,sigInSuccess,sigInFailure} = userSlice.actions;

export default userSlice.reducer;
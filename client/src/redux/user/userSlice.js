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
    },
    updateInStart : (state)=>{
        state.loading = true
    },
    updateInSuccess:(state,action)=>{
        state.loading = false,
        state.error = null,
        state.currentUser = action.payload
    },
    updateInFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    },
    deleteUserStart:(state)=>{
        state.loading = true;
    },
    deleteUserfaliure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    },
    deleteUserSuccess:(state)=>{
        state.loading = false,
        state.error = null,
        state.currentUser = null
    }
}
})
export const  {sigInstart,sigInSuccess,sigInFailure,updateInFailure,updateInStart,updateInSuccess,deleteUserStart,deleteUserSuccess,deleteUserfaliure} = userSlice.actions;

export default userSlice.reducer;
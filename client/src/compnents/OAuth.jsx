import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import app from '../../firebase';
import { useDispatch } from 'react-redux';
import {sigInFailure,sigInSuccess,sigInstart} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        dispatch(sigInstart());
        try {
            const provider = new GoogleAuthProvider(app);
            const auth = getAuth();
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json();
            if(data.success == false){
                dispatch(sigInFailure(data.message))
                return
              } 
              if(res.ok){
                dispatch(sigInSuccess(data));
                navigate('/');
              }
            
            
            
        } catch (error) {
            console.log('Error',error);
            dispatch(sigInFailure(error.message))
            
         
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='p-3 rounded-lg text-white px-2 py-3 bg-red-600 uppercase hover:opacity-95 disabled:opacity-75' >
        Continue With Google
    </button>
  )
}

export default OAuth


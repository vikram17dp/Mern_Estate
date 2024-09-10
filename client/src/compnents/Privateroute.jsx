import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function Privateroute() {
    const {currentUser} = useSelector(state =>state.user);
    // console.log('Current User:', currentUser);
  return currentUser ? <Outlet/> : <Navigate to='/signin'/>

}

export default Privateroute

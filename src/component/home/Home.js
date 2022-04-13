import React, { useContext } from 'react'
import { UserContext } from '../../context/ContextAuth'
import WithAuth from '../WithAuth'

function Home() {
    const {userInfo,setUserInfo}=useContext(UserContext)
  return (
    <div>
        <button onClick={()=>setUserInfo('')}>Logout</button>
        <p>Wellcome {userInfo}</p>
    </div>
  )
}
export default WithAuth(Home)
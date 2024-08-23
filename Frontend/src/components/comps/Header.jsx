import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

const Header = () => {
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate();
    const HandleLogout = ()=>{
        localStorage.removeItem("UserId")
        setAuthUser(null)
        navigate("/login")
    }
  return (
    <>
    <div className='h-12 w-full bg-gray-400 flex items-center justify-between'>
        <h1 className='text-4xl font-bold mx-3'>
            Aura
        </h1>
        <RiLogoutCircleLine className='text-4xl mx-3 hover:cursor-pointer'onClick={HandleLogout}/>
    </div>
    </>
  )
}

export default Header

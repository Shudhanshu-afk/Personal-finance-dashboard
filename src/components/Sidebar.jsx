import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.svg'
import { NavLink } from 'react-router-dom'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { getName } from '../Database/Db'
import { useAuthState } from 'react-firebase-hooks/auth'
const Sidebar = () => {
  const [user,loading,error]= useAuthState(auth);
  const [name,setname ]= useState('Name');
  useEffect(()=>{
    if (user) {
      
      getName(user.uid,setname);
      
    }
    
  },[loading]);
  
  const logout = async () => {
  
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-black text-white border rounded-xl h-full">
        <div className='flex flex-col justify-center items-center w-full text-4xl gap-9 p-5'>
          <h1>Finance</h1>
          <div className='border rounded-full border-black h-20 w-20'>
            <img src={profile} alt="" />
          </div>
          <h1>{name} </h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full gap-2 p-5'>
          <NavLink className={({ isActive, isPending }) =>
            [
              isPending ? " " : "",
              isActive ? "w-3/4 h-12 rounded-lg bg-white text-black flex justify-center items-center" : "w-3/4 h-12 rounded-lg text-white border flex justify-center items-center",

            ].join(" ")
          } to={'/transactions'}>
            Transactions
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
            [
              isPending ? " " : "",
              isActive ? "w-3/4 h-12 rounded-lg bg-white text-black flex justify-center items-center" : "w-3/4 h-12 rounded-lg text-white border flex justify-center items-center",

            ].join(" ")
          } to={'/accounts'}>
            Accounts
          </NavLink>
          
          
          
          <NavLink className={({ isActive, isPending }) =>
            [
              isPending ? " " : "",
              isActive ? "w-3/4 h-12 rounded-lg bg-white text-black flex justify-center items-center" : "w-3/4 h-12 rounded-lg text-white border flex justify-center items-center",

            ].join(" ")
          } to={'/income'}>
            Income
          </NavLink>
          <NavLink className={({ isActive, isPending }) =>
            [
              isPending ? " " : "",
              isActive ? "w-3/4 h-12 rounded-lg bg-white text-black flex justify-center items-center" : "w-3/4 h-12 rounded-lg text-white border flex justify-center items-center",

            ].join(" ")
          } to={'/overview'}>
            Overview
          </NavLink>
          
          



          <button onClick={()=>{logout();
            navigate('/');
          }} className='border  w-3/4 h-12 rounded-lg mt-12 hover:bg-slate-600 active:bg-white active:text-white'>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Sidebar

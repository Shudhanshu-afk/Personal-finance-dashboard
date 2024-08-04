import React, { useContext } from 'react'
import { useState } from 'react';
import { auth,db } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setDoc,doc } from 'firebase/firestore';
import { BankContext } from '../contexts/Bankcontext';
import unhide from '../assets/unhide.svg'
import hide from '../assets/hide.svg'


const Login = () => {
    const [user, setuser] = useState({ email: "", password: ""});
    const navigate = useNavigate();
    
    const [show,setshow]= useState(false);

  const handlechange = (evt) => {
    setuser((curruser) => {
      curruser[evt.target.name] = evt.target.value;
      return { ...curruser }
    })
  }
  const save = async (evt) => {
    evt.preventDefault();
    try {
      const authuser = await signInWithEmailAndPassword(auth, user.email,user.password);
      const account = authuser.user;
      
      await setDoc(doc(db, "users", account.uid), {
        lastLogin: new Date()
      }, { merge: true });
      setuser({ email: "", password: "" });
      
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    }
    
    
  };
  return (
    <div className='Container flex bg-black h-screen w-screen justify-center items-center '>
      
    <div className='flex flex-col items-center justify-center bg-white min-h-fit h-fit w-2/5 rounded-lg gap-6 p-7 '>
    

     <h1 className='text-3xl font-extrabold'>Login</h1>

      
      <form className='Signup text-lg  flex flex-col bg-white h-fit w-1/2 gap-7 ' action="">
        
        <input className='w-full  p-2 outline-none text-lg h-8 border-b' placeholder='Email' onChange={handlechange} type="email" id='email' name='email' value={user.email} />
        
        <div className='flex border-b'>
        <input className='w-full  p-2 h-8 outline-none' placeholder='Password'  onChange={handlechange} type={show? 'text':'password'} id='password' name='password' value={user.password} />
        {user.password && (show?<img className='hover:bg-slate-200 active:bg-slate-600 p-1 rounded-full' onClick={()=>(setshow(!show))} src={unhide} alt="" />:<img className='hover:bg-slate-200 active:bg-slate-600 p-1 rounded-full' onClick={()=>(setshow(!show))} src={hide} alt="" />)}
        </div>
        
         
        <div className='flex justify-center'>
     
      <button className='bg-black w-full text-white p-2 rounded-lg' onClick={save}>Login</button>
      
        </div>
      </form>
     
    </div>
  </div>
  )
}

export default Login

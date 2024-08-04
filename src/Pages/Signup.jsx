import React, { useState,useContext } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth,db } from '../Firebase';
import { Link, useNavigate,Navigate} from 'react-router-dom';
import { setDoc,doc } from 'firebase/firestore';
import { BankContext } from '../contexts/Bankcontext';
import unhide from '../assets/unhide.svg'
import hide from '../assets/hide.svg'


const Signup = () => {

  const [user, setuser] = useState({ email: "", password: "", name: "" });
  const {setuseruid} = useContext(BankContext);
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

      const authUser= await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log('User created successfully');
      const users = authUser.user;
      setuseruid(users.uid);
      await setDoc(doc(db, "users", users.uid), {
        email: users.email,
        createdAt: new Date(),
        name: user.name
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setuser({ email: "", password: "" });
  };


  const navigate = useNavigate();


  const googlesignin = async (evt)=>{
    evt.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      
      const result = await signInWithPopup(auth, provider);
      const account = result.user;
      await setDoc(doc(db, "users", account.uid), {
        email: account.email,
        createdAt: new Date(),
        name:account.displayName
      });
      navigate('/transactions');
    } catch (error) {
      console.log(error);
    }

    
    
    
  }


  return (
    <div className='Container flex bg-black h-screen w-screen justify-center items-center '>

      <div className='flex flex-col items-center justify-center bg-white min-h-fit h-fit w-2/5 rounded-lg gap-6 p-7'>


        <h1 className='text-3xl font-extrabold'>Create Account</h1>

        <button onClick={googlesignin} className='flex gap-2 border p-2'><img src="	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="" />Signup with Google  </button>
        -OR-
        <form className='Signup text-lg  flex flex-col bg-white h-fit w-1/2 gap-7 ' action="">

          <input className='w-full  p-2 outline-none h-8 border-b' onChange={handlechange} type="text" placeholder='Name' id='name' name='name' value={user.name} />
          <input className='w-full  p-2 outline-none text-lg h-8 border-b' placeholder='Email' onChange={handlechange} type="email" id='email' name='email' value={user.email} />

            <div className='flex border-b'>

          <input className='w-full  p-2 h-8 outline-none ' placeholder='Password' onChange={handlechange} type={show? 'text':'password'} id='password' name='password' value={user.password} />
           
            {user.password&&(show?<img className='hover:bg-slate-200 active:bg-slate-600 p-1 rounded-full' onClick={()=>(setshow(!show))} src={unhide} alt="" />:<img className='hover:bg-slate-200 active:bg-slate-600 p-1 rounded-full' onClick={()=>(setshow(!show))} src={hide} alt="" />)}
            </div>


          <div className='flex justify-center'>

            <button className='bg-black w-full text-white p-2 rounded-lg' onClick={save}>Signup</button>

          </div>
        </form>
        <div className='w-1/2 flex '>
          <p>Already have an account ?</p>
          <Link to={"/login"}>Login</Link>


        </div>
      </div>
    </div>
  )
}

export default Signup

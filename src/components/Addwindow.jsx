import React from 'react'
import { createAccount, getAccountdata, updateAccountdata, deleteaccount } from '../Database/Db';
import { useState } from 'react';
import cross from '../assets/cross.svg'


const Addwindow = ({isvisible}) => {
    const [addedbank, setaddedbank] = useState({ bankname: "", balance: 0 });


    const save = (evt) => {
        evt.preventDefault();
        createAccount(user.uid, { ...addedbank });

        setaddedbank({ bankname: "", balance: 0 });
        setisvisible(!isvisible);


    }

    const handlechange = (evt) => {
        setaddedbank((currdata) => {
            currdata[evt.target.name] = evt.target.value;
            return { ...currdata };
        })
    }

  return (
    <div><div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
    <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
        <div className='p-4 border-b text-2xl flex justify-between'><h1>Add Bank Account</h1><div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
            <img className='p-2  rounded-full invert' src={cross} onClick={() => (seteditwindow(!editwindow))} alt="" /></div></div>
        <div className='p-6 flex flex-col items-center gap-12'>
            <div>
                <label htmlFor="bankname">Bank Name:   </label>
                <input className='bg-black outline-none ' type="text" id='bankname' name='bankname' placeholder='Enter Bank Name' value={input.bankname} onChange={handlechange} />


                <label htmlFor="balance">Amount:   </label>
                <input className='bg-black outline-none ' type="Number" id='balance' name='balance' placeholder='Enter Balance' value={input.balance} onChange={handlechange} />

            </div>
            <div>
                <button className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' onClick={(evt) => (updateAccountdata(user.uid, i.id, input))}>Save</button>
            </div>


        </div>
    </div>
</div>
    </div>
  )
}

export default Addwindow

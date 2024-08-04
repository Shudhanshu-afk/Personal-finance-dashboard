import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { BankContext } from '../contexts/Bankcontext';
import { createAccount, getAccountdata, updateAccountdata, deleteaccount } from '../Database/Db';
import cross from '../assets/cross.svg'
import edit from '../assets/edit.svg'
import del from '../assets/delete.svg'
import tick from '../assets/tick.svg'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
const Accounts = () => {
    const [addedbank, setaddedbank] = useState({ bankname: "", balance: 0 });
    const { Bank, setBank, symbol } = useContext(BankContext);
    const [isvisible, setisvisible] = useState(false);
    const [editwindow, seteditwindow] = useState(false);
    const [input, setinput] = useState({ bankname: '', balance: 0 });
    const [user, loading, error] = useAuthState(auth);


    const floating = (evt) => {
        evt.preventDefault();
        setisvisible(!isvisible);
    }
    const handlechange = (evt) => {
        setaddedbank((currdata) => {
            currdata[evt.target.name] = evt.target.value;
            return { ...currdata };
        })
    }
    const editchange = (evt) => {
        setinput((currdata) => {
            currdata[evt.target.name] = evt.target.value;
            return { ...currdata };
        })
    }
    const save = (evt) => {
        evt.preventDefault();
        createAccount(user.uid, { ...addedbank });

        setaddedbank({ bankname: "", balance: 0 });
        setisvisible(!isvisible);


    }
    useEffect(() => {
        if (user) {

            getAccountdata(user.uid, setBank);
        }


    }, [loading])

    if (loading) {
        return <div>...loading</div>
    }

    return (
        <div className='bg-black h-screen flex'>
            <div className='bg-white flex m-2 rounded-xl    w-full'>
                <div className='w-1/5 m-2 '>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-4/5 bg-black my-2 mr-2 rounded-xl text-white  p-4'>
                    <div className="Accounts border w-full rounded-xl">
                        <div className=' border-b flex justify-between '> <h1 className='text-white p-6 text-4xl'>Bank Accounts</h1>
                            <button className='mr-10 mt-5 mb-5 px-4 py-1 rounded-lg border hover:bg-slate-600 active:bg-white active:text-white' onClick={floating}>Add</button>

                        </div>

                        <div className='p-7'>
                            {Bank ? (Bank.length > 0 ?
                                <table className='w-full '>
                                    <thead className=''>
                                        <tr className='p-7 border-b h-12 text-xl'><th>Bank Name</th> <th>Balance</th> <th>Actions</th></tr>
                                    </thead>
                                    <tbody className=''>

                                        {Bank ? Bank.map((i) => (<tr key={i.id} className='text-center h-10'><td>{i.bankname}</td> <td className='text-green-600'>{symbol}{i.balance}</td> <td>
                                            <div className='w-full flex justify-center gap-5'>

                                                {editwindow ? <><div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                                                    <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
                                                        <div className='p-4 border-b text-2xl flex justify-between'><h1>Edit account details</h1><div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                                                            <img className='p-2  rounded-full invert' src={cross} onClick={() => (seteditwindow(!editwindow))} alt="" /></div></div>
                                                        <div className='p-6 flex flex-col items-center gap-12'>
                                                            <div>
                                                                <label htmlFor="bankname">Bank Name:   </label>
                                                                <input className='bg-black outline-none ' type="text" id='bankname' name='bankname' placeholder='Enter Bank Name' value={input.bankname} onChange={(e)=>{setinput((curr)=>{curr[e.target.name] = e.target.value; return {...curr} })}} />


                                                                <label htmlFor="balance">Amount:   </label>
                                                                <input className='bg-black outline-none ' type="Number" id='balance' name='balance' placeholder='Enter Balance' value={input.balance} onChange={(e)=>{setinput((curr)=>{curr[e.target.name] = e.target.value; return {...curr} })}} />

                                                            </div>
                                                            <div>
                                                                <button className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' onClick={(evt) => {updateAccountdata(user.uid, i.id, input); seteditwindow(!editwindow)}}>Save</button>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div></> : <img onClick={() => {
                                                    seteditwindow(!editwindow);
                                                    setinput((currdata) => {
                                                        currdata['bankname'] = i.bankname;
                                                        currdata['balance'] = i.balance;
                                                        return { ...currdata };
                                                    });
                                                }} className='invert' src={edit} alt="" />}
                                                <img onClick={() => { deleteaccount(user.uid, i.id); }} className='invert' src={del} alt="" />
                                            </div>
                                        </td></tr>)) : ''}
                                    </tbody>
                                </table> :
                                <div className='text-center'>
                                    {/* updateAccountdata(user.uid, i.id, input); */}

                                    <h1>You have not added any Account</h1>
                                </div>)
                                :
                                <div className='text-center'>

                                    <h1>You have not added any Account</h1>
                                </div>
                            }
                        </div>
                    </div>


                </div>
            </div>
            {isvisible && <div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
                    <div className='p-4 border-b text-2xl flex justify-between'><h1>Add Bank Account</h1><div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                        <img className='p-2  rounded-full invert' src={cross} onClick={() => (setisvisible(!isvisible))} alt="" /></div></div>
                    <div className='p-6 flex flex-col items-center gap-12'>
                        <div>
                            <label htmlFor="bankname">Bank Name:   </label>
                            <input className='bg-black outline-none ' type="text" id='bankname' name='bankname' placeholder='Enter Bank Name' value={addedbank.bankname} onChange={handlechange} />


                            <label htmlFor="balance">Amount:   </label>
                            <input className='bg-black outline-none ' type="Number" id='balance' name='balance' placeholder='Enter Balance' value={addedbank.balance} onChange={handlechange} />

                        </div>
                        <div>
                            <button className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' onClick={(evt) => (save(evt))}>Save</button>
                        </div>


                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Accounts

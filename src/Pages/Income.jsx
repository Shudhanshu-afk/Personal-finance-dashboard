import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { BankContext } from '../contexts/Bankcontext'
import { addSalary, getsalarydata, updateIncome,deleteIncome } from '../Database/Db'
import { NavLink } from 'react-router-dom'
import cross from '../assets/cross.svg'
import edit from '../assets/edit.svg'
import del from '../assets/delete.svg'
import tick from '../assets/tick.svg'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase'
const Income = () => {

    const [isvisible, setisvisible] = useState(false);
    const [editwindow, seteditwindow] = useState(false);
    const [editinput, seteditinput] = useState({ name: '', amount: 0, month: '' });
    const [user,loading,error] = useAuthState(auth);
    const floatingwindow = (evt) => {
        evt.preventDefault();
        setisvisible(!isvisible);
    }
    const [input, setinput] = useState({ name: '', amount: 0, month: '' });

    const { incomes, setincomes, symbol } = useContext(BankContext);
    const handlechange = ((evt) => {
        const date = new Date();
        const month = date.getMonth();
        setinput((currdata) => {
            currdata[evt.target.name] = evt.target.value;
            currdata.month = month;
            return { ...currdata };
        })
    })
    const editchange = (evt)=>{
        seteditinput((currdata)=>{
            currdata[evt.target.name] = evt.target.value;
            return{...currdata};
        })
    }
    const addincome = (evt) => {
        evt.preventDefault();

        addSalary(user.uid,input);
        setisvisible(!isvisible);
        setinput({ name: '', amount: 0 });

    }
    useEffect(() => {
        if (user) {
            
            getsalarydata(user.uid,setincomes);
        }
    }, [loading]);
    if (loading) {
        return <div>...loading</div>
    }
    return (
        <div className='bg-black h-screen  flex'>
            <div className='bg-white flex m-2 rounded-xl    w-full'>
                <div className='w-1/5 m-2'>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-4/5 bg-black my-2 mr-2 rounded-xl text-white  p-4'>
                    <div className="Accounts border w-full rounded-xl">
                        <div className=' border-b flex justify-between'> <h1 className='text-white p-6 text-4xl'>Income</h1>
                            <button onClick={floatingwindow} className='mr-10 mt-5 mb-5 px-4 py-1 rounded-lg border hover:bg-slate-600 active:bg-white active:text-white'>Add</button>

                        </div>
                        <div className=' '>
                            <div className='p-7'>
                                {incomes? (incomes.length?
                                <table className='w-full '>
                                    <thead className=''>
                                        <tr className='p-7 border-b h-12 text-xl'><th>Income</th> <th>Amount</th> <th>Actions</th></tr>
                                    </thead>
                                    <tbody className=''>

                                        {incomes ? incomes.map((i) => (<tr key={i.id} className='text-center h-10'><td>{ i.name}</td> <td>{symbol}{i.amount}</td>
                                            <td> <div className='w-full flex justify-center gap-5'>

                                                {editwindow ? <><div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                                                    <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
                                                        <div className='p-4 border-b text-2xl flex justify-between'><h1>Edit income details</h1><div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                                                            <img className='p-2  rounded-full invert' src={cross} onClick={() => (seteditwindow(!editwindow))} alt="" /></div></div>
                                                        <div className='p-6 flex flex-col items-center gap-12'>
                                                            <div>
                                                                <label htmlFor="bankname">Name:   </label>
                                                                <input className='bg-black outline-none ' type="text" id='bankname' name='name' placeholder='Enter Bank Name' value={editinput.name} onChange={editchange} />


                                                                <label htmlFor="balance">Amount:   </label>
                                                                <input className='bg-black outline-none ' type="Number" id='balance' name='amount' placeholder='Enter Balance' value={editinput.amount} onChange={editchange} />

                                                            </div>
                                                            <div>
                                                                <button className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' onClick={(evt) => {updateIncome(user.uid, i.id, editinput); seteditwindow(!editwindow)}}>Save</button>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div></> : <img onClick={() => {
                                                    seteditwindow(!editwindow);
                                                    seteditinput((currdata) => {
                                                        currdata['name'] = i.name;
                                                        currdata['amount'] = i.amount;
                                                        return { ...currdata };
                                                    });
                                                }} className='invert' src={edit} alt="" />}
                                                <img onClick={() => { deleteIncome(user.uid,i.id); }} className='invert' src={del} alt="" />
                                            </div></td></tr>)) : ''}
                                    </tbody>
                                </table>:
                             <div className='text-center'>

                             <h1>You have not added any Income</h1>
                         </div>   
                            ):
                            <div className='text-center'>

                                    <h1>You have not added any Income</h1>
                                </div>
                                }
                            </div>


                        </div>
                    </div>


                </div>
            </div>
            {isvisible && <div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
                    <div className='p-4 border-b text-2xl flex justify-between'><h1>Add Income</h1><div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                        <img className='p-2  rounded-full invert' src={cross} onClick={() => (setisvisible(!isvisible))} alt="" /></div></div>
                    <div className='p-6 flex flex-col items-center gap-8'>

                        <div>
                            <label htmlFor="name">Source:   </label>
                            <input className='bg-black outline-none ' type="text" id='name' name='name' placeholder='Name' value={input.name} onChange={handlechange} />


                            <label htmlFor="amount">Amount:   </label>
                            <input className='bg-black outline-none ' type="Number" id='amount' name='amount' placeholder='Enter Amount' value={input.amount} onChange={handlechange} />

                        </div>
                        <div>


                            <button type='submit' onClick={addincome} className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' >Save</button>

                        </div>



                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Income

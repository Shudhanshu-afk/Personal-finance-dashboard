import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { auth, db } from '../Firebase'
import { getDocs, collection, doc } from 'firebase/firestore'
import { useContext } from 'react'
import { BankContext } from '../contexts/Bankcontext'
import rightarrow from '../assets/rightarrow.svg'
import tick from '../assets/tick.svg'
import cross from '../assets/cross.svg'
import edit from '../assets/edit.svg'
import del from '../assets/delete.svg'
import { useAuthState } from 'react-firebase-hooks/auth';

import { createBudget, updateBudget } from '../Database/Db'
import { addtransaction, getBudget, getTransactiondata, deleteTransaction } from '../Database/Db'


const Transactions = () => {

    const [input, setinput] = useState(0);
    const { budget, setbudget, transactionList, settransactionList } = useContext(BankContext);
    const symbol = '₹';
    const [isvisible, setisvisible] = useState(false);
    const [floatwindow, setfloatwindow] = useState(false);
    const [TransactionInput, settransactionInput] = useState({ category: '', amount: '', date: '', time: '', month: '' })
    const [user, loading, error] = useAuthState(auth);
    const [limit, setlimit] = useState();
    const visibility = () => {
        setisvisible(!isvisible);
        if (budget) {
            setinput(budget[0].Budget);
        }
    }
    const handlechange = (evt) => {
        setinput(evt.target.value);
    }
    const savebudget = (evt) => {
        setisvisible(!isvisible)
        if (budget.length>0) {
            updateBudget(user.uid, budget[0].id, { 'Budget': input });
        }
        else {
            createBudget(user.uid, { 'Budget': input });
        }
    }
    const addtransac = () => {
        setfloatwindow(!floatwindow);
    }
    const transChange = (evt) => {
        const now = new Date();

        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
        settransactionInput((currdata) => {

            currdata[evt.target.name] = evt.target.value;
            currdata.time = timeString;
            currdata.date = dateString;
            currdata.month = now.getMonth();

            return { ...currdata };
        })
    }
    const addTransac = (evt) => {
        evt.preventDefault();


        addtransaction(user.uid, { ...TransactionInput });
        console.log(TransactionInput);
        settransactionInput({ category: '', amount: '', date: '', time: '', month: '' });
        setfloatwindow(!floatwindow);

    }


    useEffect(() => {
        if (user) {


            getBudget(user.uid, setbudget);
            getTransactiondata(user.uid, settransactionList);
            
        }
       


    }, [loading])
    const Expenses = () => {
        const date = new Date();
        const currrmonth = date.getMonth();
        if (transactionList) {

            const monthlytransactions = transactionList.filter((i) => (i.month == currrmonth));

            return monthlytransactions.reduce((prev, curr) => { return prev + parseInt(curr.amount) }, 0);

        }
    };
    const monthlyexpenses = Expenses();


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-black h-screen flex'>
            <div className='bg-white flex m-2 rounded-xl    w-full'>
                <div className='w-1/5  m-2'>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-4/5 bg-black my-2 mr-2 rounded-xl grid grid-cols-3 grid-rows-3  p-4'>
                    <div className="bg-black border m-6 rounded-2xl">
                        <div className='text-white flex justify-between items-center border-b'><h1 className='text-xl p-4'>Monthly Budget</h1>
                            <div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                                {isvisible ? <img onClick={savebudget} className='p-2  rounded-full invert' src={tick} alt="" /> : <img onClick={visibility} className='p-2  rounded-full invert' src={edit} alt="" />}

                            </div>
                        </div>
                        <div className='text-white p-6 flex'><h1 className='text-4xl mr-2'>{symbol}</h1> {isvisible ? <input className='bg-black outline-none text-4xl w-44 border-b' type="number" value={input} onChange={handlechange} /> : ((budget.length == 0) ? (<h1 className='text-4xl'>0</h1>) : (<h1 className='text-4xl'>{budget[0].Budget}</h1>))}</div>
                    </div>
                    <div className="bg-black border m-6 rounded-2xl">
                        <div className='text-white p-4 border-b'><h1 className='text-xl'>Total Expenses</h1></div>
                        <div className='text-white p-7'><div className='flex text-4xl text-red-600'>
                            {transactionList ? <><h1 className='text-4xl mr-2'>{symbol}</h1> <h1>
                                {monthlyexpenses}
                            </h1>
                            </> : ''}</div></div>
                    </div>
                    <div className="bg-black border m-6 rounded-2xl">
                        <div className='text-white p-4 border-b'><h1 className='text-xl'>Total Savings</h1></div>
                        <div className='text-white p-7'><div className='flex text-4xl '>{transactionList && (budget.length>0) ? <><h1 className='text-4xl mr-2'>{symbol}</h1> <h1>{parseInt(budget[0].Budget) - transactionList.reduce((prev, curr) => { return prev + parseInt(curr.amount) }, 0)}</h1></> : ''}</div></div>
                    </div>

                    <div className="bg-black border   m-6 rounded-2xl row-span-2 col-span-3  ">
                        <div className='text-white p-4 flex justify-between border-b h-1/12'><h1 className='text-xl'>Transactions</h1> <button onClick={addtransac} className='mr-6 border px-4 py-1 rounded-lg hover:bg-slate-700 active:bg-white active:text-black'>Add</button></div>
                        <div className=' text-white p-8 h-5/6 overflow-y-auto '>
                          {transactionList? (transactionList.length>0?  <table className='w-full '>
                                
                                <thead className=''>
                                    <tr className=' border-b h-12'><th>Category</th> <th>Date</th><th>Time</th><th>Amount</th> <th>Actions</th></tr>
                                </thead>
                                <tbody className=''>

                                    {transactionList ? [...transactionList].map((i) => (<tr key={i.id} className='text-center h-10'><td>{i.category}</td> <td>{i.date}</td><td>{i.time}</td><td className='text-red-600'>{symbol}{i.amount}</td> <td>
                                        <div className='w-full flex justify-center gap-5'>

                                            <img onClick={() => (deleteTransaction(user.uid, i.id))} className='invert' src={del} alt="" />
                                        </div>
                                    </td></tr>)) : ''}
                                </tbody>
                            </table>:
                            <div className='text-center'>

                                <h1>You have not added any transactions</h1>
                            </div>):
                            <div className='text-center'>

                            <h1>You have not added any transactions</h1>
                        </div>
                            }

                        </div>
                    </div>


                </div>
            </div>
            {floatwindow && <div className='floating window fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='w-1/2 h-1/3 bg-black border rounded-lg text-white' >
                    <div className='p-4 border-b text-2xl flex justify-between'><h1>Add Transaction</h1> <div className=' flex justify-center items-center mr-4 h-fit hover:bg-slate-700 rounded-full active:bg-slate-500'>
                        <img className='p-2  rounded-full invert' onClick={() => (setfloatwindow(!floatwindow))} src={cross} alt="" />

                    </div></div>
                    <div className='p-6 flex flex-col items-center gap-8'>
                        <div className='flex gap-20'>
                            <div>

                                <label htmlFor="category">Category   </label>

                                <select name="category" id="category" onChange={transChange} className='bg-black outline-none border-b ' value={TransactionInput.category}>
                                    <option value="" disabled>...</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Subscriptions">Subscriptions</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>

                                <label htmlFor="amount">Amount   </label>
                                <input className='bg-black outline-none ' onChange={transChange} value={TransactionInput.amount} type="text" id='amount' name='amount' placeholder='Amout' />
                            </div>


                        </div>


                        <div>
                            <button onClick={addTransac} className='border p-3 rounded-lg hover:bg-slate-950 active:bg-white ' >Save</button>
                        </div>


                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Transactions

import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart, Bar, Rectangle, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie } from 'recharts';
import { useContext } from 'react';
import { BankContext } from '../contexts/Bankcontext';
import { getAccountdata, getsalarydata, getTransactiondata } from '../Database/Db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase'
const getCurrentMonth = () => {
    const date = new Date();
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      number: date.getMonth() 
    };
  };

const Overview = () => {
    const { incomes, Bank, setBank, setincomes, transactionList, settransactionList,symbol } = useContext(BankContext);
    const [totalIncome, settotalIncome] = useState(0);
    const [totalBalance, settotalBalance] = useState(0);
    const [months, setMonths] = useState([getCurrentMonth()]);
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            
            getsalarydata(user.uid,setincomes);
            getTransactiondata(user.uid,settransactionList);
            getAccountdata(user.uid,setBank);
            
        }
        
    }, [loading]);
    useEffect(()=>{
        const checkNewMonth = () => {
            const currentMonth = getCurrentMonth();
            const lastMonth = months[months.length - 1];
      
            if (currentMonth.number !== lastMonth.number || currentMonth.name !== lastMonth.name) {
              setMonths([...months, currentMonth]);
            }
          };
      
          // Initial check
          checkNewMonth();
      
          // Check every day at midnight
          const intervalId = setInterval(checkNewMonth, 24 * 60 * 60 * 1000);
   
      
          // Clean up the interval on component unmount
          return () => clearInterval(intervalId);
    })
    const monthlyexpenses = (month) => {
        if (transactionList) {
            
            const monthwisetransactions = transactionList.filter(i => i.month == month );
            const monthwiseexpense = monthwisetransactions.reduce((prev, curr) => { return prev + parseInt(curr.amount) }, 0);
            return monthwiseexpense;
        }
    }
    const bardata = () => {
        const date = new Date();
        const month = date.getMonth();
        const options = { month: 'long' };
        const monthname = date.toLocaleString('en-US', options);
        let currmonth = 6;
        const data = [];

    };
    // if (incomes && transactionList) {
        
    //     const data = 
           
    //     ;
    // }
    
    const data01 = [
        
        { name: 'Food', value: (transactionList && transactionList.filter((i)=> i.category == 'Food').length) },
        { name: 'Trasnport', value: (transactionList && transactionList.filter((i)=> i.category == 'Transport').length) },
        { name: 'Subscriptions', value: (transactionList && transactionList.filter((i)=> i.category == 'Subscriptions').length)  },
        { name: 'Groceries', value: (transactionList && transactionList.filter((i)=> i.category == 'Groceries').length) },
        { name: 'Others', value: (transactionList && transactionList.filter((i)=> i.category == 'Others').length) }
        
    ];
    if (loading) {
        return <div>...loading</div>
    }
    return (
        <div className='bg-black h-screen flex'>
            <div className='bg-white flex m-2 rounded-xl    w-full'>
                <div className='w-1/5 m-2 '>
                    <Sidebar></Sidebar>
                </div>
                <div className='w-4/5 bg-black my-2 mr-2 rounded-xl '>
                    <div className='h-1/4 p-4 grid grid-cols-3 gap-4 text-white'>


                        <div className=' rounded-lg border '>
                            <div className='p-3 border-b '>
                                <h1 className='text-xl'>Income</h1>
                            </div>
                            <div>
                                <h1 className='text-4xl p-4'>{symbol}{incomes && incomes.reduce((prev, curr) => { return prev + parseInt(curr.amount) }, 0)}</h1>
                            </div>
                        </div>
                        <div className=' rounded-lg border '>
                            <div className='p-3 border-b '>
                                <h1 className='text-xl'>Balance</h1>
                            </div>
                            <div>
                                <h1 className='text-4xl p-4'>{symbol}{Bank && Bank.reduce((prev, curr) => { return prev + parseInt(curr.balance) }, 0)}</h1>
                            </div>
                        </div>
                        <div className=' rounded-lg border '>
                            <div className='p-3 border-b '>
                                <h1 className='text-xl'>Expenses</h1>
                            </div>
                            <div>
                                <h1 className='text-4xl p-4'>{symbol}{transactionList && transactionList.reduce((prev, curr) => { return prev + parseInt(curr.amount) }, 0)}</h1>
                            </div>
                        </div>

                    </div>
                    <div className='h-3/4 overflow-y-auto'>
                        <div className=' p-4 h-full grid grid-rows-1 grid-cols-2 gap-4 '>
                            
                            <div className='border rounded-lg'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={incomes&& (incomes.length>0) && transactionList && months.map((i)=>({name:i.name, Income:incomes[0].amount, Expense: monthlyexpenses(i.number)}))}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Income" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                        <Bar dataKey="Expense" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className=' rounded-lg border'>
                                <ResponsiveContainer width="100%" height="50%">
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={data01}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        />

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className=" text-white w-full flex justify-center">
                                    <table className='w-3/4 p-4'>
                                        <thead>
                                            <tr className='border-b'><th>Category</th><th>No. of Transactions</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr className='text-center'><td>Food</td><td>{transactionList && transactionList.filter((i)=> i.category == 'Food').length }</td></tr>
                                            <tr className='text-center'><td>Transport</td><td>{transactionList && transactionList.filter((i)=> i.category == 'Transport').length}</td></tr>
                                            <tr className='text-center'><td>Groceries</td><td>{transactionList && transactionList.filter((i)=> i.category == 'Groceries').length}</td></tr>
                                            <tr className='text-center'><td>Subscriptions</td>{transactionList && transactionList.filter((i)=> i.category == 'Subscriptions').length }<td></td></tr>
                                            <tr className='text-center'><td>Others</td><td>{transactionList && transactionList.filter((i)=> i.category == 'Others').length}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Overview

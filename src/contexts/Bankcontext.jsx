import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

export const BankContext = createContext();
// import { getBudget,getTransactiondata } from '../Database/Db';

export const BankContextProvider = (props) => {
   
    const [Bank, setBank] = useState();
    const [transactionList, settransactionList] = useState();
    const [budget, setbudget] = useState([{'Budget':0, id:1}]);
    
    const [incomes,setincomes] =useState();
    

    const symbol = '₹';
   
    

    return (
        <BankContext.Provider value ={{Bank, setBank, transactionList, settransactionList, budget,setbudget,incomes,setincomes,symbol}}>
            {props.children}
        </BankContext.Provider>
    )

}




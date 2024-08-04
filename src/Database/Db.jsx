import React, { useEffect,useContext } from 'react'
import { db } from '../Firebase'
import { getDocs, collection,getDoc } from 'firebase/firestore'
import { addDoc, updateDoc, deleteDoc, doc,onSnapshot } from 'firebase/firestore'
import { BankContext } from '../contexts/Bankcontext';


export const getName = async(useruid,props)=>{
    try {
        const name = await getDoc(doc(db,'users',useruid));
        const details = name.data();
       props(details.name);

    } catch (error) {
        console.log(error);
    }
}



// export const createAccount = async(item)=>{
//     await addDoc(collection(db,'users'), item);
// }
//--------------Transactions----------------------------
export const addtransaction = async (useruid,item) => {
    try {
        
       

        await addDoc(collection(db, 'users', useruid, 'Transactions'), item);
        console.log('Transaction added successfully');
    } catch (error) {
        console.log(error);
    }
}
export const deleteTransaction =  async(useruid,id) => {
    try {
        
        const docref = doc(db, 'users', useruid);
        await deleteDoc(doc(docref, 'Transactions', id));
         console.log('Transaction deleted successfully');
        
    } catch (error) {
        console.log(error);
    }
}
export const getTransactiondata = async (useruid,props) => {
    
    try {
        
    
        const docref = doc(db, 'users', useruid);
        const transactionCollecref = collection(docref,'Transactions')
    return onSnapshot(transactionCollecref,snapshot=>{
            const transactions = snapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            ))
            console.log('Transactions fetched successfully');
            props(transactions);

        })
        
    }
    catch (err) {
        console.log(err);
    }



}
//---------------------------------------------------------------------------------------

//-----------Budget-----------------------------------------------------
export const createBudget = async(useruid,item)=>{
try {

    await addDoc(collection(db,'users',useruid,'Budget'),item);
    console.log('Budget added successfully');

} catch (error) {
    console.log(error);
}
}

export const updateBudget = async (useruid,id,newdata) => {
    try {
        
        // Specify the path to the nested document
        const docRef = doc(db, 'users', useruid, 'Budget',id);

        // Data to update



        // Update the document
        await updateDoc(docRef, newdata);

        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};
export const getBudget = async (useruid,props) => {
    
    try {
        const docref = doc(db, 'users', useruid);
        const collecref = collection(docref,'Budget');
        onSnapshot(collecref,snapshot=>{
            const budget = snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))
            props(budget);
            console.log('Budget fetched successfully');
        });
  

    } catch (error) {
        console.log(error);
    }


}
//---------------------------------------------------------------------------------------

//-------------------Accounts------------------------------------------------------

export const createAccount = async (useruid,item) => {
    try {
        
        const docref = doc(db, 'users', useruid);

        await addDoc(collection(docref, 'Accounts'), item);
        console.log('account created successfully')
    } catch (error) {
        console.log(error);
    }
}
export const getAccountdata = async (useruid,props) => {
    try {
        
        
        const docref = doc(db, 'users', useruid);
        const accountCollecref = collection(docref,'Accounts');

         onSnapshot(accountCollecref, snapshot =>{
            const accounts = snapshot.docs.map(acc =>({
                id: acc.id,
                ...acc.data()
            }))
            console.log("Account data fetched successfully");
            props(accounts);
        })
    } catch (error) {
        console.log(error);
    }


}
export const updateAccountdata = async(useruid,id, updatedacc)=>{
    
    try {
        
        const docref = doc(db, 'users', useruid,'Accounts',id);
       await updateDoc(docref, updatedacc);
       console.log('Acoount updated successfully');
    } catch (error) {
        console.log(error);
    }
}
export const deleteaccount = async (useruid,id)=>{
    try {
        
        const docref = doc(db,'users',useruid,'Accounts',id);
        await deleteDoc(docref);
        console.log('Account deleted successfully');
    } catch (error) {
        console.log(error);
    }
}
//------------------------------------------------------------------------

//---------------------------Salary-------------------------------------------
export const addSalary = async (useruid,item) => {
    try {
        
        const docref = doc(db, 'users', useruid);

        await addDoc(collection(docref, 'Salary'), item);
        console.log('Salary addes successfully')
    } catch (error) {
        console.log(error);
    }
}




export const getsalarydata = async (useruid,props) => {
    try {
        
        const docref = doc(db, 'users',useruid);

        
        const incomeSourcesCollectionRef = collection(docref, 'Salary');
        // const income = res.docs.map((doc) => (
        //     { ...doc.data(), id: doc.id }
        // ))
        // props(income);
        // console.log("Income data fetched successfully");
        return onSnapshot(incomeSourcesCollectionRef, snapshot => {
            const incomeArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            props(incomeArray);
            console.log("Income data fetched successfully");
        });
    }


    catch (error) {
        console.log(error);
    }


}
export const updateIncome = async(useruid,id,item)=>{
    try {
        
        const docref = doc(db, 'users', useruid,'Salary',id);
        
        await updateDoc(docref,item);
        console.log('Income updated successfully');
    } catch (error) {
        console.log(error);
    }

}
export const deleteIncome = async (useruid,id)=>{
    try {
        
        const docref = doc(db, 'users', useruid,'Salary',id);
        await deleteDoc(docref);
        console.log('Income deleted successfully');
    } catch (error) {
        console.log(error);
    }
}



const getdata = async () => {
    try {
        const data = await getDocs(collection(db, 'users'));
        const filterdata = data.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        ));
        console.log(filterdata);

    } catch (error) {
        console.log(error);
    }
}
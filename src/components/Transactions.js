import { formatMoney } from '../functions/moneyFormat';
import './Transactions.scss'
import { useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

const Transactions = ({transactions}) => {

  //const contentRef = useRef(null); // Kreiramo ref za div
  let dataFromLocalStorage = JSON.parse(localStorage.getItem('id'));
  const history = useHistory();
  //   useEffect(() => {
  //   if (contentRef.current) {
  //     contentRef.current.scrollTop = 0; 
  //   }
  // }, []);


  const handleClick = (transId) => {
    fetch("http://localhost:8000/users/"+dataFromLocalStorage)
    .then((res) => res.json())
    .then((user) => {
      const updatedTransactions = user.transactions.filter(t => t.id !== transId);
  
      fetch("http://localhost:8000/users/"+dataFromLocalStorage, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, transactions: updatedTransactions }) 
      })
        .then((res) => res.json())
        .then((updatedUser) => console.log("Transaction deleted:", updatedUser));
        
    });
    window.location.reload();
  }

    
    
    return ( 
        <div className="transactions">
            
            <div className="titleTransaction"> Transactions </div>

            <div className="transactionsList" >

            {transactions && transactions.map(transaction => (
                <div className="oneTransaction" 
                key={transaction.id} 
                style={ 
                    {backgroundColor: transaction.id % 2 === 0 ? '#fefae0' : '#03045e' ,
                    color : transaction.id % 2 === 0 ? 'black' : 'white'}}>
                    <p> Amount: {formatMoney(transaction.amount,'EUR')}</p>
                    <p> Type: { transaction.type }</p>
                    <p> Description: { transaction.description }</p>
                    { <button className='btnDelete' onClick={() =>handleClick(transaction.id)}> Delete</button> }
                
                </div>
            ))}


            </div>

        </div>
     );
}
 
export default Transactions;
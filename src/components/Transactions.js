import { formatMoney } from '../functions/moneyFormat';
import './Transactions.scss'
import { useEffect, useRef } from 'react';


const Transactions = ({transactions}) => {

    const contentRef = useRef(null); // Kreiramo ref za div

  
    useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0; 
    }
  }, []);

    
    
    return ( 
        <div className="transactions">
            
            <div className="titleTransaction"> Transactions </div>

            <div className="transactionsList" ref={contentRef}>

            {transactions && transactions.map(transaction => (
                <div className="oneTransaction" 
                key={transaction.id} 
                style={ 
                    {backgroundColor: transaction.id % 2 === 0 ? '#fefae0' : '#03045e' ,
                    color : transaction.id % 2 === 0 ? 'black' : 'white'}}>
                    <p> Amount: {formatMoney(transaction.amount,'EUR')}</p>
                    <p> Type: { transaction.type }</p>
                    <p> Description: { transaction.description }</p>
                
                </div>
            ))}


            </div>

        </div>
     );
}
 
export default Transactions;
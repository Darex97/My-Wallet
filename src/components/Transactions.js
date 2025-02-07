import { formatMoney } from '../functions/moneyFormat';
import './Transactions.scss'
import { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";

const Transactions = ({ transactions }) => {

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  //const contentRef = useRef(null); // Kreiramo ref za div
  let dataFromLocalStorage = JSON.parse(localStorage.getItem('id'));
  const history = useHistory();
  //   useEffect(() => {
  //   if (contentRef.current) {
  //     contentRef.current.scrollTop = 0; 
  //   }
  // }, []);

  const [boolTransactions, setBoolTransactions] = useState(false);

  const tansactionClick = (e) => {

    setBoolTransactions(true);

  }
  const tansactionCancel = (e) => {

    setBoolTransactions(false);
    setAmount('');
    setType('');
    setDescription('');

  }

  const handleClick = (transId) => {
    fetch("http://localhost:8000/users/" + dataFromLocalStorage)
      .then((res) => res.json())
      .then((user) => {
        const updatedTransactions = user.transactions.filter(t => t.id !== transId);

        fetch("http://localhost:8000/users/" + dataFromLocalStorage, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, transactions: updatedTransactions })
        })
          .then((res) => res.json())
          .then((updatedUser) => console.log("Transaction deleted:", updatedUser),window.location.reload());

      });
    
  }

  const handleAddTransaction = () => {

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount), 
      type: type,                 
      description: description     
  };

    fetch("http://localhost:8000/users/" + dataFromLocalStorage)
      .then((res) => res.json())
      .then((user) => {
        const updatedTransactions = [...user.transactions, newTransaction]; // Dodaj novu transakciju

        fetch("http://localhost:8000/users/" + dataFromLocalStorage, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, transactions: updatedTransactions })
        })
          .then((res) => res.json())
          .then((updatedUser) => console.log("Transaction added:", updatedUser), setBoolTransactions(false),
          window.location.reload());

      });
      
  };




  return (
    <div className="transactions">

      <div className="titleTransaction"> Transactions



      </div>

      <button className="addTransaction" onClick={() => tansactionClick()}> Add Transaction</button>

      { boolTransactions && <div className="overlay" ></div>}
      { boolTransactions && <div className="addOneTransaction">

        <input className='inputForTransaction'
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          
        />

        <input className='inputForTransaction'
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input className='inputForTransaction'
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className='addTransactionBtn' onClick={handleAddTransaction}>Add Transaction</button>
        <button className='cancelTransactionBtn' onClick={tansactionCancel}>Cancle Transaction</button>


      </div>}


      <div className="transactionsList" >

        {transactions && transactions.map(transaction => (
          <div className="oneTransaction"
            key={transaction.id}
            style={
              {
                backgroundColor: transaction.id % 2 === 0 ? '#fefae0' : '#03045e',
                color: transaction.id % 2 === 0 ? 'black' : 'white'
              }}>
            <p> Amount: {formatMoney(transaction.amount, 'EUR')}</p>
            <p> Type: {transaction.type}</p>
            <p> Description: {transaction.description}</p>
            {<button className='btnDelete' onClick={() => handleClick(transaction.id)}> Delete</button>}

          </div>
        ))}


      </div>

    </div>
  );
}

export default Transactions;
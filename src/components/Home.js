import useFetch from "../hooks/useFetch";
import Navbar from "./Navbar";
import './Home.scss'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Exchange from "./Exchange";
import { useState } from "react";




const Home = () => {

    const history = useHistory();
    const [boolWallet, setBoolWalet] = useState(true);
    const [boolTransactions, setBoolTransactions] = useState(false);
    const [boolExchange, setBoolExchange] = useState(false);

    
    let dataFromLocalStorage = JSON.parse(localStorage.getItem('id'));
    if(!dataFromLocalStorage)
        {
            history.push('/login');
        }


    const { error, isPending, data: user } = useFetch('http://localhost:8000/users/'+dataFromLocalStorage)
    

    const waletClick = (e) => {
      
      setBoolWalet(true) ;
      setBoolTransactions(false);
      setBoolExchange(false);  

    }

    const exchangeClick = (e) => {
      
      setBoolWalet(false) ;
      setBoolTransactions(false);
      setBoolExchange(true);  
    }

    const tansactionClick = (e) => {
      
      setBoolWalet(false) ;
      setBoolTransactions(true);
      setBoolExchange(false);  
    }


    return (
      <div className="home">
        { user && <Navbar  name={user.name} />}
        { error && <div className="loading" >{ error }</div> }
        { isPending && <div className="loading">Loading...</div> }
        <div className="pick"> 
          <div className="leftPick"> 

            <div className="lBtns" onClick={waletClick}> Wallet </div>

            <div className="lBtns" onClick={tansactionClick}> Transactions </div>

            <div className="lBtns" onClick={exchangeClick}> Exchange rates</div>

          </div>

          <div className="rightPick"> 
           
            { user &&  boolWallet && <Wallet user={user} />  }

            { user && boolTransactions && <Transactions transactions={user.transactions} />  }

            { user && boolExchange && <Exchange money={user.money} />  }


          </div>

        </div>
        
        
      </div>
    );
  }
   
  export default Home;
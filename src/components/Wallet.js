import { formatMoney } from '../functions/moneyFormat';
import './Wallet.scss'

const Wallet = (props) => {
    
    const user = props.user;
    return (
        <div className="wallet"> 
        
            <div className='title'> 
                
                WALLET

            </div>

            <div className="user">

                User: {user.name}

            </div>

            <div className="money">

            Money: {formatMoney(user.money,'EUR')}
                

            </div>

        </div>
      );
}
 
export default Wallet;
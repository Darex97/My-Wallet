import useFetch from '../hooks/useFetch';
import './Exchange.scss'
import {formatDate} from '../functions/dateFormat';
import { formatMoney } from '../functions/moneyFormat';

const Exchange = ({money}) => {

    const { error, isPending, data: exchangeRates } = useFetch('https://latest.currency-api.pages.dev/v1/currencies/eur.json') 

    //console.log(exchangeRates.eur)
    return ( 
        <div className='Exchange'>
            { error && <div className="loading2" >{ error }</div> }
            { isPending && <div className="loading2">Loading...</div> }
            
            <div className="titleExchange"> Exchange Rates</div>
            {exchangeRates && <div className='ratesData'> 

                <div className="date"> Date: {formatDate(exchangeRates.date)} </div>

                <div className="exhcangeList">

                <p> Euro: {formatMoney(money,'EUR')}  </p>

                <p> Serbian Dinar: {formatMoney(money * exchangeRates.eur.rsd,'RSD')}  </p>

                <p> US Dollar: {formatMoney(money * exchangeRates.eur.usd,'USD')}  </p>

                <p> Japanese Yen: {formatMoney(money * exchangeRates.eur.jpy,'JPY')}   </p>

                <p> British Pound: {formatMoney(money * exchangeRates.eur.gbp,'GBP')}  </p>

                <p> Swiss Franc: {formatMoney(money * exchangeRates.eur.chf,'CHF')}   </p>

                <p> Chinese Yuan: {formatMoney(money * exchangeRates.eur.cny,'CNY')}  </p>


                </div>
                
                
            </div>}



        </div>
     );
}
 
export default Exchange;
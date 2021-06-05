import './App.css';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { loadMarket, loadMarkets } from './Api';
import LoginForm from "./LoginForm";
import Markets from "./Markets";
import OrderBook from "./OrderBook";
import Order from "./Order";
import Assets from "./Assets";


function App() {
    const [isLoggedIn, setLogin] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    
    const defaultMarket = 'snu-won';

    const handleLoginForm = () => {
        if(localStorage.getItem('LOGIN_KEY'))
            setLogin(true);
        else 
            setLogin(false);
    }
    
    const handleMarket = (clickedMaket) => {
        loadMarket(clickedMaket)
        .then(_market => {
            setMarket(_market);
        })
    }
    
    useEffect(() => {
      loadMarkets()
          .then(marketObjects => {
              setMarkets(Object.keys(marketObjects).map(key => marketObjects[key]));
            })

      loadMarket(defaultMarket)
        .then(_market => {
            setMarket(_market);
            })
    }, []);

    useEffect(() => {
        if(localStorage.getItem('LOGIN_KEY')) {
            setLogin(true)
        }
    }, []);

    return (
        <div>

            <header>
                <div><h2>logo</h2></div>
                <h2>SnuCoin 거래소</h2>
                <div className="login-panel">
                <LoginForm isLoggedIn={ isLoggedIn } onClick={ handleLoginForm }/>
                </div>
            </header>

            <div id="contents">
                <div className="tradeColumn">
                    <div className="markets">
                        <Markets onClick={ handleMarket } markets={ markets }/>
                    </div>
                    <div className="orderColumn">
                        {market &&
                            <div className="market">
                                <OrderBook market={ market }/>
                            </div>                  
                        }
                        {market &&
                            <div className="orderBlock">
                                <Order market={ market }/>
                            </div>
                        }
                    </div>
                </div>
                <div className="infoColumn">
                    <div className="Assets">
                       <Assets/>
                    </div>
                    <div className="infoBox">

                    </div>
                </div>
            </div>
        </div>
     );
}

export default App;

import './App.css';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { loadMarket, loadMarkets } from './Api';
import LoginForm from "./LoginForm";
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
    
// 마켓 정보 가져오기
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

    return (
        <div>
            <header>
                <div><h2>logo</h2></div>
                <h2>SnuCoin 거래소</h2>
                <div className="login-panel">
                <LoginForm isLoggedIn={ isLoggedIn } onClick={ handleLoginForm }/>
                </div>
            </header>
            <contents>
                <div id="contents">
                <div className="market">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {markets.map(market =>
                        <Button>{market.name}</Button>
                    )}
                    </ButtonGroup>
                    {market &&
                    <div className="market">
                        <div id="orderBooks">
                        {
                            market.orderBook.buy.map(orderBook => {
                                return (<div key={orderBook._id}>
                                    {orderBook._id} : {orderBook.totalQuantity}
                                </div>);
                            })
                        }
                        </div>
                        <div >
                            <form className="create-order">
                                <Button>Buy</Button><Button>Sell</Button>
                                <TextField size="small" id="filled-basic" label="price" variant="filled" type="number" />
                                <TextField size="small" id="filled-basic" label="quantity" variant="filled" type="number" />
                                <Button type="submit">Order</Button>
                            </form>
                        </div>
                    </div>
                    }
                </div>
            </div>
            </contents>
        </div>
     );
}

export default App;

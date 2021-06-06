import './App.css';
import { useEffect, useState } from 'react';
import { loadMarket, loadMarkets, loadAssets, cancel } from './Api';
import LoginForm from "./LoginForm";
import Markets from "./Markets";
import OrderBook from "./OrderBook";
import Order from "./Order";
import Assets from "./Assets";
import MyOrder from "./MyOrder";


function App() {

    const [isLoggedIn, setLogin] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const [assets, setAssets] = useState([]);
    const [mySellOrder, setMySellOrder] = useState([]);
    const [myBuyOrder, setMyBuyOrder] = useState([]);

    const defaultMarketName = 'snu-won';
    // console.log(myBuyOrder);
    // console.log(mySellOrder);

    const handleLoginForm = () => {
        if(localStorage.getItem('LOGIN_KEY'))
            setLogin(true);
        else 
            setLogin(false);
    }
    
    const handleMarket = (clickedMaketName) => {
        loadMarket(clickedMaketName)
        .then(_market => {
            setMarket(_market);
        })
    }

    const cancelOrder = (orderId) => {
        cancel(orderId)
        .then(_market => {
            setMarket(_market);
        })
    }
    
    const updateAssets = () => {
        loadAssets()
        .then(_assets => {
            setAssets(_assets);
        })
        .catch( () => {
            setAssets([]);
        })
    }

    useEffect(() => {
      loadMarkets()
          .then(marketObjects => {
              setMarkets(Object.keys(marketObjects).map(key => marketObjects[key]));
            })

      loadMarket(defaultMarketName)
        .then(_market => {
            setMarket(_market);
            })
    }, []);

    useEffect(() => {
        if(localStorage.getItem('LOGIN_KEY')) {
            setLogin(true)
        }
    }, []);

    useEffect(() => {
        updateAssets();
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('BUY_ORDER', JSON.stringify(myBuyOrder));
    }, [myBuyOrder])

    useEffect(() => {
        localStorage.setItem('SELL_ORDER', JSON.stringify(mySellOrder));
    }, [mySellOrder])

    // 5초마다 orderBook을 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if(market && handleMarket(market.market.name));
        }, 5000);
        return () => clearInterval(interval);
    })

    // 5초마다 Assets을 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if(isLoggedIn && updateAssets());
        }, 5000);
        return () => clearInterval(interval);
    })

    // 5초마다 myOrder 업데이트


    return (
        <div>

            <header>
                <h2><img width="200px" src="http://www.maybugs.com/news/photo/201803/570094_400072_5126.jpg"></img></h2>
                <h1>SnuCoin 거래소</h1>
                <div className="login-panel">
                <LoginForm isLoggedIn={ isLoggedIn } onClick={ handleLoginForm }/>
                </div>
            </header>

            <div id="contents">
                <div className="tradeColumn">
                    <div className="markets">
                        <Markets onClick={ handleMarket } markets={ markets } market={ market }/>
                    </div>
                    <div className="orderColumn">
                        {market &&
                            <div className="market">
                                <OrderBook market={ market }/>
                            </div>                  
                        }
                        {market &&
                        <>
                            <div className="orderBlock">
                                <Order market={ market } mySellOrder={ mySellOrder } setMySellOrder={ setMySellOrder }
                                myBuyOrder={ myBuyOrder } setMyBuyOrder={ setMyBuyOrder }/>
                            </div>
                            <MyOrder market={ market } mySellOrder={ mySellOrder } myBuyOrder={ myBuyOrder }/>
                        </>
                        }
                    </div>
                </div>
                <div className="infoColumn">
                    <div className="Assets">
                       <Assets assets={ assets }/>
                    </div>
                    <div className="infoBox">

                    </div>
                </div>
            </div>
        </div>
     );
}

export default App;

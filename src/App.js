import './App.css';
import { useEffect, useState } from 'react';
import { loadMarket, loadMarkets, loadAssets, cancel, getOrders } from './Api';
import LoginForm from "./LoginForm";
import Markets from "./Markets";
import OrderBook from "./OrderBook";
import Order from "./Order";
import Assets from "./Assets";
import MyOrder from "./MyOrder";

function App() {
    
    const LOGIN_KEY = "LOGIN_KEY";
    const defaultMarketName = 'snu-won';
    
    const [isLoggedIn, setLogin] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const [assets, setAssets] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [user, setUser] = useState(null);

    const handleLoginForm = () => {
        if(localStorage.getItem(LOGIN_KEY))
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

    const loadUser = () => {
        loadAssets()
        .then(_assets => {
            setUser(_assets[0].user);
        })
    }

    // 아직 미체결된 내 order들을 가져오는 함수
    const getMyOrders = () => {
        const _MyOrders = [];
        getOrders()
        .then(_orders => {
            _orders.forEach((_order) => {
                if(_order.status === 0){
                    if(_order.user === user){
                        if(_order.remainQuantity > 0){
                            _MyOrders.push(_order);
                        }
                    }
                }
            } )
            setMyOrders(_MyOrders);
        })
    }

    useEffect(() => {
        getMyOrders();
    })

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
        loadUser();
    }, [isLoggedIn])

    // 5초마다 orderBook을 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if(market && handleMarket(market.market.name));
        }, 5000);
        return () => clearInterval(interval);
    }, [market])

    // 5초마다 Assets을 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if(isLoggedIn && updateAssets());
        }, 5000);
        return () => clearInterval(interval);
    }, [market, isLoggedIn])

    // 5초마다 myOrder 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if(isLoggedIn && getMyOrders());
        }, 5000);
        return () => clearInterval(interval);
    }, [market, isLoggedIn])


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
                                <Order market={ market }/>
                            </div>
                            <MyOrder market={ market } myOrders={ myOrders } cancelOrder={ cancelOrder } isLoggedIn={ isLoggedIn }/>
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

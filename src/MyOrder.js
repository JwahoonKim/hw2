import { Button } from '@material-ui/core';


const MyOrder = (props) => {
    const myOrders = props.myOrders;
    const nowMarket = props.market.market.name;
    const mySellOrders = myOrders.filter( _order => (_order.side === "sell" && _order.market.name === nowMarket));
    const myBuyOrders = myOrders.filter( _order => (_order.side === "buy" && _order.market.name === nowMarket));
    // console.log(myBuyOrders);
    const sortedMySellOrders = mySellOrders.sort( (a, b) => {
        return (a.price - b.price);
    })
    const sortedMyBuyOrders = myBuyOrders.sort( (a, b) => {
        return -(a.price - b.price);
    })
    if(props.isLoggedIn){
        return (
            <div className="myOrder">
                <h3 className="myOrderTitle">미체결된 { nowMarket.toUpperCase() } Orders</h3>
                <div className="buyBox totalOrderBox">
                {  
                    sortedMyBuyOrders.map(_myBuyOrder => {
                        return(
                            <div key={_myBuyOrder._id} className="myBuyBox myOrderBox">
                                
                                <div className="myOrderInfo myBuyInfo">
                                    <p>
                                    주문 가격: { _myBuyOrder.price.toLocaleString() }
                                    </p>
                                    미체결 수량: { _myBuyOrder.remainQuantity.toLocaleString() }
                                </div>
                                <Button variant="contained" color="secondary" size="small" onClick={ () => props.cancelOrder(_myBuyOrder._id) }>
                                매수 취소
                                </Button>
                            </div>
                        )
                    })
                }
                </div>
                <div className="sellBox totalOrderBox">
                {  
                    sortedMySellOrders.map(_mySellOrder => {
                        return(
                            <div key={_mySellOrder._id} className="mySellBox myOrderBox">
                                <div className="myOrderInfo mySellInfo">
                                    <p>
                                    주문 가격: { _mySellOrder.price.toLocaleString()}  
                                    </p>
                                    미체결 수량: { _mySellOrder.remainQuantity.toLocaleString() }
                                </div>
                                <Button variant="contained" color="primary" size="small" onClick={ () => props.cancelOrder(_mySellOrder._id) }>
                                매도 취소
                                </Button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
    else {
        return(<div></div>);
    }
}

export default MyOrder;

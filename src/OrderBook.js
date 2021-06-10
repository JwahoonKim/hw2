const OrderBook = (props) => {
    const buyOrderBook = props.market.orderBook.buy
    const sellOrderBook = props.market.orderBook.sell
    
    // order들을 price에 맞춰 정렬
    const sortedBuyOrderBook = buyOrderBook.sort( (a, b) => {
        return -(a.price - b.price);
    })
    const sortedSellOrderBook = sellOrderBook.sort( (a, b) => {
        return -(a.price - b.price);
    })

    return (
        
        <div>
            <div className="orderBookInfo">
                <div>PRICE</div>
                <div>QUANTITY</div>
            </div>
            <div>
                {sortedSellOrderBook.map( sellOrder => {
                    return (
                        <div className="orderList" key={sellOrder._id}>
                            <div className="sellOrderPrice"> {Math.floor(sellOrder.price).toLocaleString()}</div>
                            <div className="sellOrderQuantity">{Math.floor(sellOrder.totalQuantity).toLocaleString()}</div>
                        </div>
                    )
                })}

                {sortedBuyOrderBook.map( buyOrder => {
                    return (
                        <div className="orderList" key={buyOrder._id}>
                            <div className="buyOrderPrice"> {Math.floor(buyOrder.price).toLocaleString()}</div>
                            <div className="buyOrderQuantity">{Math.floor(buyOrder.totalQuantity).toLocaleString()}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrderBook;
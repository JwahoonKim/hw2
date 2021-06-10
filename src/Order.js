import { Button, TextField } from '@material-ui/core';
import { useState} from 'react';
import { orders } from './Api';

const Order = (props) => {
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const marketName = props.market.market.name;
    const style = {
        margin: '5px',
        marginLeft: '20px'
    }

    const handleBuy = async (e) => {
        e.preventDefault();
        console.log("매수합니다")
        const _order = await orders(price, quantity, marketName, 'buy');
        if(_order.error){
            alert("매수에 실패했습니다.");
        }
        else{
            alert("매수 주문을 하였습니다.");
            return _order;
        }
    }

    const handleSell = async (e) => {
        e.preventDefault();
        console.log("매도합니다")

        const _order = await orders(price, quantity, marketName, 'sell');
        if(_order.error){
            alert("매도에 실패했습니다.");
        }
        else{
            alert("매도 주문을 하였습니다.");
            return _order;
        }
    }

    return (
    <div >
        <form className="create-order">
            <TextField style={style} size="small" id="outlined-basic" label="price" variant="outlined" type="number" onChange={ e => setPrice(e.target.value)} />
            <TextField style={style} size="small" id="outlined-basic" label="quantity" variant="outlined" type="number" onChange={ e => setQuantity(e.target.value) }/>
            <div className="tradeButton">
                <Button type='submit' variant="contained" value="buy" size="large" color="secondary" onClick={ (e) => handleBuy(e) }>매수</Button>
                <Button type='submit' variant="contained" value="sell" size="large" color="primary" onClick={ (e) => handleSell(e) }>매도</Button>
            </div>
        </form>
    </div>
    )
}

export default Order;

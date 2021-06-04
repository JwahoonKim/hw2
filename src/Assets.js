import {useState, useEffect} from "react";
import { loadAssets } from './Api';

const Assets = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        loadAssets()
        .then(_assets => {
            setAssets(_assets);
        })
    }, []);
    
    return (
        <div>
            <h3>내 보유재산</h3>
            {
                assets.map(asset => {
                    return (
                    <div>
                        {asset.symbol} : {asset.quantity}
                    </div>)
                })
            }
        </div>
    )
}

export default Assets;

const Assets = (props) => {
    const assets = props.assets;
    
    return (
        <div>
            <h3>내 보유재산</h3>
            {
                assets.map(asset => {
                    return (
                    <div key={asset._id}>
                        ★ {Math.floor(asset.quantity).toLocaleString()} {asset.symbol}
                    </div>)
                })
            }
        </div>
    )
}

export default Assets;

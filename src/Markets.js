import { Button, ButtonGroup } from "@material-ui/core";

const Markets = (props) => {

    const style = {
        margin: '30px'
    }

    const buttonStyle = {
        backgroundColor: '#3f51b5',
        color: 'white',
    }

    return (
        <div className="marketButton">
            <ButtonGroup style={style} color="primary" aria-label="outlined primary button group">
                {props.markets.map(_market =>
                {
                    if( props.market && props.market.market.name === _market.name)
                        return(
                        <Button id={ _market.name } key={_market._id} style={ buttonStyle } size="large" onClick={ () => {props.onClick(_market.name)} }>{ _market.name }</Button>
                    )
                    else{
                        return (
                            <Button id={ _market.name } key={_market._id} size="large" onClick={ () => {props.onClick(_market.name)} }>{ _market.name }</Button>
                        )
                    }
                }
                )}
            </ButtonGroup>
        </div>
    )
}

export default Markets;
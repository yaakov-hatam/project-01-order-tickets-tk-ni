import React from 'react';
import {container, ACTIONS } from '../Store';

class CartDrive extends React.Component{
    constructor(props){
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    removeFromCart = ()=>{
        let action = {
            type:ACTIONS.REMOVE,
            drive: {...this.props}
        }

        container.dispatch(action);
    }
    render(){
        return(<div className="cart-drive">
            <div className="cart-drive-section">From <div className="strong-text">{this.props.from}</div></div>
            <div className="cart-drive-section">To <div className="strong-text">{this.props.to}</div></div>
            <div className="cart-drive-section">{this.props.date.slice(0,10)}</div>
            <div className="cart-drive-section">{this.props.departure.hour + ':' + this.props.departure.minute}</div>
            <div className="cart-drive-section">{this.props.price + '$'}</div>
            <button className="remove-btn" onClick={this.removeFromCart}>remove</button>
        </div>)
    }
}

export default CartDrive;
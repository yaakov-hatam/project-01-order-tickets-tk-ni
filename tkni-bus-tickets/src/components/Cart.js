import React from 'react';
import { container, ACTIONS } from './../Store';
import CartDrive from './CartDrive';
import CheckoutPopup from './CheckoutPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drives: [],
            checkout: false,
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.cartToggle = this.cartToggle.bind(this);
    }

    componentDidMount() {
        if (this.state.drives.length <= 0) {
            let prevState = { ...this.state };
            prevState.checkout = false;
            this.setState(prevState);
        }
        container.subscribe(() => {
            let prevState = { ...this.state };
            prevState.drives = container.getState().drives;
            if (prevState.drives.length > 0) {
                prevState.checkout = false;
            }
            this.setState(prevState);
        })
    }

    handleClick = () => {
        let action = {
            type: ACTIONS.CHECKOUT
        }
        container.dispatch(action);

        let action2 = {
            type: ACTIONS.EMPTY
        }
        container.dispatch(action2);

        let prevState = this.state;
        prevState.drives = [];
        prevState.checkout = true;
        this.setState(prevState);

        setTimeout(() => {
            let prevState = this.state;
            prevState.checkout = false;
            this.setState(prevState);
        }, 5000)
    }

    cartToggle = () => {
        let prevState = {...this.state};
        if(prevState.clicked){
            prevState.clicked = false;
        }else if(!prevState.clicked){
            prevState.clicked = true;
        }

        this.setState(prevState);
    }
    render() {
        return (
            <div className="d-inline-block cart">
                {this.state.checkout ? <CheckoutPopup /> :
                    <div>
                        {this.state.clicked ? 
                        <div className="cart-container">
                            <div onClick={this.cartToggle} className="cart-closing-icon cart-icon"><FontAwesomeIcon icon={faTimesCircle} /></div>
                            <div>
                                {this.state.drives.length <= 0 ? 'Empty cart, try adding some tickets.' : <div> {this.state.drives.map(drive => <CartDrive {...drive} />)} <button onClick={this.handleClick} className="btn btn-warning">Checkout</button></div>}
                            </div>
                           
                            
                        </div> 
                        :
                         <div onClick={this.cartToggle} className="cart-icon"><FontAwesomeIcon icon={faShoppingCart} /></div>}
                    </div>
                }
            </div>

        )
    }
}

export default Cart;
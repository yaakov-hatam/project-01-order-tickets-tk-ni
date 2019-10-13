import React from 'react';
import CartDrive from './../models/CartDrive';
import { container, ACTIONS } from '../Store';
class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dep_hour: this.props.departure.hour,
            dep_minute: this.props.departure.minute,
            seats_taken: this.props.seats_taken,
            seats_available: this.props.seats_available,
            sold_out: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = () => {
        let driveObj = new CartDrive(this.props.id, this.props.date, this.props.departure, this.props.from, this.props.to, this.props.operator, this.props.price);
        let action = {
            type: ACTIONS.ADD,
            drive: driveObj
        }
        container.dispatch(action);
    }

    componentDidMount() {
        let prevState = { ...this.state };

        if (this.props.departure.hour < 10) {
            prevState.dep_hour = '0' + this.props.departure.hour;
        }
        if (this.props.departure.minute < 10) {
            prevState.dep_minute = '0' + this.props.departure.minute;
        }

        if (this.state.seats_taken === this.state.seats_available) {
            prevState.sold_out = true;
        }
        this.setState(prevState)
    }

    render() {
        return (
            <div className={this.state.sold_out ? "drive-result-out noselect" : "drive-result noselect"}>
                <div className="drive-box">From
                    <div className="strong-text">{this.props.from}</div>
                </div>
                <div className="drive-box">To
                    <div className="strong-text">{this.props.to}</div>
                </div>
                <div className="drive-box">Departure
                    <div className="strong-text">{new Date(this.props.date).toDateString()} <br /> {this.state.dep_hour}:{this.state.dep_minute}</div>
                </div>
                <div className="drive-box">Operator
                    <div ><img className="operator-img"src={'/images/operators/' + this.props.operator +'.png'} /></div>
                </div>
                <div className="drive-box">Price
                    <div className="strong-text">{this.props.price + '$'}</div>
                </div>
                <div className="drive-box">Available Seats
                    <div className="strong-text">{this.props.seats_available - this.props.seats_taken}</div>
                </div>
                {this.state.sold_out ?
                    <button disabled={true} className="btn btn-warning add-cart-btn-soldout">Sold out</button>
                    :
                    <button onClick={this.handleClick} className="btn btn-warning add-cart-btn">Add to cart</button>}
            </div>)
    }
}

export default Result;
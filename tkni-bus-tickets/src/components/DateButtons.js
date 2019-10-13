import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
class DateButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 7,
        }
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrevious = () => {
        let prevState = { ...this.state };
        prevState.start -= 7;
        prevState.end -= 7;
        this.setState(prevState);
    }

    handleNext = () => {
        let prevState = { ...this.state };
        prevState.start += 7;
        prevState.end += 7;
        this.setState(prevState);
    }

    render() {
        return (
            <div>{this.props.buttons.length > 0 ? 
            <div className="date-btn-container">
                {this.state.start > 0 ? <button className="prev-next-btn btn btn-warning" onClick={this.handlePrevious}><FontAwesomeIcon icon={faCaretLeft}/></button> : <button className="prev-next-btn-disabled btn btn-warning" disabled={true}><FontAwesomeIcon icon={faCaretLeft}/></button>}
                {this.props.buttons.slice(this.state.start, this.state.end).map(b =>
                    <span>
                        {b.lowest_price ?
                            <button className="btn btn-warning date-btn" value={b.date.toISOString().slice(0, 10)} onClick={(event) => this.props.sortByDateButton(event.target.value)}>
                                {b.date.toDateString().slice(0, 10)}
                                <br />
                                {b.lowest_price + '$'}
                            </button>
                            : <button className="btn btn-warning date-btn-disabled" disabled={true}>
                                {b.date.toDateString().slice(0, 10)}
                                <br />
                                No Rides
                            </button>}
                    </span>

                )}

                {this.state.end < 28 ? <button className="prev-next-btn btn btn-warning" onClick={this.handleNext}><FontAwesomeIcon icon={faCaretRight}/></button> : <button className="prev-next-btn-disabled btn btn-warning" disabled={true}><FontAwesomeIcon icon={faCaretRight}/></button>}
            </div> : ''}</div>
        )
    }
}

export default DateButtons;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSort, faBookOpen, faBus } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
class Header extends React.Component {
    constructor(props) {
        super(props);
        let max_date = new Date();
        max_date.setDate(max_date.getDate() + 28);
        this.state = {
            from: 'Anywhere',
            to: 'Anywhere',
            date: new Date().toISOString().slice(0, 10),
            min_date: new Date().toISOString().slice(0, 10),
            max_date: max_date.toISOString().slice(0, 10),
            sort_value: ''
        }

        this.locationsArr = ['Miami Florida', 'Memphis Tennessee', 'Nashville Kentucky', 'Detroit Michigan', 'Teaneck New Jersey', 'Houston Texas', 'Las Vegas Nevada', 'Los Angeles California', 'Atlanta Georgia', 'Manhattan New York', 'Brooklyn New York'];
        this.results_query = {
            from: '',
            to: '',
            departure_date: '',
        };
        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.sendResultUrl = this.sendResultUrl.bind(this);

    }

    handleFrom = (v) => {
        let prevState = { ...this.state };
        prevState.from = v;
        this.setState(prevState, () => console.log('handle from'));
    }
    handleTo = (v) => {
        let prevState = { ...this.state };
        prevState.to = v;
        this.setState(prevState, () => console.log('handle to'));
    }
    handleDate = (v) => {
        let prevState = { ...this.state };
        prevState.date = v;
        this.setState(prevState, () => console.log('handle date'));
    }
    sendResultUrl = () => {
        this.results_query = {
            from: this.state.from,
            to: this.state.to,
            departure_date: this.state.date,
        }
        this.props.handleClick(this.results_query);
    }

    handleSort = (v) => {
        let prevState = { ...this.state };
        prevState.sort_value = v;
        this.setState(prevState, () => console.log('handle sort'));
    }
    render() {
        return (<div className="header w-100 d-inline-block">
            <div className="logo noselect">
                <div className="bus-icon">
                <FontAwesomeIcon icon={faBus}/>
                </div>
                <h1 className="main-title">BUS TICKETS SYSTEM</h1>
                <a href="https://github.com/tk-ni/" target="_blank"><span className="slogan">Made by tk-ni <FontAwesomeIcon icon={faGithub} /></span></a>

            </div>

            <div>
                <div className="search-container">
                    <div className="header-section col-lg-3 col-12">
                        <div className="header-text">From</div>
                        <select aria-describedby="basic-addon1" className="form-control d-inline-block" onChange={(event) => this.handleFrom(event.target.value)}>
                            <option>Anywhere</option>
                            {this.locationsArr.map(l => <option>{l}</option>)}
                        </select>
                    </div>
                    <div className="header-section col-lg-3 col-12">
                        <div className="header-text">To</div>
                        <select className="form-control d-inline-block" onChange={(event) => this.handleTo(event.target.value)}>
                            <option>Anywhere</option>
                            {this.locationsArr.map(l => <option>{l}</option>)}
                        </select>
                    </div>
                    <div className="header-section col-lg-3 col-12">
                        <div className="header-text">Date</div>
                        <input className="form-control d-inline-block" type={'date'} defaultValue={this.state.date} min={this.state.min_date} max={this.state.max_date} onChange={(event) => this.handleDate(event.target.value)} />
                    </div>
                    <div className="header-section col-lg-3 col-12">
                        <button onClick={this.sendResultUrl} className="btn btn-warning search-btn">Search <FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    <div className="sort-container">
                        <div className="header-section col-lg-4 col-12">
                            <div className="header-text">Sort by</div>
                            <select className="form-control d-inline-block" onChange={(event) => { this.handleSort(event.target.value) }}>
                                <option value={'sortByPriceAscending'}>Price - lowest</option>
                                <option value={'sortByPriceDescending'}>Price - highest</option>
                                <option value={'sortByHourAscending'}>Hour - earliest</option>
                                <option value={'sortByHourDescending'}>Hour - latest</option>
                            </select>
                        </div>
                        <div className="header-section col-lg-4 col-12">
                            <button onClick={() => this.props.handleSort(this.state.sort_value)} className="btn btn-warning sort-btn">Sort <FontAwesomeIcon icon={faSort} /></button>
                        </div>
                        <div className="header-section col-lg-4 col-12">
                            <button onClick={this.props.showAllRides} className="btn btn-warning d-inline-block display-all-btn">Display All <FontAwesomeIcon icon={faBookOpen} /></button>
                        </div>
                    </div>
                </div>

            </div>




        </div>)
    }
}

export default Header;
import React from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Resultslist from './components/Resultslist';
import Cart from './components/Cart';
import DateButtons from './components/DateButtons';
import DateButton from './models/DateButton';
//firebase
import firebaseConfig from './firebaseConfig';
import firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      data: [],
      clicked: false,
      buttonsBoolean: false,
      date: '',
      buttons: [],
      from: 'Anywhere',
      to: 'Anywhere',
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.showAllRides = this.showAllRides.bind(this);
    this.sortByDateAscending = this.sortByDateAscending.bind(this);
    this.sortByDateDescending = this.sortByDateDescending.bind(this);
    this.sortByPriceAscending = this.sortByPriceAscending.bind(this);
    this.sortByPriceDescending = this.sortByPriceDescending.bind(this);
    this.sortByHourAscending = this.sortByHourAscending.bind(this);
    this.sortByHourDescending = this.sortByHourDescending.bind(this);
    this.sortByDateButton = this.sortByDateButton.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.getLowestPrice = this.getLowestPrice.bind(this);
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    let database = firebase.database().ref('all_drives');
    database.on('value', snap => {
      let newData = snap.val();
      let filtered = newData.filter(d=>{
        return d.from != undefined;
      });
      this.setState({ results: [], data: filtered, clicked: false, buttonsBoolean: false })
    })


  }
  sortByDateButton = (date) => {

    let query = {
      from: this.state.from,
      to: this.state.to,
      departure_date: date,
    }
    this.handleButtonClick(query);

  }
  showAllRides = () => {
    let prevState = { ...this.state };
    prevState.results = prevState.data;
    this.setState(prevState);
  }
  sortByDateAscending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })
    this.setState(prevState);
  }
  sortByDateDescending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    this.setState(prevState);
  }
  sortByPriceAscending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      return a.price - b.price;
    })
    this.setState(prevState);
  }
  sortByPriceDescending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      return b.price - a.price;
    })
    this.setState(prevState);
  }

  sortByHourAscending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      if (a.arrival.hour != b.arrival.hour) {
        return a.arrival.hour - b.arrival.hour;
      }
      return a.arrival.minute - b.arrival.minute;
    })
    this.setState(prevState);
  }
  sortByHourDescending = () => {
    let prevState = { ...this.state };
    prevState.results.sort((a, b) => {
      if (a.arrival.hour !== b.arrival.hour) {
        return b.arrival.hour - a.arrival.hour;
      }
      return b.arrival.minute - a.arrival.minute;
    })
    this.setState(prevState);
  }
  handleSort = (query) => {
    if (this.state.results.length > 0) {
      switch (query) {
        case 'sortByPriceAscending':
          this.sortByPriceAscending();
          break;
        case 'sortByPriceDescending':
          this.sortByPriceDescending();
          break;
        case 'sortByHourAscending':
          this.sortByHourAscending();
          break;
        case 'sortByHourDescending':
          this.sortByHourDescending();
          break;
      }
    }
  }

  getLowestPrice = (query)=>{
    console.log(query);
    let dayResults = this.resultsSort(query);
    console.log('dayResults', dayResults);
    dayResults.sort((a,b)=>{
      return a.price - b.price;
    })
    if(dayResults.length > 0){
      return dayResults[0].price;
    }
   
  }
  handleButtonClick = (query) => {
    let finalResults = this.resultsSort(query);

    let prevState = { ...this.state };
    prevState.results = finalResults;
    prevState.date = query.departure_date;

    prevState.clicked = true;

    this.setState(prevState, () => console.log('handleSearchClick', this.state.date));
  }
  resultsSort = (query) => {
    //handle results by search
    let finalResults = [];
    if (query.from == 'Anywhere' && query.to != 'Anywhere') {
      this.state.data.forEach(d => {
        if (query.to === d.to) {
          if (query.departure_date === d.date.slice(0, 10)) {
            finalResults.push(d);
          }
        }
      })
    } else if (query.from != 'Anywhere' && query.to == 'Anywhere') {
      this.state.data.forEach(d => {
        if (query.from === d.from) {
          if (query.departure_date === d.date.slice(0, 10)) {
            finalResults.push(d);
          }
        }
      })
    } else if (query.from == 'Anywhere' && query.to == 'Anywhere') {
      this.state.data.forEach(d => {
        if (query.departure_date === d.date.slice(0, 10)) {
          finalResults.push(d);
        }
      })
    } else {
      this.state.data.forEach(d => {
        if (query.from === d.from && query.to === d.to) {
          if (query.departure_date === d.date.slice(0, 10)) {
            finalResults.push(d);
          }
        }
      })
    }
    return finalResults;
  }
  handleSearchClick = (query) => {
    let finalResults = this.resultsSort(query);

    let prevState = { ...this.state };
    prevState.results = finalResults;
    prevState.date = query.departure_date;
    prevState.clicked = true;
    prevState.from = query.from;
    prevState.to = query.to;
    prevState.buttons = [];
    for (let i = 0; i < 28; i++) { //create date buttons after search
      //date
      let newDate = new Date(query.departure_date);
      newDate.setDate(newDate.getDate() + 1);



      query.departure_date = newDate.toISOString().slice(0,10);
      let lowest_price = this.getLowestPrice(query);
      //create obj
      let DateBtn = new DateButton(newDate, lowest_price);
      //push
      prevState.buttons.push(DateBtn);
    }
    this.setState(prevState, () => console.log('Search click', this.state.date));
  }

  render() {
    return (
      <div className="container w-80">
        {this.state.data.length > 0 ? <div>
          <Header handleSort={this.handleSort} handleClick={this.handleSearchClick} showAllRides={this.showAllRides} />
          <Cart />
          <div className="hr"/>
          <DateButtons buttons={this.state.buttons} sortByDateButton={this.sortByDateButton} />
          <div className="hr"/>
          <Resultslist results={this.state.results} /></div> : 'Loading...'}
      </div>
    )
  }
}

export default App;
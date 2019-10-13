import React from 'react';
import Result from './Result';
class Resultslist extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(<div className="results-container">
           {this.props.results.map(res => <div key={res.id}><Result {...res}/></div>)}
        </div>)
    }
}
export default Resultslist;
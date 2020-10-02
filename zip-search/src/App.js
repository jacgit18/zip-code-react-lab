import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
<div>
      <h2> {props.locationText} </h2>
      <ul>
        <li> State: {props.state} </li>
        <li> Location: {props.location} </li>
        <li> Population: {props.population} </li>
        <li> Total Wages: {props.totalWages}</li>
      </ul>
    </div>
    );
}

function ZipSearchField(props) {
  
  return (
  <div>
    Type zip code
    <input type="text" onChange={props.zipChanged} value={props.zipValue} />
    <p>You entered: {props.zipValue}  </p>
  </div>
  );
}


class App extends Component {
  state = {
    userInputValue: "",
    
    // intialize State
  }

   url = 'http://ctp-zip-api.herokuapp.com/zip/';
  handleZipChange(event){
    console.log(event.target.value);
    if(event.target.value.length >= 5){
    fetch(this.url+event.target.value)
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData);
      this.setState({
         userResultArray: jsonData
        //  userResultArray: [userCity.City, userState, userLocation, userEstimatedPopulation, userTotalWages]
        // if (this.state.currSelected < this.props.numBoards - 1)
        // this.setState({ currSelected: this.state.currSelected + 1 });
        //   else this.setState({ currSelected: 0 });

        // console.log(); for testing
        // City State
        //result  State Location EstimatedPopulation TotalWages
    })
      
    });
  }
    this.setState({
      userInputValue: event.target.value
      
      // Update State
    })
  }


  // look at boards project for render for city 
  render() {
    // // let {userResultArray} = this.state.userCity;
    // let {userResultArray} = this.state;
    // for (let ii = 0; ii < this.state.userResultArray; ii++) {
    //   let isSelected = ii === this.state.userResultArray; 
    //   userResultArray.push(<App index={ii} selected={isSelected} key={ii} />);
    // }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue} />
        <div>
        <City zipChanged={(e) => this.handleZipChange(e)} cityValue={this.state.userResultArray}  /> 
          {/* <City zipChanged={(e) => this.handleZipChange(e)} cityValue={this.state.userResultArray[0]}  stateValue={this.state.userResultArray} /> 
          <City zipChanged={(e) => this.handleZipChange(e)} stateValue={this.state.userResultArray} 
          Location={this.state.userResultArray} EstimatedPopulation={this.state.userResultArray} TotalWages={this.state.userResultArray}  /> */}

        </div>
      </div>
    );
  }
}

export default App;

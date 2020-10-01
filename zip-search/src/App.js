import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div>
  This is the City component
  <p>You entered: {props.results}  </p>

  </div>);
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
    userResultArray: [],
    userCity:"",
    userState:"",
    userLocation:"",
    userEstimatedPopulation:"",
    userTotalWages:"",
    // intialize State
  }

  handleZipChange(event){
    console.log(event.target.value);
    fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData);
      this.setState({
         userResultArray: jsonData.results
        //  userResultArray: [userCity.City, userState, userLocation, userEstimatedPopulation, userTotalWages]
        // if (this.state.currSelected < this.props.numBoards - 1)
        // this.setState({ currSelected: this.state.currSelected + 1 });
        //   else this.setState({ currSelected: 0 });

        // console.log(); for testing
        // City State
        //result  State Location EstimatedPopulation TotalWages
      })
    });
    this.setState({
      userInputValue: event.target.value
      
      // Update State
    })
  }

  // look at boards project for render for city 
  render() {
    // let {userResultArray} = this.state.userCity;
    let {userResultArray} = this.state;
    for (let ii = 0; ii < this.props.userResultArray; ii++) {
      let isSelected = ii === this.state.userResultArray; 
      userResultArray.push(<App index={ii} selected={isSelected} key={ii} />);
    }
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

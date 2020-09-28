import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div>This is the City component</div>);
}

function ZipSearchField(props) {
  
  return (
  <div>
    Type zip code
    <input type="text" onChange={props.zipChanged} value={props.zipValue} />
    <p>You entered: {props.zipValue}</p>
  </div>
  );
}


class App extends Component {
  state = {
    userInputValue: "",
          // add property

  }

  handleZipChange(event){
    console.log(event.target.value);
    fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
    .then(response => response.json())
    .then(jsonData => {
      this.setState({
        //result
      })
    });
    this.setState({
      userInputValue: event.target.value
    })
  }

  // look at boards project for render for city 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue} />
        <div>
          <City /> 
          <City />
        </div>
      </div>
    );
  }
}

export default App;

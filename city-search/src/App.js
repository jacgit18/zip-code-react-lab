import React, { Component } from "react";
import "./App.css";

function City(props) {
  return (
    <div>
      <h2>
        {props.data.City}, {props.data.State}
      </h2>
      <ul>
        <li>State: {props.data.State}</li>
        <li>Location: ({props.data.Lat}, {props.data.Long}) </li>
        <li>Estimated Population: {props.data.EstimatedPopulation}</li>
        <li>Total Wages: {props.data.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      Type zip code
      <input type="text" onChange={props.zipChanged} value={props.zipValue} />
      <p>You entered: {props.zipValue} </p>
    </div>
  );
}

class App extends Component {
  state = {
    userInputValue: "",
    userResultArray: []
    // intialize State
  };



  url = "http://ctp-zip-api.herokuapp.com/zip/";
  handleZipChange(event) {

    this.setState({
      userInputValue: event.target.value
                          // Update State
    
    })
  
  console.log(event.target.value);
  if (event.target.value.length === 5) {
    fetch(this.url + event.target.value)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          userResultArray: jsonData,
                    // Update State

        });
      }).catch(err => this.setState({ userResultArray: [] }));
     
  } else {
    this.setState({
      userResultArray: [],

    })

  }
}

  render() {
 
    
    console.log(this.state.userResultArray);

    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue}/>
        <div>
          {this.state.userResultArray.map((item) => {
            return <City data={item} />;
          })}

      
      
        </div>
      </div>
    );
  }
}

export default App;

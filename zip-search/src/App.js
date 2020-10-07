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

  // look at boards project for render for city
  render() {
    // can see latest state and not calling state better for testing 
    // when in the handler we were trying to run before the fetch ran 
    
    console.log(this.state.userResultArray);

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
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue}/>
        <div>
          {this.state.userResultArray.map((item) => {
            return <City data={item} />;
          })}

           {/*
           not a hash map this is a built in map function 
           this function takes an array and apply a funtion to each element in
           the array making a new array with the transformed array map and and foreach but
           foreach wont return new array like map which transform data like in this case
           the json array into a new array that is being returned
            */}
      
        </div>
      </div>
    );
  }
}

export default App;

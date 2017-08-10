import React, { Component } from 'react';
import './App.css';
import PokeForm from "./Components/PokeForm";


class App extends Component {
  render() {
    return (
      <div className="App">
          <PokeForm/>
      </div>
    );
  }
}

export default App;

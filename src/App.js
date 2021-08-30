import React from 'react';
import './App.css';
import Header from './Components/Header/Header.jsx';

//Create and expose App component
export default class App extends React.Component {
  render(){
    return (
        <div className="App">
            <Header/>
        </div>
    )
  }
}

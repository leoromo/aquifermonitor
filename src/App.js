import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecordList from './components/recordlist';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // data: [{
      //   name: 'TEST',
      //   location: {
      //     lat: 20,
      //     lon: -120
      //   },
      //   user: 'DefaultUser',
      //   date: 12341234,
      //   data: '120',
      //   _id: '0'
      // }]
      data: []
    };
    this.loadRecordsFromServer = this.loadRecordsFromServer.bind(this);
  }

  loadRecordsFromServer() {
    axios.get(this.props.url)
        .then(res => {
          this.setState({data: res.data});
        })
  }

  componentDidMount() {
    this.loadRecordsFromServer();
    setInterval(this.loadRecordsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WaterWatch</h2>
          <h3>Monitoreo de Acuiferos</h3>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        <RecordList data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;

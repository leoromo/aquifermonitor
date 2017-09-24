import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecordList from './components/recordlist';
import UserForm from './components/userform';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadRecordsFromServer = this.loadRecordsFromServer.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  loadRecordsFromServer() {
    var url = this.props.url;
    if (typeof this.state.user !== 'undefined' && this.state.user !== '') {
      url = url + '/user/' + this.state.user;
    }
    axios.get(url)
      .then(res => {
        this.setState({data: res.data});
      });
  }

  componentDidMount() {
    this.loadRecordsFromServer();
    setInterval(this.loadRecordsFromServer, this.props.pollInterval);
  }

  changeUser(value) {
      this.setState({user: value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WaterWatch</h2>
          <h3>Monitoreo de Acuiferos</h3>
        </div>
        <div>
        <UserForm changeUser={this.changeUser} />
        </div>
        <div className="App-records">
        <RecordList data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AquiferList from './components/aquiferlist';
import RecordList from './components/recordlist';
import UserForm from './components/userform';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      dataByName: [],
      recordData: []
    };
    this.loadRecordsFromServer = this.loadRecordsFromServer.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeAquifer = this.changeAquifer.bind(this);
  }

  loadRecordsFromServer() {
    var url = this.props.url;
    if (typeof this.state.user !== 'undefined' && this.state.user !== '') {
      url = url + '/user/' + this.state.user;
    }
    axios.get(url)
      .then(res => {
        this.setState({rawData: res.data});
      })
      .then(() => {
        var grouped = this.state.rawData.reduce((groups, item) => {
          var val = item.name;
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
        }, {});
        this.setState({dataByName: grouped});
      })
      .then(() => {
        if (typeof this.state.dataByName[this.state.activeAquifer] !== 'undefined') {
          this.setState({recordData: this.state.dataByName[this.state.activeAquifer]});
        }
      });
  }

  componentDidMount() {
    this.loadRecordsFromServer();
    setInterval(this.loadRecordsFromServer, this.props.pollInterval);
  }

  changeUser(value) {
    this.setState({user: value, dataByName: [], recordData: []});
  }

  changeAquifer(value) {
    this.setState({recordData: this.state.dataByName[value],
                    activeAquifer: value});
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
        <div className='App-mainTable'>
          <div className='App-mainTableRow'>
            <div className='App-aquifers'>
            <AquiferList 
              activeAquifer={this.state.activeAquifer}
              data={this.state.dataByName} 
              changeAquifer={this.changeAquifer}/>
            </div>
            <div className="App-records">
            <RecordList data={this.state.recordData}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

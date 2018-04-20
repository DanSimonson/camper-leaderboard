import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Table';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  state = {
    allTimeLeaders: [],
    recentLeaders: [], 
    showAllTime: false      
  }  
componentDidMount() {
  
  axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/alltime`).then(res => {
      this.setState({
        allTimeLeaders: res.data
      });
  });
  axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`).then(res => {
      this.setState({
        recentLeaders: res.data
      });
  }); 
}

showAllTimeHandler = () => {
  console.log('inside showAllTimeHander');
  this.setState ({
    showAllTime: true
  });
}
showRecentHandler = () => {
  console.log('inside showRecentHander');
  this.setState ({
    showAllTime: false
  });  
}

  render() {
    const leadCampers = this.state.allTimeLeaders;
    const recentCampers = this.state.recentLeaders;
    const showAllTime = this.state.showAllTime;
    //let link = {`https://www.freecodecamp.org/${leader.username}`}
    //const link = 'https://www.freecodecamp.com/'+ this.leadCampers;
  

    let show = null;

    if(showAllTime === false){
      show = 
      <Table striped bordered condensed hover className="colorBlack">
      <thead>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th onClick={this.showRecentHandler}>Points in 30 Days &nbsp;&nbsp;&nbsp;{showAllTime === false && (<i class="fas fa-angle-down fa-3x"></i>)}</th>
          <th onClick={this.showAllTimeHandler}>All Time Points &nbsp;&nbsp;&nbsp; {showAllTime && (<i class="fas fa-angle-down fa-3x"></i>)}</th>
        </tr>
      </thead>
      <tbody>
      {recentCampers.map((leader, index) => (
        <tr key={leader.username}>
          <td>{index + 1}</td>
          <td><a href={`https://www.freecodecamp.org/${leader.username}`}>
          <img src={leader.img} className="imgHeight" /> {leader.username}
          </a></td>
          <td>{leader.recent}</td>
          <td>{leader.alltime}</td>
        </tr>
      )        
      )}
      </tbody>
    </Table>

    } else if (showAllTime) {
      
      show = 
      <Table striped bordered condensed hover className="colorBlack">
      <thead>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th onClick={this.showRecentHandler}>Points in 30 Days &nbsp;&nbsp;&nbsp;{showAllTime === false && (<i class="fas fa-angle-down fa-3x"></i>)}</th>
          <th onClick={this.showAllTimeHandler}>All Time Points &nbsp;&nbsp;&nbsp;{showAllTime && (<i class="fas fa-angle-down fa-3x"></i>)}</th>
        </tr>
      </thead>
      <tbody>
      {leadCampers.map((leader, index) => (
        <tr key={leader.username}>
          <td>{index + 1}</td>
          <td><a href={`https://www.freecodecamp.org/${leader.username}`}>
          <img src={leader.img} className="imgHeight" /> {leader.username}
          </a></td>
          <td>{leader.recent}</td>
          <td>{leader.alltime}</td>
        </tr>
      )        
      )}
      </tbody>
    </Table>

    }

    return (
      <div className="App container">
        <h2>Leaderboard</h2>
        {show}
      </div>      
    );
  }
}

export default App;



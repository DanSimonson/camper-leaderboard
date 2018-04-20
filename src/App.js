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
          <Image src={leader.img} className="imgHeight" /> {leader.username}
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
          <Image src={leader.img} className="imgHeight" /> {leader.username}
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
        {show}
      </div>      
    );
  }
}

export default App;


 {/*
  <ul>
        {recentCampers.map(leader => 
          <div key={leader.username}>
          <li>{leader.username}</li>
          <li>{leader.alltime}</li>
          </div>
        )}
  </ul>
  
  
  const {recentLeaders, allTimeLeaders} = this.state;
  <Table bordered condensed hover className="colorBlack">
        <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Last 30 Days</th>
          <th>All Time Points</th>
        </tr>
      </thead>
      <tbody>
       {recentLeaders.map((row, index) => (
         <tr key={row.username}>
         <td>index + 1 </td>
         <td><a href={`https://www.freecodecamp.org/${row.username}`}>
         <Image src= {row.img} className='imgHeight' cirlcle/> {row.username}
         </a></td>
         <td>{row.recent}</td>
         <td>{row.alltime}</td>  
         </tr>
      ) 
      )}
      </tbody>
    </Table>*/}

    {/*componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
      .then(axios.spread((recentCampers, allTimeCampers) => {
        this.setState({
          recentCampers: recentCampers.data,
          allTimeCampers: allTimeCampers.data
        });
      }));          
  }
  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAllTimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeView(view) {
    this.setState({ currentView: view });
  }*/}

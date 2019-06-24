import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Homepage from './containers/homepage';
import Login from './containers/login';
import './styles/login.css';

class App extends Component {
  constructor() {
    super();
    this.state = { login: false };
  }
  
  render() {
    return this.state.login ? (
      <HashRouter>
				<div>
					<Homepage />
				</div>
			</HashRouter>
    ) : (
				<div className="login-screen">
					<Login />
				</div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Homepage from './containers/homepage';
import Login from './containers/login';
import Register from './containers/register';
import './styles/login.css';

class App extends Component {
  constructor() {
    super();
    this.state = { login: false };
  }

  login = () => {
      this.setState({ login: true });
  }

  logout = () => {
      this.setState({ login: false });
  }

  LoginPage = (props) => {
    return (
      <Login login={this.login}/>
    );
  }
  
  render() {
    return this.state.login ? (
      <HashRouter>
				<div>
					<Homepage logout={this.logout} />
				</div>
			</HashRouter>
    ) : (
        <HashRouter>
          <div className="login-screen">
            <Switch>
              <Route path="/login" render={this.LoginPage} />
              <Route path="/register" component={Register} />
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
        </HashRouter>
    );
  }
}

export default App;

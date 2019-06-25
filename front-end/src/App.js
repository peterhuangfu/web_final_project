import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Homepage from './containers/homepage';
import Login from './containers/login';
import Register from './containers/register';
import './styles/login.css';

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token') || false;
    this.state = { login: token };
  }

  login = async () => {
      this.setState({ login: true });
      await localStorage.setItem('token', true);
      this.props.history.push('/home');
  }

  logout = async () => {
      this.setState({ login: false });
      await localStorage.clear();
      this.props.history.push('/login');
  }

  LoginPage = (props) => {
    return (
      <Login login={this.login}/>
    );
  }
  
  render() {
    return this.state.login ? (
				<div>
					<Homepage logout={this.logout} />
				</div>
    ) : (
          <div className="login-screen">
            <Switch>
              <Route path="/login" render={this.LoginPage} />
              <Route path="/register" component={Register} />
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
    );
  }
}

export default withRouter(App);

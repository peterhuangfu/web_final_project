import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Homepage from './containers/homepage';

class App extends Component {
  render() {
    return (
      <HashRouter>
				<div>
					<Homepage />
				</div>
			</HashRouter>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";



class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/**' render={()=><Redirect to="/home"/>} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App
import React from 'react';
import Login from './components/Login/Login';
import Register from './components/Registration/Register';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authMeThunkCreator } from './redux/reducer/AuthReducer';
import { compose } from 'redux';
import ContainerNotes from './components/Notes/ContainerNotes';

class App extends React.Component {

  componentDidMount() {

    this.props.authMeThunkCreator();

  }

  render() {
    return (
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Register} />
          <Route path="/notes" component={ContainerNotes} />
        </div>
    );
  }
}

export default compose(withRouter, connect(null, { authMeThunkCreator }))(App);

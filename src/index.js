import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Auth/LogIn/LogIn';
import Register from './components/Auth/Register/Register';
import CssLoader from './components/UI/CssLoader/CssLoader';
// import registerServiceWorker from "./registerServiceWorker";
import firebase from './firebase';
import './index.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/index';
import {
  setUser,
  clearUser,
  setCurrentChannel,
  setPrivateChannel,
} from './store/actions/index';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <CssLoader />
    ) : (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = (state) => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps, {
    setUser,
    clearUser,
    setCurrentChannel,
    setPrivateChannel,
  })(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();

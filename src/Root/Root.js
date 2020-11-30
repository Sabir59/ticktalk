import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import App from '../components/Messages/App';
import Register from '../Auth/Register/Register';
import LogIn from '../Auth/LogIn/LogIn';
import firebase from '../../firebase';

const Root = (props) => {
  console.log(props);
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       props.history.push('/');
  //     } else {
  //       props.history.push('register');
  //     }
  //   });
  // }, []);
  return (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={LogIn} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);
export default RootWithAuth;

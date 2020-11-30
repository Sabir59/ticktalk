import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import App from '../../App';
import Register from '../../components/Auth/Register/Register';
import Register from '../../components/Auth/LogIn/LogIn';
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

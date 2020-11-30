import React, { useState } from 'react';
import './LogIn.scss';
import firebase from '../../../firebase';
import { Link } from 'react-router-dom';
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader';

const LogIn = () => {
  // STATE DEFINED HERE
  const [state, setState] = useState({
    username: '',
    email: '',
    checked: true,

    errors: [],
    loading: false,
  });

  // HANDLECHANGE() DEFINED HERE
  const handleChange = (event) => {
    setState((prevState) => {
      return { ...prevState, errors: [] };
    });
    event.persist();
    setState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  // ISFORMVALID DEFINED HERE
  const isFormValid = ({ email, password }) => email.length && password.length;
  // HANDLESUBMIT DEFINED HERE
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid(state)) {
      setState((prevState) => {
        return { ...prevState, loading: true };
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((signedUser) => {
          console.log(signedUser);
          setState((prevState) => {
            return { ...prevState, loading: false };
          });
        })
        .catch((err) => {
          setState((prevState) => {
            return {
              ...prevState,
              errors: state.errors.concat(err.message),
              loading: false,
            };
          });
        });
    }
  };

  // DOM RENDERING
  const displayErrors = () => {
    return state.errors.length > 0 && state.errors.toString().includes('identifier')
      ? `Opps could'nt find a user with this email`
      : state.errors.toString().includes('password')
      ? 'Opps its look like password is invalid'
      : state.errors;
  };

  const forgotPassword = () => {
    const email = 'sabirnawaz535@gmail.com';
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // HANDLING CHECKBOX
  const handleCheckbox = () => {
    const checked = state.checked;
    setState((prevState) => {
      return { ...prevState, checked: !checked };
    });
  };

  return (
    // LogIn
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2E86DE',
      }}
    >
      <div className='LogIn'>
        {/* LogIn Title*/}
        <h1 className='LogIn__title'>LogIn</h1>
        {/* LogIn Form*/}
        <form className='LogIn__form' onSubmit={handleSubmit}>
          {/* LogIn Input Group*/}
          <div className='LogIn__inputGroup'>
            <input
              className='LogIn__input'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              // autoComplete='off'
            />
            <input
              className='LogIn__input'
              placeholder='Password'
              name='password'
              type='password'
              onChange={handleChange}
              // autoComplete='off'
            />
          </div>

          {/* LogIn Button*/}
          <button
            className='LogIn__button'
            type='button'
            onClick={handleSubmit}
            disabled={state.errors.length}
          >
            {state.loading ? <ButtonLoader /> : 'Log In '}
          </button>
          <div className='LogIn__staySigned'>
            <input
              type='checkbox'
              defaultChecked={state.checked}
              onClick={handleCheckbox}
              id='checkbox'
            />
            <label className='LogIn__staySigned_text' htmlFor='checkbox'>
              Remember Password
            </label>
          </div>
          <Link
            to='resetPassword'
            className='LogIn__forgotPassword'
            onClick={forgotPassword}
          >
            Forgot Password
          </Link>
          <span
            className='LogIn__span'
            style={{ opacity: state.errors.length > 0 ? 0 : 100 }}
          >
            Don't have an account <Link to='register'>Register</Link>
          </span>

          {/* LogIn Errors*/}
          {state.errors ? (
            <p className='LogIn__error'>{state.errors.length > 0 && displayErrors()}</p>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default LogIn;

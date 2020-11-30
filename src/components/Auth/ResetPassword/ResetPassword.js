import React, { useEffect, useState } from 'react';
import './ResetPassword.scss';
import firebase from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader';

const ResetPassword = (props) => {
  const [state, setState] = useState({
    email: '',
    loading: false,

    errors: [],
  });

  const handleChange = (event) => {
    setState((prevState) => {
      return { ...prevState, errors: [] };
    });

    setState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();
    if (state.email) {
      setState((prevState) => {
        return { ...prevState, loading: true };
      });
      const email = state.email;
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((response) => {
          console.log(response);
          setState((prevState) => {
            return { ...prevState, loading: false };
          });
          props.history.push('ResetPasswordSuccess');
          setTimeout(() => {
            redirectToLogIn();
          }, 3000);
        })
        .catch((err) => {
          setState((prevState) => {
            return {
              ...prevState,
              errors: state.errors.concat(err.message),
              loading: false,
            };
          });
          setTimeout(() => {
            redirectToResetPassword();
          }, 3000);
        });
    }
  };

  const redirectToLogIn = () => props.history.push('login');
  const redirectToResetPassword = () => props.history.push('resetPassword');
  console.log(state.errors);

  const displayError = () => {
    return state.errors.length > 0 && state.errors;
  };
  return (
    // ResetPassword
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
      <div className='ResetPassword'>
        {/* ResetPassword Title*/}
        <h1 className='ResetPassword__title'>Forgot Password</h1>
        {/* ResetPassword Form*/}
        <form className='ResetPassword__form' onSubmit={resetPassword}>
          {/* ResetPassword Input Group*/}
          <div className='ResetPassword__inputGroup'>
            <input
              className='ResetPassword__input'
              placeholder='Email'
              name='email'
              // autoComplete='off'
              onChange={handleChange}
            />
          </div>

          {/* ResetPassword Button*/}
          <button
            className='ResetPassword__button'
            type='button'
            onClick={resetPassword}
            disabled={state.errors.length}
          >
            {state.loading ? <ButtonLoader /> : 'Send Email'}
          </button>

          <Link to='/login'>
            <button
              className='ResetPassword__button ResetPassword__buttonBack'
              type='button'
            >
              <FontAwesomeIcon icon={faUndo} className='ResetPassword__icon' />
              Back
            </button>
          </Link>
          {state.errors ? (
            <p className='ResetPassword__error'>
              {state.errors.length > 0 && displayError()}
            </p>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

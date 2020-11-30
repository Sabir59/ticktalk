import React, { useEffect, useRef, useState } from 'react';
import './Register.scss';
import firebase from '../../../firebase';
import { AvatarGenerator } from 'random-avatar-generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faGooglePlusG,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader';

const Register = () => {
  // STATE DEFINED HERE
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',

    errors: [],
    userRef: firebase.database().ref('users'),
    checked: true,
    passwordType: true,
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
  // CLIENT SIDE VALIDATION
  // CHECK FOR EMPTY FIELDS
  const ifFormIsEmpty = ({ username, email, password, confirmPassword }) =>
    !username.length || !email.length || !password.length || !confirmPassword.length;
  // CHECK FOR PASSWORD MATCH AND LENGTH
  const isPasswordValid = ({ password, confirmPassword }) => {
    let error;
    password.length < 6 || confirmPassword.length < 6
      ? (error = 'Password is too short')
      : password !== confirmPassword
      ? (error = 'Password should match')
      : (error = null);
    return error;
  };
  // ISFORMVALID DEFINED HERE
  const isFormValid = () => {
    let error;
    if (ifFormIsEmpty(state)) {
      error = { message: 'Fields must have value' };
      setState((prevState) => {
        return { ...prevState, errors: prevState.errors.concat(error.message) };
      });
      return false;
    } else if (isPasswordValid(state)) {
      error = isPasswordValid(state);
      setState((prevState) => {
        return { ...prevState, errors: prevState.errors.concat(error) };
      });
      return false;
    } else {
      return true;
    }
  };
  // HANDLESUBMIT DEFINED HERE
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setState((prevState) => {
        return { ...prevState, loading: true };
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((createdUser) => {
          console.log(createdUser);
          const generator = new AvatarGenerator();
          createdUser.user
            .updateProfile({
              displayName: state.username,
              photoURL: generator.generateRandomAvatar(createdUser.user.uid),
            })
            .then(() => {
              saveUser(createdUser.user);
              console.log('Saved user');
              setState((prevState) => {
                return { ...prevState, loading: false };
              });
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

  // SAVE USER TO DATABASE
  const saveUser = (createdUser) => {
    return state.userRef.child(createdUser.uid).set({
      name: createdUser.displayName,
      email: createdUser.email,
      avatar: createdUser.photoURL,
      age: null,
      bio: '',
      workAt: '',
      address: {
        country: '',
        city: '',
      },
    });
  };
  // HANDLING CHECKBOX
  const handleCheckbox = () => {
    const checked = state.checked;
    setState((prevState) => {
      return { ...prevState, checked: !checked };
    });
  };
  // HANDLE SHOW&HIDE PASSWORD
  const handleShowPassword = () => {
    let passwordType = state.passwordType;
    setState((prevState) => {
      return { ...prevState, passwordType: !passwordType };
    });
  };

  // Google Sign In
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        saveUser(response.user);
      })
      .catch((err) => {
        setState((prevState) => {
          return {
            ...prevState,
            errors: state.errors.concat(err.message),
          };
        });
      });
  };
  // Facebook Sign In
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        saveUser(response.user);
      })
      .catch((err) => {
        setState((prevState) => {
          return {
            ...prevState,
            errors: state.errors.concat(err.message),
          };
        });
      });
  };

  const fullName = useRef(null);
  useEffect(() => {
    fullName.current.focus();
  }, []);
  // Only showPasswordIcon on password have value
  const showOnPass = () => {
    let display = { display: 'none' };
    if (state.password.length) {
      display.display = 'inline-block';
    }
    return display;
  };

  // DOM RENDERING
  const displayErrors = () => {
    return state.errors.length && state.errors.toString().includes('network')
      ? 'Oops Bad Network Connection or Settimeout'
      : state.errors;
  };
  return (
    // Register
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
      <div className='Register'>
        {/* Register Title*/}
        <h1 className='Register__title'>Register</h1>
        {/* Register Form*/}
        <form className='Register__form' onSubmit={handleSubmit}>
          {/* Register Input Group*/}
          <div className='Register__inputGroup'>
            <input
              className='Register__input'
              placeholder='Full Name'
              name='username'
              onChange={handleChange}
              ref={fullName}
            />
            <input
              className='Register__input'
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
            <input
              className='Register__input'
              placeholder='Password'
              name='password'
              type={state.passwordType ? 'password' : 'text'}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className='Register__showPassword'
              onClick={handleShowPassword}
              style={showOnPass()}
            />
            <input
              className='Register__input'
              placeholder='Confirm Password'
              name='confirmPassword'
              type='password'
              type={state.passwordType ? 'password' : 'text'}
              onChange={handleChange}
            />
          </div>
          {/* Register Social SignUp*/}
          <div className='Register__socialSignUp'>
            {/* Register Social Icon Group*/}
            <h2 className='Register__socialSignUp_title'>Connect With</h2>
            <div className='Register__iconGroup'>
              <div className='Register__icon Register__icon_facebook'>
                <FontAwesomeIcon icon={faFacebookF} onClick={signInWithFacebook} />
              </div>

              <div className='Register__icon Register__icon_google'>
                <FontAwesomeIcon icon={faGooglePlusG} onClick={signInWithGoogle} />
              </div>

              <div className='Register__icon Register__icon_twitter'>
                <FontAwesomeIcon icon={faTwitter} />
              </div>
            </div>
          </div>
          {/* Register Stay SignedIn*/}
          <div className='Register__staySigned'>
            <input
              type='checkbox'
              defaultChecked={state.checked}
              onClick={handleCheckbox}
              id='checkbox'
            />
            <label className='Register__staySigned_text' htmlFor='checkbox'>
              Remember Password
            </label>
          </div>
          {/* Register Button*/}
          <button
            className='Register__button'
            type='button'
            onClick={handleSubmit}
            disabled={state.errors.length}
          >
            {state.loading ? <ButtonLoader /> : 'Register '}
          </button>
          {/* {state.errors.length <= 0 && ( */}
          <span
            className='Register__span'
            style={{ opacity: state.errors.length > 0 ? 0 : 100 }}
          >
            Already have an account <Link to='login'>Log in</Link>
          </span>
          {/* Register Errors*/}
          {state.errors ? (
            <p className='Register__error'>
              {state.errors.length > 0 && displayErrors()}
            </p>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from 'react';
import './Dropdown.scss';
import { Link } from 'react-router-dom';

const Dropdown = ({ handleProfileModal, handleSignOut }) => {
  return (
    <React.Fragment>
      <div className='Dropdown'>
        <Link to='/' className='Dropdown__item' onClick={handleProfileModal}>
          Edit Profile
        </Link>
        <Link to='/register' className='Dropdown__item' onClick={handleSignOut}>
          Sign Out
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Dropdown;

import React from 'react';
import './ResetPasswordSuccess.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const ResetPasswordSuccess = (props) => {
  return (
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
      <div className='ResetPasswordSucess'>
        <h1 className='ResetPasswordSucess__title'>Reset Email Successfully Sent</h1>
        <FontAwesomeIcon icon={faCheckCircle} className='ResetPasswordSucess__icon' />
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;

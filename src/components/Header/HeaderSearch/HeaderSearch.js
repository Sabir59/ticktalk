import React from 'react';
import './HeaderSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const HeaderSearch = () => {
  return (
    <div className='HeaderSearch'>
      {/* Header Search Form */}
      <form className={'HeaderSearch__form'}>
        <label className={'HeaderSearch__label'}>
          <input className={'HeaderSearch__input'} placeholder='Search ' />
          <FontAwesomeIcon icon={faSearch} className={'HeaderSearch__icon'} />
        </label>
      </form>
    </div>
  );
};

export default HeaderSearch;

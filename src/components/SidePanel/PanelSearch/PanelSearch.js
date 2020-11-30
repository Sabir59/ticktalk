import React from 'react';
import './PanelSearch.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PanelSearch = ({handleSearch}) => {
  return (
    <React.Fragment>
      {/* Header Search Form */}
      <form className='PanelSearch'>
        <label className='PanelSearch__label'>
          <input className='PanelSearch__input' placeholder='Search' 
          onChange={handleSearch }
          />
          <FontAwesomeIcon icon={faSearch} className='PanelSearch__icon' />
        </label>
      </form>
    </React.Fragment>
  );
};

export default PanelSearch;

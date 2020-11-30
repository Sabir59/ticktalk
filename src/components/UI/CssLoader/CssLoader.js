import React from 'react';
import classes from './CssLoader.module.scss';

const CssLoader = () => (
  <div className={classes.bg}>
    <div className={classes.loader}>
      <div className={classes.loader__bar}></div>
      <div className={classes.loader__bar}></div>
      <div className={classes.loader__bar}></div>
      <div className={classes.loader__bar}></div>
      <div className={classes.loader__bar}></div>
      <div className={classes.loader__ball}></div>
    </div>
  </div>
);

export default CssLoader;

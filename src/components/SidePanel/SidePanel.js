import React, { Component } from 'react';
import  './SidePanel.scss';
import PanelUser from './PanelUser/PanelUser';
import {connect} from 'react-redux'

class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div className='SidePanel'>
        <div className='RecentUserPanel'>
        <PanelUser currentUser={currentUser} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default 
connect(mapStateToProps)(SidePanel);

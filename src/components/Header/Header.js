import React, { Component } from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown/Dropdown';
import ProfileModal from './ProfileModal/ProfileModal';
import { connect } from 'react-redux';
import firebase from '../../firebase';

class Header extends Component {
  state = {
    toggler: false,
    profileModal: false,
    user: this.props.currentUser,
  };

  handleDropdown = () => {
    const toggler = this.state.toggler;
    this.setState({ toggler: !toggler });
  };

  handleProfileModal = () => {
    const profileModal = this.state.profileModal;
    this.setState({ profileModal: !profileModal });
    this.setState({ toggler: false });
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((user) => {
        console.log(user + 'Sign Out');
      });
  };

  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <header className={'Header'}>
          {/* <HeaderSearch /> */}
          <nav className='Header__userNav'>
            <div className='Header__user'>
              <img
                src={currentUser && currentUser.photoURL}
                className='Header__userPhoto'
              />
              <div className='Header__userName'>
                {currentUser && currentUser.displayName}
              </div>
            </div>
            <FontAwesomeIcon
              icon={faCaretDown}
              className='Header__icon'
              onClick={this.handleDropdown}
            />
          </nav>

          {this.state.toggler ? (
            <Dropdown
              handleProfileModal={this.handleProfileModal}
              handleSignOut={this.handleSignOut}
            />
          ) : null}
        </header>
        {this.state.profileModal ? (
          <ProfileModal
            handleProfileModal={this.handleProfileModal}
            currentUser={currentUser}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);

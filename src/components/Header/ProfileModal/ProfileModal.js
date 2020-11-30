import React, { Component, useRef } from 'react';
import './ProfileModal.scss';
import firebase from '../../../firebase';

class ProfileModal extends Component {
  state = {
    file: null,
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    uploadedImage: null,
    newName: '',
    usersRef: firebase.database().ref('users'),
    users: null,
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    const totalUsers = [];
    this.state.usersRef.on('child_added', (snap) => {
      totalUsers.push(snap.val());
      this.setState({
        users: totalUsers,
      });
    });
  };

  // addFile
  handleAvatar = (event) => {
    const file = event.target.files[0];
    this.setState({ file });
    this.state.storageRef
      .child(`avatars/user-${useRef.uid}`)
      .put(file)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadUrl) => {
          this.setState({ uploadedImage: downloadUrl });
        });
      });
  };

  handleName = (event) => this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.userRef.updateProfile({
      photoURL: this.state.uploadedImage,
      displayName: this.state.newName,
    });
    this.props.handleProfileModal();
  };

  render() {
    const us = this.state.users && this.state.users.map((user) => <div>{user}</div>);
    console.log(us);
    return (
      <div className='ProfileModal'>
        <form className='Profile__form' onSubmit={this.handleSubmit}>
          <label htmlFor='profileUpload' className='ProfileModal__label'>
            <div className='ProfileModal__photoBox'>
              <img
                src={this.props.currentUser && this.props.currentUser.photoURL}
                className='ProfileModal__photo'
              />
              <div>upload</div>
            </div>
            <input type='file' id='profileUpload' onChange={this.handleAvatar} />
          </label>
          <input
            placeholder='change name'
            className='ProfileModal__input'
            onChange={this.handleName}
            name='newName'
          />
          <div className='ProfileModal__buttonGroup'>
            <button
              type='button'
              className='ProfileModal__button'
              onClick={this.props.handleProfileModal}
            >
              cancel
            </button>
            <button className='ProfileModal__button' onSubmit={this.handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ProfileModal;

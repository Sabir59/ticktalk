import React from 'react';
import firebase from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './MessageForm.scss';

class MessageForm extends React.Component {
  state = {
    message: '',
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
      content: this.state.message,
    };
    return message;
  };

  sendMessage = (event) => {
    event.preventDefault();
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: 'Add a message' }),
      });
    }
  };

  render() {
    const { errors, message, loading } = this.state;

    return (
      <div className='MessageForm'>
        <form className='MessageForm__form' onSubmit={this.sendMessage}>
          <label className='MessageForm__label'>
            <input
              className='MessageForm__input'
              name='message'
              onChange={this.handleChange}
              value={message}
              placeholder='Write your message'
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className='MessageForm__icon'
              onClick={this.sendMessage}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default MessageForm;

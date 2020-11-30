import React from 'react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';
import Message from './Message/Message';
import './Messages.scss';

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = (channelId) => {
    this.addMessageListener(channelId);
  };

  addMessageListener = (channelId) => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false,
      });
    });
  };

  displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message key={message.timestamp} message={message} user={this.state.user} />
    ));

  render() {
    const { messagesRef, messages, channel, user } = this.state;
    console.log(this.state.user);
    return (
      <div className='Messages'>
        {channel ? <MessagesHeader currentChannel={channel} currentUser={user} /> : ''}
        <div className='Messages__message'>{this.displayMessages(messages)}</div>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          //  getMessagesRef={messagesRef}
        />
      </div>
    );
  }
}

export default Messages;

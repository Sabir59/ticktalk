import React from "react";
import moment from "moment";
import './Message.scss'

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "Message__text ownMessage" : "Message__text";
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <div className="Message">
  <img className="Message__photo"
  src={message.user.avatar}/>
  <p className={isOwnMessage(message,user)}>
  {message.content}
  </p>
  <div className="Message__timing">
  {timeFromNow(message.timestamp)}
  </div>
</div>
);

export default Message;


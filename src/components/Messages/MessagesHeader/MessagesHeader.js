import React, { Component } from 'react';
import './MessagesHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faPhone,
  faEnvelope,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

class ConversationHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <header className='ConversationHeader'>
          {/* ConversationHeader User */}
          <div className='ConversationHeader__user'>
            <img
              src={this.props.currentChannel&&this.props.currentChannel.avatar}
              alt='User Photo'
              className='ConversationHeader__photo'
            />
            <h3 className='ConversationHeader__name'>{this.props.currentChannel&&this.props.currentChannel.name}</h3>
          </div>
          {/* ConversationHeader CTA */}
          {/* <div className='ConversationHeader__cta'>
            <FontAwesomeIcon
              icon={faEnvelope}
              className='ConversationHeader__icon'
            />
            <FontAwesomeIcon
              icon={faPhone}
              className='ConversationHeader__icon'
            />
            <FontAwesomeIcon
              icon={faVideo}
              className='ConversationHeader__icon'
            />
          </div> */}

          {/* Conversation closed */}
          {/* <div className='ConversationHeader__closer'>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className='ConversationHeader__icon'
            />
          </div> */}
          {/* <div> */}
            {/* <form>
              <input
                placeholder='Search messages'
                className='ConversationHeader__search'
                id='search'
                onChange={handleSearchChange}
              />
              <label htmlFor='search'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className={ConversationHeader__icon_search}
                />
              </label>
            </form> */}
          {/* </div> */}
        </header>
      </React.Fragment>
    );
  }
}

export default ConversationHeader;

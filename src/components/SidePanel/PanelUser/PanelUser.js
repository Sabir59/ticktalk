import React, { Component } from 'react';
import './PanelUser.scss';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { setCurrentChannel, setPrivateChannel } from '../../../store/actions/index';
import PanelSearch from '../PanelSearch/PanelSearch';

class PanelUser extends Component {
  state = {
    user: this.props.currentUser,
    users: [],

    userRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenseRef: firebase.database().ref('presence'),

    searchTerm: '',
    seacrhLoading: false,
    searchResults: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListners(this.state.user.uid);
    }

    // console.log(this.state.userRef);
    // console.log(this.state.connectedRef);
  }

  addListners = (currentUserUid) => {
    let loadedUsers = [];

    this.state.userRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';

        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on('value', (snap) => {
      console.log(snap.val());
      if (snap.val() === true) {
        const ref = this.state.presenseRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });

    this.state.presenseRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        //add status to user
        this.addStatusToUser(snap.key);
      }
    });

    this.state.presenseRef.on('child_removed', (snap) => {
      if (currentUserUid !== snap.key) {
        //add status to user
        this.addStatusToUser(snap.key, false);
      }
    });
  };

  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`;
      }
      return acc.concat(user);
    }, []);

    this.setState({ users: updatedUsers });
  };

  isUserOnline = (user) => user.status === 'online';

  changeChannel = (user) => {
    const channelId = this.getChannelId(user.uid);

    const channelData = {
      id: channelId,
      name: user.name,
    };

    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
  };

  getChannelId = (userId) => {
    const currentUserId = this.state.user.uid;

    console.log(userId < currentUserId);
    console.log(currentUserId);

    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  handleSearch = (event) => {
    this.setState(
      {
        searchTerm: event.target.value,
        seacrhLoading: true,
      },
      () => this.handleSearchMessages()
    );
  };

  handleSearchMessages = () => {
    const channelMessages = [...this.state.users];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = channelMessages.reduce((acc, user) => {
      if (user.name.match(regex)) {
        acc.push(user);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
  };

  displayUsers = (users) =>
    users.map((user) => (
      <div
        className={this.isUserOnline(user) ? 'PanelUser ' : 'PanelUser'}
        key={user.uid}
        onClick={() => this.changeChannel(user)}
      >
        <img src={user.avatar} alt='user' className='PanelUser__photo' />
        <div className='PanelUser__details'>
          <h3 className='PanelUser__name'>{user.name}</h3>
        </div>
        <FontAwesomeIcon
          icon={faCircle}
          className={this.isUserOnline(user) ? 'green' : 'red'}
        />
      </div>
    ));
  render() {
    const { users, searchTerm, searchResults } = this.state;
    return (
      <React.Fragment>
        <PanelSearch handleSearch={this.handleSearch} />
        {searchTerm ? this.displayUsers(searchResults) : this.displayUsers(users)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentChannel, setPrivateChannel })(
  PanelUser
);

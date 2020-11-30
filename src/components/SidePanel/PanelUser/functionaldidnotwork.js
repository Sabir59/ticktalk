import React, { useEffect, useRef, useState } from 'react';
import './PanelUser.scss';
import firebase from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../../store/actions/index';
import PanelSearch from '../PanelSearch/PanelSearch';

const PanelUser = (props) => {
  const [state, setState] = useState({
    user: props.currentUser,
    users: [],

    usersRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence'),
  });

  useEffect(() => {
    if (state !== setState) {
      return loadingUsersListener(state.user.uid);
    }
  });

  const loadingUsersListener = (currentUserUid) => {
    const { usersRef, connectedRef, presenceRef } = state;
    let loadedUsers = [];

    usersRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';

        loadedUsers.push(user);
        setState((prevState) => {
          return { ...prevState, users: loadedUsers };
        });
      }

      connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
          const ref = presenceRef.child(currentUserUid);
          ref.set(true);
          ref.onDisconnect().remove((err) => {
            if (err !== null) {
              console.log(err);
            }
          });
        }
      });

      presenceRef.on('child_added', (snap) => {
        if (currentUserUid !== snap.key) {
          addStatusToUser(snap.key);
        }
      });
      presenceRef.on('child_removed', (snap) => {
        if (currentUserUid !== snap.key) {
          addStatusToUser(snap.key, false);
        }
      });
    });
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = state.users.reduce((acc, user) => {
      if (user.uid !== userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`;
      }
      return acc.concat(user);
    }, []);

    setState((prevState) => {
      return { ...prevState, users: updatedUsers };
    });
  };

  const isUserOnline = (user) => user.status === 'online';

  // Changing Users
  const changeChannel = (user) => {
    const channelId = getChannelId(user.uid);

    const channelData = {
      id: channelId,
      name: user.name,
    };

    props.setCurrentChannel(channelData);
    props.setPrivateChannel(true);
  };

  const getChannelId = (userId) => {
    const currentUserId = state.user.uid;

    console.log(userId < currentUserId);
    console.log(currentUserId);

    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  const displayUsers = () => {
    return (
      state.users.length > 0 &&
      state.users.map((user) => {
        return (
          <div className='PanelUser' key={user.uid} onClick={() => changeChannel(user)}>
            <img src={user.avatar} alt='user' className='PanelUser__photo' />
            <div className='PanelUser__details'>
              <h3 className='PanelUser__name'>{user.name}</h3>
            </div>
            <div>{user.status}</div>
            <FontAwesomeIcon
              icon={faCircle}
              className={`${isUserOnline(state.user) ? 'green' : 'red'}`}
            />
          </div>
        );
      })
    );
  };
  return (
    <div>
      <PanelSearch />

      {displayUsers()}
    </div>
  );
};

export default connect(null, { setCurrentChannel, setPrivateChannel })(PanelUser);

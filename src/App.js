import React from 'react';
import Header from './components/Header/Header';
import './App.scss';
import { connect } from 'react-redux';
import SidePanel from './components/SidePanel/SidePanel'
import Messages from './components/Messages/Messages'

const App= ({currentUser,currentChannel,isPrivateChannel})=>{
    return (
      <div className='App'>
          <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
         <div className="App__content">
           <Header/>
           <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
           />
          </div>
      </div>
    );
  }

  const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
  });
  
  export default connect(mapStateToProps)(App);

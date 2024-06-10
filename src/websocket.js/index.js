import {config} from '../config';
const BASE_URI = `${config.apiBaseUrl?.[config.ENV]}/msg`;

import {io} from 'socket.io-client';

class Client {
  constructor(token) {
    this.baseUrl = BASE_URI;
    this.auth_token = token;
    this.socket = io(`${this.baseUrl}`, {
      query: {
        auth_token: this.auth_token,
      },
      // reconnection: true, // Enable reconnection
      // reconnectionAttempts: 5, // Number of reconnection attempts
      // reconnectionDelay: 1000, // Delay between each reconnection attempt (in ms)
    });

    this._initSocketListeners();
  }
  create() {}

  _initSocketListeners() {
    this.socket.on('connect', socket => {
      console.log('Successfully connected!', socket?.id);
    });
  }

  connectionError() {
    this.socket.on('reconnect', attemptNumber => {
      console.log('Reconnected after attempt', attemptNumber);
    });

    this.socket.on('reconnecting', attemptNumber => {
      console.log('Attempting to reconnect (attempt', attemptNumber, ')');
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Reconnection failed');
    });
    this.socket.on('connect_error', err => {
      console.log('Connection Error:', err);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  }

  leaveGroup(groupId) {
    this.socket.emit('leaveGroup', groupId);
  }
  disconnect() {
    let eventArray = [
      'sendMessage',
      'connect',
      'disconnect',
      'reconnect',
      'reconnecting',
      'reconnect_failed',
      'connect_error',
      'typing',
      'memberLeft',
      'stopTyping',
      'userStoppedTyping',
      'receiveMessage',
      'userTyping',
    ];
    eventArray.forEach(event => this.socket.off(event));

    this.socket.disconnect();
  }

  joinGroup(joinData) {
    console.log('join group with: ', joinData);
    this.socket.emit('joinGroup', joinData);
  }
  memberJoined(fun) {
    console.log('fun ::', fun);
    this.socket.on('memberJoined', arg => {
      console.log('memberJoined', arg, fun);
      fun(arg);
    });
  }

  sendMessage(arg) {
    console.log('message send to server', arg);
    this.socket.emit('sendMessage', arg);
  }

  receiveMessage(fun) {
    this.socket.on('receiveMessage', arg => {
      console.log(arg, 'received message');
      fun(arg);
    });
  }

  typeing(groupId) {
    this.socket.emit('typing', groupId);
  }
  userTyping(fun) {
    this.socket.on('userTyping', data => {
      fun(data);
    });
  }

  stopTyping(groupId) {
    this.socket.emit('stopTyping', groupId);
  }
  userStopTypeing(fun) {
    this.socket.on('userStoppedTyping', data => {
      fun(data);
    });
  }
  memberLeft(fun) {
    this.socket.on('memberLeft', data => fun(data));
  }
}

// export { client as Client };
export default Client;

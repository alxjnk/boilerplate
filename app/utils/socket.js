import openSocket from 'socket.io-client';
const socket = openSocket('http://jobsdone.pro:9000');

export default socket;


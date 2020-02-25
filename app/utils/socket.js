import openSocket from 'socket.io-client';
const  socket = openSocket('http://jobsdone.pro:9000');

export const subscribeToMessage = () => {
   socket.on('new_message', messages => {
      console.log(messages)
   });
}
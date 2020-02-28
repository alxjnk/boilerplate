import openSocket from 'socket.io-client';
const socket = openSocket('http://jobsdone.pro:9000');

export default socket;

export const subscribeToMessage = (action) => {
   socket.on('new_message', message => {
      action(message.record);
   });
};

export const subscribeToBooking = (action) => {
   socket.on('new_booking', booking => {
      console.log(booking)
      action(booking.record);
   });
};

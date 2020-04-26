const getFieldValues = (arr, field) => {
   const values = [];

   arr.forEach(elem => {
      if (!~values.indexOf(elem[field])) values.push(elem[field]);
   });

   return values;
};
// меняем статус сообщения new с true на false
export const changeMessagesStatus = (messages, fullName) => {
   return messages.map(message => {
      if (message['full_name'] === fullName) {
         message.new = false;
      }

      return message;
   })
};

export const sortMessages = messages => {
   let sortedMessages = {};
   const tempSortedMessages = {};
   const users = getFieldValues(messages, 'full_name');

   users.forEach(user => {
      messages.forEach(message => {
         if (message.full_name === user) {
            if (!(user in tempSortedMessages)) {
               tempSortedMessages[user] = [];
            }						
            tempSortedMessages[user].push(message);
         };
      });
      tempSortedMessages[user].reverse();
   });
   
   if (Object.keys(tempSortedMessages)) {
      Object.keys(tempSortedMessages).sort((a, b) => {
         return new Date(tempSortedMessages[b][0]['createdAt']) * 1 - new Date(tempSortedMessages[a][0]['createdAt']) * 1;
      }).forEach(field => {
         sortedMessages[field] = tempSortedMessages[field];
      })
   };

   return sortedMessages;
};

export const sortBookingsData = (bookingsData, today) => {
   const sortedBookingsData = {};
   const rooms = getFieldValues(bookingsData, 'room');

   rooms.forEach(room => {
      bookingsData.forEach(booking => {
         const newBooking = { ...booking };
         if (booking.room === room && (new Date(newBooking.departure) * 1) >= today) {
            if (!(room in sortedBookingsData)) {
               sortedBookingsData[room] = [];
            }
            if (new Date(newBooking.arrival) * 1 <= today) {
               newBooking['start'] = 0;
               newBooking['startDay'] = new Date(today).getDate();
            } else {
               newBooking['start'] = Math.ceil(new Date(newBooking.arrival) * 1 / 24 / 60 / 60 / 1000 - today / 24 / 60 / 60 / 1000);
               newBooking['startDay'] = new Date(newBooking.arrival).getDate();
            }
            newBooking['end'] = Math.ceil(new Date(newBooking.departure) * 1 / 24 / 60 / 60 / 1000 - today / 24 / 60 / 60 / 1000);
            newBooking['endDay'] = new Date(newBooking.departure).getDate();
            sortedBookingsData[room].push(newBooking);
         };
      });

      if (sortedBookingsData[room]) {
         sortedBookingsData[room].sort((a, b) => {
            return new Date(b.arrival) * 1 - new Date(a.arrival) * 1;
         });
      }
   });

   return sortedBookingsData;
};

export const checkInBookings = (bookings, date, today) => {
   let checkInBookings = [ ...bookings ];

   checkInBookings = checkInBookings.filter((item) => {
      return item.arrival >= today && item.arrival <= date; 
   });
   
   return checkInBookings;
};

export const checkOutBookings = (bookings, date, today) => {
   let checkOutBookings = [ ...bookings ];
   
   checkOutBookings = checkOutBookings.filter((item) => {
      return item.departure >= today && item.departure <= date; 
   });

   return checkOutBookings;
};

export const checkInBookingsSorter = (bookings) => {
   let sortedBookings = [ ...bookings ];

   sortedBookings.sort((a, b) => {
      return new Date(a.arrival) * 1 - new Date(b.arrival) * 1; 
   });
   
   return sortedBookings;
};

export const checkOutBookingsSorter = (bookings) => {
   let sortedBookings = [ ...bookings ];

   sortedBookings.sort((a, b) => {
      return new Date(a.departure) * 1 - new Date(b.departure) * 1; 
   });
   
   return sortedBookings;
};
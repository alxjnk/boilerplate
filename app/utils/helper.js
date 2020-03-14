const getFieldValues = (arr, field) => {
   const values = [];

   arr.forEach(elem => {
      if (!~values.indexOf(elem[field])) values.push(elem[field]);
   });

   return values;
};

export const sortEventsList = eventsList => {
   const sortedEventsList = {};
   const users = getFieldValues(eventsList, 'full_name');

   users.forEach(user => {
      eventsList.forEach(event => {
         if (event.full_name === user) {
            if (!(user in sortedEventsList)) {
               sortedEventsList[user] = [];
            }						
            sortedEventsList[user].push(event);
         };
      });
   });

   return sortedEventsList;
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
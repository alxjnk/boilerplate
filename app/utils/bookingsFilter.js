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
export const checkInSorter = (bookings) => {
   let sortedBookings = [ ...bookings ];

   sortedBookings.sort((a, b) => {
      return new Date(a.arrival) * 1 - new Date(b.arrival) * 1; 
   });
   
   return sortedBookings;
};

export const checkOutSorter = (bookings) => {
   let sortedBookings = [ ...bookings ];

   sortedBookings.sort((a, b) => {
      return new Date(a.departure) * 1 - new Date(b.departure) * 1; 
   });
   
   return sortedBookings;
};
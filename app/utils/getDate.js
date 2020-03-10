const dayDelay = 5;
const millisecondsDelay = dayDelay * 24 * 60 * 60 * 1000;

export const today = () => {
   return new Date() * 1;
};

export const date = () => {
   return new Date() * 1 + millisecondsDelay;
};

export const months = {
   0: 'January',
   1: 'February',
   2: 'March',
   3: 'April',
   4: 'May',
   5: 'June',
   6: 'July',
   7: 'August',
   8: 'September',
   9: 'October',
   10: 'November',
   11: 'December'
};
const dayDelay = 5;

export const dayInMilliseconds = 24 * 60 * 60 * 1000;

export const todayInMilliseconds = () => {
   return new Date() * 1;
};

export const dateWithDalayInMilliseconds = () => {
   return new Date() * 1 + dayDelay * dayInMilliseconds;
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
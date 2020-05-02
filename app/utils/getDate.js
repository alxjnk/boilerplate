const dayDelay = 5;

export const dayInMilliseconds = 24 * 60 * 60 * 1000;

export const todayInMilliseconds = () => {
   return new Date() * 1;
};

export const dateWithDalayInMilliseconds = () => {
   return new Date() * 1 + dayDelay * dayInMilliseconds;
};

// функция, определяющая является ли выбранный год високосным
export const leapYear = (year) => {
   if (year % 4 === 0) {
      if (year % 100 !== 0) {
         return true;
      } else if (year % 400 === 0) {
         return true;
      }
   }

   return false;
};

export const months = {
   0: {
      amountDays: 31,
      monthName: "January"
   },
   1: {
      amountDays: 28,
      amountDaysLeap: 29,
      monthName: "February"
   },
   2: {
      amountDays: 31,
      monthName: "March"
   },
   3: {
      amountDays: 30,
      monthName: "April"
   },
   4: {
      amountDays: 31,
      monthName: "May"
   },
   5: {
      amountDays: 30,
      monthName: "June"
   },
   6: {
      amountDays: 31,
      monthName: "July"
   },
   7: {
      amountDays: 31,
      monthName: "August"
   },
   8: {
      amountDays: 30,
      monthName: "September"
   },
   9: {
      amountDays: 31,
      monthName: "October"
   },
   10: {
      amountDays: 30,
      monthName: "November"
   },
   11: {
      amountDays: 31,
      monthName: "December"
   }
};

export const getAmountDaysInMonth = monthNum => {
   const currentYear = new Date().getFullYear();
   
   if (leapYear(currentYear) && monthNum === 1) {
      return months[monthNum].amountDaysLeap
   } else {
      return months[monthNum].amountDays
   }
};

export const getPeriodLength = period => {
   const numDay = new Date(todayInMilliseconds()).getDate();
   const currentMonth = new Date(todayInMilliseconds()).getMonth();
   let periodLength = 0;
   
   for (let i = 0; i <= period; i++) {
      let daysInMonth = 0;
      if (i === 0) {
         daysInMonth = getAmountDaysInMonth(currentMonth) - numDay + 1;
      } else 
      if (i === period) {
         daysInMonth = numDay - 1;
      } else {
         daysInMonth = getAmountDaysInMonth(currentMonth + i);
      }
      periodLength += daysInMonth;
   }

   return periodLength;
};
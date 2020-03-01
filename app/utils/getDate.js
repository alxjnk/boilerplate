const dayDelay = 5;
const millisecondsDelay = dayDelay * 24 * 60 * 60 * 1000;

export const today = () => {
   return new Date() * 1;
};

export const date = () => {
   return new Date() * 1 + millisecondsDelay;
};
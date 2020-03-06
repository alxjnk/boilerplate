const getFieldValues = (arr, field) => {
   const values = [];

   arr.forEach(elem => {
      if (!~values.indexOf(elem[field])) values.push(elem[field]);
   });

   return values;
};

export const sortEventsList = eventsList => {
   const sortedEventsList = {};
   const platforms = getFieldValues(eventsList, 'platform');
   const users = getFieldValues(eventsList, 'full_name');

   platforms.forEach(platform => {
      sortedEventsList[platform] = {};

      users.forEach(user => {
         eventsList.forEach(event => {
            if (event.platform === platform && event.full_name === user) {
               if (!(user in sortedEventsList[platform])) {
                  sortedEventsList[platform][user] = [];
               }						
               sortedEventsList[platform][user].push(event);
            };
         });
      });
   });

   return sortedEventsList;
};
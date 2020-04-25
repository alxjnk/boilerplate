export const sendData = (messages, path) => {
   return fetch(`${path}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(messages)
   })
      .then(response => {
         if (response.status === 200) {
            return messages;
         }
         return [];
      })
};
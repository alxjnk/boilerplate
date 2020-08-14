export const sendData = (messages, path, method = 'POST') => {
   return fetch(`${path}`, {
      method: method,
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
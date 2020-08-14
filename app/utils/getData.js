export const getData = path => {

   return fetch(`${path}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      }
   })
      .then(response => response.json())
};
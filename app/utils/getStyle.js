export const getStyle = (styles, elem) => {
   let style = '';

   for (let key in styles[elem]) {
      style += key + `: ` + styles[elem][key] + `; `;
   };

   return (`.${elem} {
               ${style}
            }`);
};
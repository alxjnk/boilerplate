export const toColor = num => {
	let color = num.toString(16);
	color = `000000${color}`.slice(-6);
	color = `#${color}`;
	return color;
};


export const colorPalette = [
  '#91c4dd', '#1d223e', '#eeb549', '#6e70c5', '#505492', '#ff5a5a', '#dff48e', '#5dd495', '#54bad0', '#eacca7', '#7a5536', '#1e492a',
  '#b4e5b5', '#255a96', '#000000', '#515151', '#3f5fb8', '#ffe800', '#b4e5b5', '#255a96', '#000000', '#515151', '#3f5fb8', '#ffe800',
  '#327ba7', '#6400af', '#3c59c1', '#e07d7d', '#a93a3a', '#2e8982', '#91c4dd', '#1d223e', '#ffd37e', '#eeb549', '#6e70c5', '#ff5a5a',
  '#5dd495', '#4cbfe1', '#a93a3a', '#2e8982', '#5e9e70', '#63a759', '#327ba7', '#6400af', '#54bad0', '#eacca7', '#7a5536', '#1e492a',
];

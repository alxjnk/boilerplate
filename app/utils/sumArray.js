// use: [].reduce((accumulator, currentValue) => sumArray.call(accumulator, currentValue.data));

export default function(arr) {
	const sum = [];
	if (arr != null && this.length === arr.length) {
		for (let i = 0; i < arr.length; i++) {
			sum.push(parseFloat(this[i]) + parseFloat(arr[i]));
		}
	}
	return sum;
}

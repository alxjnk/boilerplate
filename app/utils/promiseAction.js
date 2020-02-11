export function makePromiseAction(dispatch, action) {
	return new Promise((resolve, reject) => {
		dispatch({
			...action,
			promise: {
				resolve,
				reject,
			},
		});
	});
}

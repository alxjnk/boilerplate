const fallbackCopyTextToClipboard = text =>
	new Promise((resolve, reject) => {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		const successful = document.execCommand('copy');
		document.body.removeChild(textArea);
		if (successful) {
			resolve(text);
		} else {
			reject(new Error('Ошибка копирования!'));
		}
	});

export const copyTextToClipboard = text =>
	new Promise((resolve, reject) => {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text)
				.then(r => resolve(r))
				.catch(e => reject(e));
		} else {
			navigator.clipboard
				.writeText(text)
				.then(() => resolve(text))
				.catch(() => reject(new Error('Ошибка копирования!')));
		}
	});

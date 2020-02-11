import { mimeTypes } from '../variables/mimeTypes';

export default function fileDownload(data, filename, mime, bom) {
	const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
	const blob = new Blob(blobData, { type: mimeTypes[mime] });
	if (typeof window.navigator.msSaveBlob !== 'undefined') {
		window.navigator.msSaveBlob(blob, `${filename}.${mime}`);
	} else {
		const blobURL = window.URL.createObjectURL(blob);
		const tempLink = document.createElement('a');
		tempLink.style.display = 'none';
		tempLink.href = blobURL;
		tempLink.setAttribute('download', `${filename}.${mime}`);

		if (typeof tempLink.download === 'undefined') {
			tempLink.setAttribute('target', '_blank');
		}

		document.body.appendChild(tempLink);
		tempLink.click();
		setTimeout(function() {
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(blobURL);
		}, 0);
	}
}

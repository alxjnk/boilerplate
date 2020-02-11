import toaster from 'toasted-notes';
import React from 'react';

export default function notify(position = 'bottom', text, duration = 2000, type = 'success') {
	toaster.notify(
		({ onClose }) => (
			<div type={type} onClose={onClose}>
				{text}
			</div>
		),
		{
			position,
			duration,
		},
	);
}

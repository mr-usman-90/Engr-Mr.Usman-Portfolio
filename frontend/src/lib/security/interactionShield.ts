declare global {
	interface Window {
		__interactionShieldReady?: boolean;
	}
}

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof Element)) return false;
	return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

export function setupInteractionShield(): void {
	if (typeof window === 'undefined' || window.__interactionShieldReady) return;

	const blockPointerAction = (event: Event) => {
		if (isEditableTarget(event.target)) return;
		event.preventDefault();
	};

	document.documentElement.setAttribute('translate', 'no');

	document.addEventListener('contextmenu', blockPointerAction, true);
	document.addEventListener('selectstart', blockPointerAction, true);
	document.addEventListener('dragstart', blockPointerAction, true);
	document.addEventListener('copy', blockPointerAction, true);
	document.addEventListener('cut', blockPointerAction, true);
	document.addEventListener('drop', blockPointerAction, true);

	document.addEventListener(
		'keydown',
		(event) => {
			const key = (event.key || '').toLowerCase();
			const ctrlOrMeta = event.ctrlKey || event.metaKey;

			const isInspectShortcut =
				event.key === 'F12' ||
				(ctrlOrMeta && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
				(ctrlOrMeta && key === 'u') ||
				(ctrlOrMeta && key === 's') ||
				(ctrlOrMeta && key === 'p');

			if (!isInspectShortcut) return;

			event.preventDefault();
			event.stopPropagation();
		},
		true,
	);

	document.addEventListener(
		'keydown',
		(event) => {
			const key = (event.key || '').toLowerCase();
			if (!((event.ctrlKey || event.metaKey) && event.shiftKey && key === 'k')) return;
			event.preventDefault();
			event.stopPropagation();
		},
		true,
	);

	document.querySelectorAll('img').forEach((img) => {
		img.setAttribute('draggable', 'false');
	});

	window.__interactionShieldReady = true;
}

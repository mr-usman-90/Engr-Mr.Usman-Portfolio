export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

export function getStoredTheme(): Theme {
	if (typeof localStorage === 'undefined') return 'dark';
	const value = localStorage.getItem(STORAGE_KEY);
	return value === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
	localStorage.setItem(STORAGE_KEY, theme);

	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) meta.setAttribute('content', theme === 'light' ? '#f3f4f6' : '#050505');
}

export function toggleTheme(current: Theme): Theme {
	const next: Theme = current === 'dark' ? 'light' : 'dark';
	applyTheme(next);
	return next;
}

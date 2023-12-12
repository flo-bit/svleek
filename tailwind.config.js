import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: { accent: colors.emerald } 		},
		hljs: {
			theme: 'tomorrow-night-bright'
		}
	},
	safelist: [
		{
			pattern: /hljs+/
		}
	],
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('tailwind-highlightjs')
	]
};

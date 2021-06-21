module.exports = {
	purge: {
		enabled: true,
		content: ['./**/*.php'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},
			colors: {
				primary: '#020a1c',
			},
		},
	},
	variants: {},
	plugins: [],
};

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// that is animation class
			animation: {
				fade: "fadeOut 4s ease-in-out",
			},

			// that is actual animation
			keyframes: (theme) => ({
				fadeOut: {
					"0%": {},
					"100%": {
						opacity: 0,
						visibility: "hidden",
					},
				},
			}),
		},
	},
	plugins: [],
};

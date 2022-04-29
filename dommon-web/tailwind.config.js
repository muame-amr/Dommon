module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			// that is animation class
			animation: {
				fade: "fadeOut 5s ease-in-out",
			},

			// that is actual animation
			keyframes: (theme) => ({
				fadeOut: {
					"0%": { backgroundColor: theme("colors.green.200") },
					"100%": {
						backgroundColor: theme("colors.transparent"),
						opacity: 0,
						visibility: "hidden",
					},
				},
			}),
		},
	},
	plugins: [],
};

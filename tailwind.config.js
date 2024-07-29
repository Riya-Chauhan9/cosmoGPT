// tailwind.config.js

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				bgMove: {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				opacity: {
					"0%, 100%": { opacity: 0.7 },
					"50%": { opacity: 0.3 },
				},
			},
			animation: {
				bgMove: "bgMove 15s ease infinite",
				opacity: "opacity 4s ease infinite",
			},
		},
	},
	plugins: [],
};

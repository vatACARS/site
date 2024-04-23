module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}"
	],
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				"gradient-xy": "gradient-xy 15s ease infinite"
			},
			keyframes: {
				"gradient-xy": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center"
					},
					"50%": {
						"background-size": "300% 300%",
						"background-position": "right center"
					}
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
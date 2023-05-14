export default {
	methods: {
		async keyboardPageHandler() {
			switch (event.keyCode) {
				case 39:
					console.debug('Loading next page via keyboard action.')

					await this.getNextPage()

					break

				case 37:
					console.debug('Loading previous page via keyboard action.')

					await this.getPrevPage()

					break
			}
		}
	},

	mounted() {
		// Navigation with keyboard
		document.addEventListener('keyup', this.keyboardPageHandler)
	},

	unmounted() {
		// Navigation with keyboard
		document.removeEventListener('keyup', this.keyboardPageHandler)
	}
}

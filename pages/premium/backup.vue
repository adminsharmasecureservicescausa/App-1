<template>
	<main class="mx-auto min-h-screen max-w-3xl p-4 sm:p-6 lg:p-8">
		<div class="space-y-4">
			<ContentSeparator title="Backup" />

			<div class="grid grid-cols-2 place-items-center">
				<button
					class="border-util focus-visible:focus-util flex w-28 flex-col items-center gap-2 rounded-lg bg-gray-900 p-3 text-gray-300"
					type="button"
					@click="createBackup"
				>
					<SaveIcon class="icon h-8 w-8" />

					<span class="text-md"> Create </span>
				</button>

				<!-- Hidden file input -->
				<input
					ref="file"
					accept="application/json"
					style="display: none"
					type="file"
					@change="restoreBackup"
				/>

				<button
					class="border-util focus-visible:focus-util flex w-28 flex-col items-center gap-2 rounded-lg bg-gray-900 p-3 text-gray-300"
					type="button"
					@click="$refs.file.click()"
				>
					<RotateCcwIcon class="icon h-8 w-8" />

					<span class="text-md"> Restore </span>
				</button>
			</div>

			<div>
				<h2 class="text-2xl font-semibold text-white">Backup to Google Drive</h2>

				<template v-if="$auth.loggedIn">
					<h3 class="text-xl font-semibold text-white">Logged in as {{ $auth.user.name }}</h3>

					<button
						class="focus-visible:focus-util border-util link rounded-lg bg-gray-900 p-2"
						type="button"
						@click="$auth.logout()"
					>
						Logout
					</button>
				</template>

				<template v-else>
					<div
						id="g_id_onload"
						:data-client_id="$config.GOOGLE_CLIENT_ID"
						data-auto_prompt="false"
						data-context="use"
						data-ux_mode="popup"
					></div>

					<div
						class="g_id_signin"
						data-logo_alignment="left"
						data-shape="pill"
						data-size="large"
						data-text="continue_with"
						data-theme="outline"
						data-type="standard"
					></div>
				</template>
			</div>
		</div>
	</main>
</template>

<script>
import { RotateCcwIcon, SaveIcon } from 'vue-feather-icons'
import { createStateFromStore, restoreStateToStore } from '~/assets/js/StateHelper'

export default {
	components: {
		SaveIcon,
		RotateCcwIcon
	},

	data() {
		return {}
	},

	head() {
		return {
			title: 'Backup',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Backup all your App data'
				}
			],
			script: [
				{
					src: 'https://accounts.google.com/gsi/client',
					async: true,
					defer: true
				}
			]
		}
	},

	// async mounted() {
	// 	const URL_PARAMS = new URLSearchParams(window.location.search)
	//
	// 	if (URL_PARAMS.has('code')) {
	// 		const CODE = URL_PARAMS.get('code')
	//
	// 		const CLIENT_ID = this.$config.GOOGLE_CLIENT_ID
	// 		const REDIRECT_URI = window.location.href
	//
	// 		const CLIENT = new google.auth.OAuth2(CLIENT_ID, '', REDIRECT_URI)
	//
	// 		const { tokens } = await CLIENT.getToken(CODE)
	//
	// 		CLIENT.setCredentials(tokens)
	//
	// 		/*const DRIVE = google.drive({version: 'v3', auth: CLIENT})
	//
	//     const FILE = await DRIVE.files.create({
	//       requestBody: {
	//         name: 'R34App_Backup.json',
	//         mimeType: 'application/json'
	//       },
	//       media: {
	//         mimeType: 'application/json',
	//         body: JSON.stringify(createStateFromStore(this.$store))
	//       }
	//     })
	//
	//     this.$toast.info('Backup created sucessfully')*/
	// 	}
	// },

	methods: {
		createBackup() {
			const CURRENT_DATE_STRING = new Date()
				.toLocaleString([], {
					timeZone: 'UTC',

					hour12: false,

					second: '2-digit',
					minute: '2-digit',
					hour: '2-digit',
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})
				.replaceAll(', ', '_')
				.replaceAll('/', '-')
				.replaceAll(':', '-')

			const STATE = createStateFromStore(this.$store)

			// Create JSON file
			const BLOB = new Blob([JSON.stringify(STATE)], {
				type: 'application/json'
			})

			const BLOB_OBJECT_URL = URL.createObjectURL(BLOB)

			// Create link
			const LINK = document.createElement('a')

			LINK.href = BLOB_OBJECT_URL
			LINK.target = '_blank'
			LINK.download = `R34App_${CURRENT_DATE_STRING}_Backup.json`
			LINK.style.display = 'none'

			// Download
			LINK.click()

			// Cleanup
			LINK.remove()
			URL.revokeObjectURL(BLOB_OBJECT_URL)

			this.$toast.info('Backup created sucessfully')
		},

		async restoreBackup() {
			const FILE = this.$refs.file.files[0]

			if (!FILE) {
				this.$toast.error('Please select a backup to restore')
				return
			}

			const RESTORED_STATE = JSON.parse(await FILE.text())

			restoreStateToStore(RESTORED_STATE, this.$store)

			this.$toast.info('Backup restored sucessfully')
		}

		// loginToGoogle() {
		// 	const CLIENT_ID = this.$config.GOOGLE_CLIENT_ID
		// 	const REDIRECT_URI = window.location.href
		//
		// 	const CLIENT = new google.auth.OAuth2(CLIENT_ID, '', REDIRECT_URI)
		//
		// 	const SCOPES = ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/drive.appdata']
		//
		// 	const AUTH_URL = CLIENT.generateAuthUrl({
		// 		access_type: 'offline',
		// 		scope: SCOPES
		// 	})
		//
		// 	window.location.href = AUTH_URL
		// }
	}
}
</script>

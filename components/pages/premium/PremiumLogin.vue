<template>
	<div class="material-container p-4">
		<form @submit.prevent="userLogin">
			<label
				class="mb-2 block text-lg font-medium leading-tight text-white"
				for="license-key"
			>
				License Key
			</label>

			<div class="mt-1 flex w-full flex-row items-center gap-1">
				<input
					id="license-key"
					v-model="login.password"
					autocomplete="current-password"
					class="focus-visible:focus-util material-container block w-10/12 grow appearance-none border-darkGray-100 bg-darkGray-700 p-2 text-sm font-light text-gray-300 outline-none"
					name="license-key"
					placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
					required
					type="text"
				/>

				<!-- Action -->
				<button
					class="focus-visible:focus-util ml-1 appearance-none rounded-full border-0 bg-gradient-to-br from-primary-400 to-accent-400"
					type="submit"
				>
					<span class="sr-only">Login</span>

					<chevron-right-icon
						aria-hidden="true"
						class="icon h-9 w-9"
					/>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { ChevronRightIcon } from 'vue-feather-icons'

export default {
	components: {
		ChevronRightIcon
	},

	data() {
		return {
			login: {
				password: ''
			}
		}
	},

	watch: {
		login: {
			handler() {
				this.login.password = this.login.password.trim()
			},

			deep: true
		}
	},

	methods: {
		...mapActions('premium', ['authenticate']),

		async userLogin() {
			await this.authenticate(this.login)
		}
	}
}
</script>

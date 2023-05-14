<script setup>
import { version } from '~/package.json'
import { useUserSettings } from '~/composables/useUserSettings'
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

useHead(() => {
	return {
		title: 'Settings',
		meta: [
			{
				name: 'description',
				content: 'Configure how the Rule 34 App works'
			}
		]
	}
})

const appVersion = version

const userSettings = useUserSettings()

function removeAllData() {
	if (!confirm('Are you sure you want to reset all data?')) {
		return
	}

	localStorage.clear()

	location.reload()
}
</script>

<template>
	<div class="mx-auto min-h-screen max-w-3xl p-4 sm:p-6 lg:p-8">
		<main class="space-y-12">
			<!-- Header -->
			<ContentSeparator
				class="w-full"
				text="Configure how the Rule 34 App works"
				title="Settings"
			/>

			<!-- Settings -->
			<section>
				<ol class="space-y-8">
					<!-- navigationTouchGestures -->
					<li>
						<SettingSwitch v-model="userSettings.navigationTouchGestures">
							<template #name> Touch gestures</template>

							<template #description> Show menu on left-to-right swipe, and search on right-to-left</template>
						</SettingSwitch>
					</li>

					<!-- postFullSizeImages -->
					<li>
						<SettingSwitch v-model="userSettings.postFullSizeImages">
							<template #name> Full size images</template>

							<template #description> Load full size images on posts, very data intensive</template>
						</SettingSwitch>
					</li>

					<!-- postsPerPage -->
					<li>
						<SettingNumber
							v-model.number="userSettings.postsPerPage"
							:max="100"
							:min="1"
						>
							<template #name> Posts per page</template>

							<template #description> How many posts to load per page</template>
						</SettingNumber>
					</li>
				</ol>
			</section>

			<!-- Reset -->
			<section class="flex gap-2 flex-row items-center justify-between pt-24">
				<label for="reset">
					<span class="text-base-content-highlight font-medium leading-8">
						Reset
						<ExclamationTriangleIcon class="inline-block w-4 h-4" />
					</span>

					<span class="text-sm block"> Resets settings, saved posts, and all other app data. </span>
				</label>

				<button
					id="reset"
					class="border-2 font-medium text-base-content-highlight text-sm border-base-0/20 rounded-lg px-3 py-1.5 hover:bg-base-0/20 transition-colors focus-visible:focus-util focus-visible:ring-inset"
					type="button"
					@click="removeAllData"
				>
					Reset
				</button>
			</section>
		</main>

		<footer class="absolute inset-x-0 bottom-0">
			<span class="block text-sm text-gray-300 p-2 text-center"> v{{ appVersion }} </span>
		</footer>
	</div>
</template>

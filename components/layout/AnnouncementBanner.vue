<template>
	<div
		v-if="isShown"
		class="relative isolate flex items-center gap-x-6 overflow-hidden bg-black py-2.5 px-6 sm:px-3.5 sm:before:flex-1"
	>
		<!-- Background -->
		<svg
			aria-hidden="true"
			class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
			viewBox="0 0 577 310"
		>
			<path
				id="a906133b-f855-4023-a54c-38d70c72fe9c"
				d="m142.787 168.697-75.331 62.132L.016 88.702l142.771 79.995 135.671-111.9c-16.495 64.083-23.088 173.257 82.496 97.291C492.935 59.13 494.936-54.366 549.339 30.385c43.523 67.8 24.892 159.548 10.136 196.946l-128.493-95.28-36.628 177.599-251.567-140.953Z"
				fill="url(#be47b6c9-9c22-49b2-a209-168b52fa0ada)"
				fill-opacity=".9"
			/>
			<defs>
				<linearGradient
					id="be47b6c9-9c22-49b2-a209-168b52fa0ada"
					gradientUnits="userSpaceOnUse"
					x1="614.778"
					x2="-42.453"
					y1="26.617"
					y2="96.115"
				>
					<stop stop-color="#9089FC" />
					<stop
						offset="1"
						stop-color="#FF80B5"
					/>
				</linearGradient>
			</defs>
		</svg>
		<svg
			aria-hidden="true"
			class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
			viewBox="0 0 577 310"
		>
			<use href="#a906133b-f855-4023-a54c-38d70c72fe9c" />
		</svg>

		<!-- Banner -->
		<p class="text-sm leading-6 text-gray-100">
			<a
				href="https://hentaiporn.app/?utm_source=Rule34App&utm_medium=Banner"
				rel="noopener"
				target="_blank"
			>
				<strong class="font-semibold">New sister website:</strong> 120K+ high-quality Hentai images & videos,
				lightning-fast, new content every 5 mins&nbsp;<span aria-hidden="true">&rarr;</span></a
			>
		</p>
		<div class="flex flex-1 justify-end">
			<button
				class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
				type="button"
				@click="deleteSelf"
			>
				<span class="sr-only">Dismiss</span>
				<XIcon
					aria-hidden="true"
					class="icon h-5 w-5 text-gray-100"
				/>
			</button>
		</div>
	</div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'

const localStorageKey = 'hp-banner'

export default {
	components: {
		XIcon
	},

	methods: {
		deleteSelf() {
			// Destroy the vue listeners, etc
			this.$destroy()

			// Remove the element from the DOM
			this.$el.parentNode.removeChild(this.$el)
		}
	},

	computed: {
		...mapGetters(['getTimesTheAppHasBeenOpened']),

		// Only show the banner the first time && if the app has been opened 7 times
		isShown() {
			return this.getTimesTheAppHasBeenOpened === 1 || this.getTimesTheAppHasBeenOpened % 7 === 0
		}
	}
}
</script>

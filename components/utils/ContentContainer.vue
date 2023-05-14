<template>
	<div class="card-body">
		<!-- Title -->
		<h2 class="text-base-content-highlight text-lg font-bold tracking-wide leading-8">{{ title }}</h2>

		<!-- Text -->
		<!-- Using v-text as using {{}} would add a `new line` character that `whitespace-pre-line` would interpret. -->
		<p
			v-if="text"
			class="whitespace-pre-line text-sm text-base-content"
			v-text="text"
		/>

		<!-- Links -->
		<ol v-if="links.length">
			<li
				v-for="(link, index) in links"
				:key="link.text"
			>
				<NuxtLink
					:href="link.href"
					class="underline text-sm text-base-content hover:text-base-content-hover focus-visible:focus-util"
				>
					{{ link.text }}
				</NuxtLink>

				<!-- Separator -->
				<template v-if="index !== links.length - 1"> -</template>
			</li>
		</ol>

		<!-- Extra information -->
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, required: true },
		text: { type: String, required: false, default: undefined },

		links: { type: Array, required: false, default: () => [] }
	}
}
</script>

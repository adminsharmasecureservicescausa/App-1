<template>
	<main class="mx-auto min-h-screen max-w-3xl p-4 sm:p-6 lg:p-8">
		<div class="space-y-4">
			<ContentSeparator
				text="Friends of the Rule 34 App"
				title="Partners"
			/>

			<ContentContainer
				:links="[
					{
						text: 'hentaiporn.app',
						href: 'https://hentaiporn.app/?utm_source=Rule34App&utm_medium=Partners'
					}
				]"
				icon="bg-svg-star"
				text="Sister site of the Rule 34 App, has the best high-quality Hentai Videos and Images."
				title="HentaiPorn App"
			/>

			<ContentContainer
				:links="[
					{
						text: 'kurosearch.com',
						href: 'https://kurosearch.com/?utm_source=Rule34App&utm_medium=Partners'
					}
				]"
				icon="bg-svg-star"
				text="Friend of the Rule 34 App, has a slick interface and a lot of content."
				title="Kurosearch"
			/>

			<ContentContainer
				:links="[
					{
						text: 'theporndude.com',
						href: 'https://theporndude.com'
					}
				]"
				icon="bg-svg-star"
				text="The Porn Dude lists the world's best porn sites."
				title="ThePornDude"
			/>
		</div>
	</main>
</template>

<script>
export default {
	head() {
		return {
			title: 'Partners',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Friends of the Rule 34 App.'
				}
			]
		}
	}
}
</script>

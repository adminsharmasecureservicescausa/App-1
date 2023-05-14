<script setup>
useHead({
	meta: [
		// Necessary so images can be loaded from other domains
		{
			name: 'referrer',
			content: 'no-referrer'
		}
	]
})

const booruGroupList = computed(() => {
	const DEFAULT_BOORU_GROUP = {
		name: 'Default',
		domains: []
	}

	// Default Booru list
	const DOMAINS_FROM_DEFAULT_BOORU_LIST = this.getDefaultBooruList.map((BOORU) => BOORU.domain)

	DEFAULT_BOORU_GROUP.domains = DOMAINS_FROM_DEFAULT_BOORU_LIST

	// Premium Booru list
	const PREMIUM_BOORU_GROUP = {
		name: 'Custom',
		domains: ['<Add Booru>']
	}

	if (this.isUserPremium) {
		const DOMAINS_FROM_PREMIUM_BOORU_LIST = this.getPremiumBooruList.map((BOORU) => BOORU.domain)

		PREMIUM_BOORU_GROUP.domains = [...DOMAINS_FROM_PREMIUM_BOORU_LIST, ...PREMIUM_BOORU_GROUP.domains]
	}

	return [DEFAULT_BOORU_GROUP, PREMIUM_BOORU_GROUP]
})

async function onDomainChange(domain) {
	if (domain === '<Add Booru>') {
		await this.$router.push({ name: 'premium' })
	}

	// TODO: Fetch data
	// TODO: Set new URL
}

async function onNextPage() {
	if (this.posts.isLoading) {
		return
	}

	let postData

	const nextPageID = this.lastPageID + 1

	try {
		this.posts.isLoading = true

		postData = await apiHelper.getPosts(
			{ booru: this.getActiveBooru, booruType: this.getActiveBooruType },
			{
				pageID: nextPageID,
				tags: this.search.activeTags
			}
		)

		//
	} catch (error) {
		this.$toast.error(`Failed to load page: "${error.message}"`)
		throw error

		//
	} finally {
		this.posts.isLoading = false
	}

	this.posts.data = [...this.posts.data, postData]

	Object.freeze(this.posts.data)

	// TODO: Set new URL
	await this.$router.push({ query: { page: nextPageID } })
}

async function onTagSearch(query) {
	if (this.posts.isLoading) {
		return
	}

	let tagSearchData

	try {
		this.search.isLoading = true

		tagSearchData = await apiHelper.getTags({ booru: this.getActiveBooru, booruType: this.getActiveBooruType }, query)
		tagSearchData = tagSearchData.data

		//
	} catch (error) {
		this.$toast.error(`Failed to get tags: "${error.message}"`)
		throw error

		//
	} finally {
		this.search.isLoading = false
	}

	if (!tagSearchData) {
		this.toast.info(`No tags found for "${query}"`)
		return
	}

	this.search.data = tagSearchData
}
</script>

<template>
	<div class="mx-auto flex min-h-screen max-w-3xl flex-col px-4 sm:px-6 lg:px-8">
		<Teleport to="body">
			<SearchWrapper>
				<Search
					:initial-active-tags="search.activeTags"
					:search-results="search.data"
					@search="onTagSearch"
					@reset-search-results="resetTagSearchData"
					@submit-active-tags="onSubmitSearchActiveTags"
				/>
			</SearchWrapper>
		</Teleport>

		<Teleport to="body">
			<ScrollTopButton />
		</Teleport>

		<!-- Top menu -->
		<nav class="flex flex-row items-center justify-between py-4">
			<DomainSelector
				:active-domain="getActiveBooru.domain"
				:domain-group-list="booruGroupList"
				@domainChange="onDomainChange"
			/>

			<Notifications />
		</nav>

		<!-- Content -->
		<main class="flex min-h-full flex-auto flex-col space-y-4 pb-4">
			<!--          -->

			<section
				v-if="posts.data"
				class="flex-auto space-y-4"
			>
				<!--          -->

				<template v-for="postData in posts.data">
					<!--          -->

					<!-- Current pageID -->
					<div class="flex items-center gap-2">
						<button
							type="button"
							@click=""
						>
							<span class="sr-only">Click to navigate to specific pageID</span>

							Page {{ postData.meta.current_page }}
						</button>
					</div>

					<ul
						v-for="(post, index) in postData.data"
						:key="post.id"
					>
						<!--            -->
						<!--TODO: Name -->
						<li>
							<Post
								:post="post"
								:post-name="`-${post.id}`"
							/>
						</li>

						<!-- Every 7 posts -->
						<li
							v-if="!isUserPremium && posts !== 0 && posts % 7 === 0"
							:key="`${post.id}-advertisement`"
						>
							<Advertisement />
						</li>
					</ul>

					<PostsControls @nextPage="onNextPage" />
				</template>
			</section>

			<template v-else-if="posts.isLoading">
				<span class="my-3 text-center text-gray-300">Getting posts…</span>
			</template>
		</main>
	</div>
</template>

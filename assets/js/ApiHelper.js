export class ApiHelper {
	/**
	 * @type {import('@nuxt/types').Context}
	 */
	context = null

	constructor(context) {
		this.context = context
	}

	/**
	 * @param {BooruObj} booru
	 * @param {BooruTypeObj} booruType
	 *
	 * @param {number?} pageID
	 * @param {string[]?} tags
	 * @param {number?} limit
	 * @param {number?} score
	 * @param {string?} scoreOperator
	 */
	getPosts({ booru, booruType }, { pageID, tags, limit, score, scoreOperator } = {}) {
		const url = this.buildPostsUrlWithDefaults(
			{
				booru,
				booruType
			},
			{
				pageID,
				tags,
				limit,
				score,
				scoreOperator
			}
		)

		return this.context.$axios.$get(url)
	}

	/**
	 * @param {BooruObj} booru
	 * @param {BooruTypeObj} booruType
	 * @param {string} tag
	 */
	getTags({ booru, booruType }, tag) {
		const url = this.buildTagsUrl(
			{
				booruDomain: booru.domain,
				booruType: booruType.type
			},
			{
				tag,
				limit: 15,
				order: 'count'
			}
		)

		return this.context.$axios.$get(url)
	}

	/**
	 * @param {BooruObj} booru
	 * @param {BooruTypeObj} booruType
	 *
	 * @param {number?} pageID
	 * @param {string[]?} tags
	 * @param {number?} limit
	 * @param {number?} score
	 * @param {string?} scoreOperator
	 */
	buildPostsUrl({ booruDomain, booruType }, { pageID, tags = [], limit, score, scoreOperator = '>=' }) {
		const url = new URL(this.context.$config.public.API_URL + '/booru/' + booruType + '/posts')

		url.searchParams.append('baseEndpoint', booruDomain)

		// Page
		if (typeof pageID !== 'number') {
			throw new TypeError('pageID must be a number')
		}

		url.searchParams.append('pageID', pageID)

		// Tags
		if (!Array.isArray(tags)) {
			throw new TypeError('tags must be an array')
		}

		if (tags.length) {
			url.searchParams.append('tags', tags)
		}

		// Limit
		if (typeof limit !== 'number') {
			throw new TypeError('limit must be a number')
		}

		url.searchParams.append('limit', limit)

		// Score
		if (typeof score !== 'number') {
			throw new TypeError('score must be a number')
		}

		url.searchParams.append('score', scoreOperator + score)

		return url.toString()
	}

	/**
	 * @param {BooruObj} booru
	 * @param {BooruTypeObj} booruType
	 *
	 * @param {number?} pageID
	 * @param {string[]?} tags
	 * @param {number?} limit
	 * @param {number?} score
	 * @param {string?} scoreOperator
	 */
	buildPostsUrlWithDefaults({ booru, booruType }, { pageID, tags, limit, score, scoreOperator } = {}) {
		pageID = pageID ?? booruType.initialPageID
		tags = tags ?? []
		limit = limit ?? this.context.$store.getters['user/getUserSettings'].postsPerPage.value
		score = score ?? this.context.$store.getters['user/getUserSettings'].score.value
		scoreOperator = scoreOperator ?? '>='

		return this.buildPostsUrl(
			{
				booruDomain: booru.domain,
				booruType: booruType.type
			},
			{
				pageID,
				tags,
				limit,
				score,
				scoreOperator
			}
		)
	}

	/**
	 * @param {BooruObj} booru
	 * @param {BooruTypeObj} booruType
	 *
	 * @param {string} tag
	 * @param {number} limit
	 * @param {string} order
	 */
	buildTagsUrl({ booruDomain, booruType }, { tag, limit, order }) {
		const url = new URL(this.context.$config.public.API_URL + '/booru/' + booruType + '/tags')

		url.searchParams.append('baseEndpoint', booruDomain)

		// Tag
		if (typeof tag !== 'string') {
			throw new TypeError('tag must be a string')
		}

		url.searchParams.append('tag', tag)

		// Limit
		if (typeof limit !== 'number') {
			throw new TypeError('limit must be a number')
		}

		url.searchParams.append('limit', limit)

		// Order
		if (typeof order !== 'string') {
			throw new TypeError('order must be a string')
		}

		url.searchParams.append('order', order)

		return url.toString()
	}
}

export class BooruHelper {}

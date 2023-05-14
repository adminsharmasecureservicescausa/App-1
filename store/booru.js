import {
	booruTypeList,
	defaultBooruList,
	findBoorusWithValueByKey
} from '~/assets/lib/rule-34-shared-resources/src/util/BooruUtils.js'
import { RouterHelper } from '~/assets/js/RouterHelper'

export const state = () => ({
	history: {
		lastDomainUsed: defaultBooruList[0].domain
	},

	posts: {
		data: []
	}
})

export const getters = {
	// Used for premium separation
	getDefaultBooruList: () => {
		return defaultBooruList
	},

	// Used for premium separation
	getPremiumBooruList: (state, getters, rootState, rootGetters) => {
		return rootGetters['user/getCustomBoorus']
	},

	// Used internally as a complete list of boorus
	getBooruList: (state, getters) => {
		return [...getters.getDefaultBooruList, ...getters.getPremiumBooruList]
	},

	getActiveBooru(state, getters, rootState, rootGetters) {
		const domain = rootGetters['url/urlDomain']

		// Set default booru
		if (domain == null) {
			return findBoorusWithValueByKey(state.history.lastDomainUsed, 'domain', getters.getBooruList)[0]
		}

		return findBoorusWithValueByKey(domain, 'domain', getters.getBooruList)[0]
	},

	getActiveBooruType: (state, getters, rootState, rootGetters) => {
		return findBoorusWithValueByKey(getters.getActiveBooru.type, 'type', booruTypeList)[0]
	}
}

export const mutations = {
	setLastDomainUsed(state, value) {
		state.history.lastDomainUsed = value
	}
}

export const actions = {
	async activeBooruManager(context, { operation, value }) {
		const { dispatch, commit, getters } = context

		switch (operation) {
			case 'set': {
				const booru = findBoorusWithValueByKey(value, 'domain', getters.getBooruList)[0]

				if (booru == null) {
					this.$sentry.captureException(new Error(`Could not find booru with domain: ${value}`), {
						extra: {
							domain: value,
							booruList: getters.getBooruList
						}
					})
					return
				}

				commit('setLastDomainUsed', booru.domain)

				const ROUTE = RouterHelper.generatePostsRouteWithDefaults(context, booru.domain)

				await dispatch('url/pushRoute', ROUTE, { root: true })
				break
			}

			case 'reset': {
				const firstBooru = getters.getDefaultBooruList[0]

				commit('setLastDomainUsed', firstBooru.domain)
				break
			}

			default:
				throw new Error('No operation specified')
		}
	}
}

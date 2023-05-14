'use strict'

export class ProxyHelper {
	/**
	 * @param {string} url
	 *
	 * @return string
	 */
	static proxyUrl(url) {
		return window.$nuxt.$config.public.PROXY_URL + encodeURIComponent(url)
	}
}

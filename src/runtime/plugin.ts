import type { NTCParams } from '@notice-org/ntc'

import { defineNuxtPlugin } from '#app'
import { NTCBase } from '@notice-org/ntc'

export default defineNuxtPlugin(() => {
	const ntc = {
		async document(_params: NTCParams) {
			const { pageId, ...params } = _params as Record<string, any>
			params['integration'] = 'nuxt-plugin'
			params['navigationType'] ??= 'memory'

			return await NTCBase.queryDocument(pageId, params)
		},
	}

	return {
		provide: {
			ntc,
		},
	}
})

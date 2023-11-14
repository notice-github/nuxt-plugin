import type { ObjectPlugin, Plugin } from '#app'
import type { NTCParams } from '@notice-org/ntc'
import type { NTCQueryResult } from '@notice-org/ntc/lib/types'

import { defineNuxtPlugin } from '#app'
import { NTCBase } from '@notice-org/ntc'

export type Provider = { ntc: { document(_params: NTCParams): Promise<NTCQueryResult> } }

const plugin: Plugin<Provider> & ObjectPlugin<Provider> = defineNuxtPlugin(() => {
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

export default plugin

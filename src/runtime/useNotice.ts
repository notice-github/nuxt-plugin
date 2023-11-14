import type { Provider } from './plugin'

import { useNuxtApp } from '#app'

export const useNotice = () => useNuxtApp().$ntc as Provider['ntc']

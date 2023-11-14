import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@notice-org/nuxt',
		configKey: 'notice',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	// Default configuration options of the Nuxt module
	defaults: {},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url)

		addComponent({
			name: 'Notice',
			filePath: resolver.resolve('./runtime/component.vue'),
		})

		addPlugin(resolver.resolve('./runtime/plugin'))

		addImports({
			name: 'useNotice',
			from: resolver.resolve('./runtime/useNotice'),
		})
	},
})

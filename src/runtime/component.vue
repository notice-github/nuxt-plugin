<script lang="ts" setup>
import type { NTCDocument } from '@notice-org/ntc'
import type { NTCQueryResult } from '@notice-org/ntc/lib/types'

import { computed, useHead } from '#imports'

const props = defineProps<{ data: NTCQueryResult<NTCDocument> | undefined | null }>()

if (props.data?.ok) {
	const document = props.data.data

	useHead({
		title: document.head.filter((h) => h.tagName === 'title')[0]?.innerText,
		link: document.head.filter((h) => h.tagName === 'link').map((h) => ({ ...h.attributes })),
		meta: document.meta?.map((m) => ({ ...m.attributes })),
		style: [
			{
				id: `NTC_style-${document.id}`,
				innerHTML: document.style,
			},
			...document.head
				.filter((h) => h.tagName === 'style')
				.map((h) => ({ ...h.attributes, innerHTML: h.innerHTML, innerText: h.innerText })),
		],
		script: [
			{
				id: `NTC_script-${document.id}`,
				innerHTML: document.script,
			},
			...document.head
				.filter((h) => h.tagName === 'script')
				.map((h) => ({ ...h.attributes, innerHTML: h.innerHTML, innerText: h.innerText })),
		],
	})
}

const wrapperInnerHTML = (body: string) => {
	const regex = /^\s*<div id="[0-9a-f\-]{36}" class="NTC_wrapper">((.|\n)+)<\/div>\s*$/i
	const match = body.match(regex)
	return match?.[1] ?? ''
}

const body = computed(() => {
	if (!props.data?.ok) return null
	return wrapperInnerHTML(props.data.data.body)
})
</script>

<template>
	<div v-if="props.data?.ok" :id="props.data.data.id" class="NTC_wrapper" v-html="body"></div>
</template>

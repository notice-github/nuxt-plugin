<template>
	<Notice :data="documentationData" />
</template>

<script lang="ts" setup>
const notice = useNotice()

const { data: documentationData } = await useAsyncData(() => notice.document({ pageId: 'documentation' }))
</script>

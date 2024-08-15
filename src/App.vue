<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
    <routerSearch />
  </ConfigGlobal>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('app')
const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)
const greyMode = computed(() => appStore.getGreyMode)

</script>
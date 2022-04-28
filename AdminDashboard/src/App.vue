<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue'

const defaultLayout = 'default'
const { currentRoute } = useRouter()


const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
)

</script>

<template>
 <component :is="layout">

  <RouterView />
    </component>

</template>

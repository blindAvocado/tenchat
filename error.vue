<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

if (props.error.statusCode === 404) {
  navigateTo('/login')
}
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
  </div>
</template>
<script setup lang="ts">
</script>

<template>
  <div class="rounded-[50px] max-w-[1440px] max-h-[1024px] w-full h-full m-auto flex overflow-hidden">
    <div class="w-1/2 flex-grow flex justify-center items-center bg-bg">
      <slot name="form" />
    </div>
    <div class="w-1/2 flex-grow flex justify-center items-center relative bg-accent-base">
      <div class="absolute aspect-square max-w-[606px] w-full">
        <div class="relative h-full">
          <nuxt-icon
            name="icon-bg-outer"
            filled
            class="outer absolute left-0 right-0 m-auto max-w-[606px] aspect-square w-full h-full"
          />
          <nuxt-icon 
            name="icon-bg-inner" 
            filled
            class="inner absolute left-0 right-0 m-auto max-w-[528px] aspect-square w-full h-full" 
          />
        </div>
      </div>
      <div class="absolute">
        <slot name="image" />
      </div>
      <div class="absolute bottom-[58px] py-[50px]">
        <slot name="text" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.outer,
.inner {
  :deep(svg) {
    @apply w-full h-full m-0 fill-none
  }
}
</style>
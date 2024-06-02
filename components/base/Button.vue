<script setup lang="ts">

withDefaults(defineProps<{
  disabled?: boolean,
  type?: "button" | "submit"
}>(), {
  disabled: false,
  type: 'button',
})

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
}
</script>

<template>
  <button
    :type
    @click.prevent="onClick"
    class="bg-accent-base text-[#ffffff] font-inter font-bold text-[20px] leading-[24px] cursor-pointer p-[20px] rounded-[10px] w-full transition-all"
    :class="{ 'bg-accent-light cursor-default pointer-events-none': disabled }">
    <slot></slot>
  </button>
</template>
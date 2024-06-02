<script setup lang="ts">
import { ref } from 'vue';

interface CheckboxProps {
  modelValue: boolean;
  id?: string;
  label?: string;
}

withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
});

const emit = defineEmits(['update:modelValue']);

const checkbox = ref<HTMLInputElement>();

const updateValue = () => {
  emit('update:modelValue', checkbox?.value?.checked)
}
</script>

<template>
  <div class="checkbox flex items-center gap-[10px]" @click="updateValue" :class="{ 'checkbox--active': modelValue }">
    <input 
      ref="checkbox" 
      :id 
      :checked="modelValue" 
      type="checkbox" 
      class="appearance-none cursor-pointer w-[20px] h-[20px] rounded-[5px]
        outline outline-[2px] -outline-offset-[2px] outline-accent-light relative transition-all
        checked:bg-accent-base checked:outline-accent-base
        after:content-[''] after:absolute after:hidden"
    />
    <label :for="id" class="text-text-primary leading-[24px]">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped lang="scss">
.checkbox {

  input::after {
    @apply content-[''] absolute hidden;
  }
  input:checked::after {
    @apply block left-1/2 top-[45%] w-[6px] h-[10px] border-[#fff] border-solid border-r-[3px] border-b-[3px] -translate-x-1/2 -translate-y-1/2 rotate-45;
  }
}
</style>
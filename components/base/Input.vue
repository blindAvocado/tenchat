<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

type InputType = "text" | "email" | "password" | "number"; 

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    icon?: string;
    type?: InputType;
    placeholder?: string;
    error?: string;
    required?: boolean;
    readonly?: boolean;
    autocomplete?: InputHTMLAttributes['autocomplete']
  }>(),
  {
    type: "text",
  }
);

const localType = ref<InputType>(props.type);

const togglePassVisibility = () => {
  localType.value === 'password' ? localType.value = 'text' : localType.value = 'password';
}

</script>

<template>
  <div class="relative">
    <input
      :type="localType"
      v-model="model"
      v-bind="{
        ...(placeholder && { placeholder }),
        ...(required && { required }),
        ...(readonly && { readonly }),
        ...(autocomplete && { autocomplete }),
      }"
      class="bg-input-bg outline outline-[2px] -outline-offset-[2px] outline-input-border p-[20px]
        w-full rounded-[10px] text-[18px] text-text-primary font-inter leading-[24px]
        placeholder:text-input-placeholder"
      :class="{ 'pl-[50px]': icon }"
    />
    <nuxt-icon v-if="icon" :name="icon" class="icon absolute left-[10px] top-1/2 -translate-y-1/2 w-[30px] h-[30px]" />
    <button 
      type="button" 
      v-if="type === 'password'" 
      @click="togglePassVisibility" 
      class="absolute right-[20px] top-1/2 -translate-y-1/2 w-[30px] h-[30px]"
    >
      <nuxt-icon 
        name="eye-slash" 
        filled 
        class="icon text-text-dark transition-colors" 
        :class="{ 'text-text-primary': localType === 'text' }" 
      />
    </button>
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.icon {
  :deep(svg) {
    @apply w-full h-full m-0
  }
}
</style>
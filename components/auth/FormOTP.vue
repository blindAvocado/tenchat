<script setup lang="ts">
import { useOTP } from '~/composables/useOTP';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

const {
  code,
  codeContainer,
  handleInput,
  handleInputClick,
  handleInputFocus,
  handleInputPaste,
  handleKeyDown,
} = useOTP(6);

const isCodeCompleted = computed(() => {
  return code.value.every((digit) => digit !== null && Number.isInteger(digit));
});

const onSubmit = async () => {
  try {
    await $fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: authStore.username ?? authStore.email, password: authStore.password })
  });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  } finally {
    alert("Вход выполнен");
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="mx-auto">
    <input
      autocomplete="false"
      name="hidden"
      type="text"
      style="display: none"
    />

    <div ref="codeContainer" class="flex gap-[20px]">
      <input
        class="w-[64px] h-[64px] text-center bg-input-bg outline outline-[2px] -outline-offset-[2px] outline-input-border
          p-[20px] rounded-[10px] text-[18px] text-text-primary font-inter leading-[24px] placeholder:text-input-placeholder"
        autocomplete="off"
        v-for="(digit, index) in code"
        :key="index"
        type="text"
        v-model="code[index]"
        placeholder="-"
        :autofocus="index === 0"
        pattern="[0-9]*"
        inputmode="numeric"
        @paste="handleInputPaste"
        @beforeinput="(e) => handleInput(e as InputEvent, index)"
        @keydown="(e) => handleKeyDown(e, index)"
        @focus="(e) => handleInputFocus(e, index)"
        @click="handleInputClick(index)"
      />
    </div>
    <BaseButton type="submit" :disabled="!isCodeCompleted" class="block max-w-[453px] mt-[24px] mx-auto" @click="onSubmit">SUBMIT</BaseButton>
  </form>
</template>
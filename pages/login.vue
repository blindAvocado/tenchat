<script setup lang="ts">
import type { IFormLogin } from '~/components/auth/types';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const authStore = useAuthStore();

const onSubmit = async (form: IFormLogin) => {
  try {
    await $fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  } finally {
    authStore.setForm(form);
    router.push('/otp');
  }
}
</script>

<template>
  <AuthWrapper>
    <template v-slot:form>
      <div class="max-w-[477px] w-full">
        <h1 class="font-bold text-text-dark text-[40px] mb-[25px] leading-[40px]">Login to your Account</h1>
        <div class="subtitle max-w-[453px] flex justify-between items-center font-medium text-[15px] text-text-primary text-center h-[25px] mx-auto mb-[25px]">with email</div>
        <AuthFormLogin @submit="onSubmit" />
      </div>
    </template>
    <template v-slot:image>
      <nuxt-icon name="right_login" filled class="image" />
    </template>
    <template v-slot:text>
      <div class="text-center text-text-light">
        <div class="font-bold text-[20px] leading-[25px]">Connect with any device.</div>
        <div class="text-text-light/75 text-[16px] leading-[26px]">Everything you need is an internet connection.</div>
      </div>
    </template>
  </AuthWrapper>
</template>

<style scoped lang="scss">
.image {
  :deep(svg) {
    @apply w-full h-full m-0
  }
}

.subtitle {
  &::after,
  &::before {
    @apply content-[''] h-auto max-w-[120px] flex-grow block border-b border-text-primary
  }
}
</style>

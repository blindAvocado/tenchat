<script setup lang="ts">
import type { IFormSignup } from '~/components/auth/types';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: "auth",
});

const router = useRouter();

const authStore = useAuthStore();

const onSubmit = async (form: IFormSignup) => {
  authStore.setForm(form);
  await router.push('/otp');
}
</script>

<template>
  <AuthWrapper>
    <template v-slot:form>
      <div class="max-w-[477px] w-full">
        <h1 class="font-bold text-text-dark text-[40px] leading-[50px]">Create your account</h1>
        <div class="text-text-primary text-[20px] leading-[24px] mb-[25px]">Unlock all Features!</div>
        <AuthFormSignup @submit="onSubmit" />
      </div>
    </template>
    <template v-slot:image>
      <nuxt-icon name="right_signup" filled class="image block mt-[12%] -mr-[4%] ml-[4%]" />
    </template>
    <template v-slot:text>
      <div class="text-center text-text-light">
        <div class="font-bold text-[20px] leading-[25px]">Join us!</div>
        <div class="text-text-light/75 text-[16px] leading-[26px]">Just go through the boring process of creating an account.</div>
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
</style>

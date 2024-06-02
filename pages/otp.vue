<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore();
const router = useRouter();

const goBack = () => {
  authStore.clearPassword();
  window.history.length > 1 ? router.go(-1) : router.push('/login')
}
</script>

<template>
  <AuthWrapper>
    <template v-slot:form>
      <div class="max-w-[484px] w-full">
        <div class="mb-[25px]">
          <h1 class="font-bold text-text-dark text-[40px] leading-[40px]">Enter OTP</h1>
          <div class="font-medium text-[20px] text-text-primary leading-[30px]">
            Sent OTP on <a :href="`mailto:${authStore.email}`" class="text-[20px] leading-[24px] text-accent-light">{{ authStore.email }}</a>
          </div>
          <button type="button" class="font-bold text-[16px] leading-[24px] text-accent-light" @click.prevent="goBack">Change email</button>
        </div>
        <AuthFormOTP/>
      </div>
    </template>
    <template v-slot:image>
      <nuxt-icon name="right_otp" filled class="image" />
    </template>
    <template v-slot:text>
      <div class="text-center text-text-light">
        <div class="font-bold text-[20px] leading-[25px]">It's just OTP verification</div>
        <div class="text-text-light/75 text-[16px] leading-[26px]">You are one step away from recovering your password.</div>
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

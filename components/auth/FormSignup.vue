<script setup lang="ts">
import type { IFormSignup } from '~/components/auth/types';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const emit = defineEmits(['submit']);

const form = ref<IFormSignup>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

const isConfirmPassMatch = computed(() => {
  return form.value.password === form.value.confirmPassword
})

const isFormValid = computed(() => {
  return isConfirmPassMatch.value && Object.values(form.value).every(Boolean)
})

const goToLogin = async () => {
  if (!Object.values(form.value).some(Boolean)) {
    authStore.clearForm();
    await router.push('/login');
    return;
  }

  const confirmed = confirm('При переходе на другую страницу введенные данные будут утеряны. Продолжить?');
  
  if (confirmed) {
    authStore.clearForm();
    await router.push('/login');
  }
}

const onSubmit = () => {
  if (isFormValid) {
    emit('submit', form.value);
  }
}

onMounted(() => {
  form.value = {
    username: authStore.username,
    email: authStore.email,
    password: authStore.password,
    confirmPassword: authStore.confirmPassword,
    terms: authStore.terms,
  };
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="max-w-[453px] mx-auto">
    <div class="flex flex-col gap-[10px]">
      <BaseInput placeholder="Username" icon="person" type="text" :required="true" v-model="form.username" />
      <BaseInput placeholder="Email" icon="envelope" type="email" :required="true" v-model="form.email" />
      <BaseInput placeholder="Password" icon="shield-slash" type="password" :required="true" v-model="form.password" />
      <BaseInput placeholder="Confirm Password" icon="shield-slash" type="password" :required="true" v-model="form.confirmPassword" />
      <BaseCheckbox v-model="form.terms">
        Accept <NuxtLink to="/terms" class="font-medium text-accent-light">terms and conditions</NuxtLink>
      </BaseCheckbox>
    </div>
    <BaseButton type="submit" :disabled="!isFormValid" class="mt-[25px]" @click="onSubmit">SIGN UP</BaseButton>
    <div class="font-[16px] flex items-center justify-center gap-[5px] text-text-primary text-center mt-[20px]">
      <span>You have account?</span>
      <button @click.prevent="goToLogin" class="font-bold text-accent-light">Login now</button>
    </div>
  </form>
</template>
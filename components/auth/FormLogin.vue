<script setup lang="ts">
import type { IFormLogin } from '~/components/auth/types';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const emit = defineEmits(['submit']);

const form = ref<IFormLogin>({
  email: "",
  password: "",
});

const isFormValid = computed(() => {
  return Object.values(form.value).every(Boolean)
})

const onSubmit = () => {
  if (isFormValid) {
    emit('submit', form.value);
  }
}

const goToSignup = async () => {
  if (!Object.values(form.value).some(Boolean)) {
    authStore.clearForm();
    await router.push('/signup');
    return;
  }

  const confirmed = confirm('При переходе на другую страницу введенные данные будут утеряны. Продолжить?');
  
  if (confirmed) {
    authStore.clearForm();
    await router.push('/signup');
  }
}

onMounted(() => {
  form.value = {
    email: authStore.email ?? '',
    password: authStore.password ?? '',
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="max-w-[453px] mx-auto">
    <div class="flex flex-col gap-[10px]">
      <BaseInput 
        placeholder="Email" 
        icon="envelope" 
        type="email" 
        :required="true" 
        autocomplete="email"
        v-model="form.email" 
      />
      <BaseInput 
        placeholder="Password" 
        icon="shield-slash" 
        type="password" 
        :required="true" 
        v-model="form.password" 
      />
    </div>
    <BaseButton type="submit" :disabled="!isFormValid" class="mt-[25px]" @click="onSubmit">LOG IN</BaseButton>
    <div class="font-[16px] flex items-center justify-center gap-[5px] text-text-primary text-center mt-[20px]">
      <span>Don’t have account?</span>
      <button @click.prevent="goToSignup" class="font-bold text-accent-light">Create an account</button>
    </div>
  </form>
</template>
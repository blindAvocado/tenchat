<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

type FormLogin = {
  email: string;
  password: string;
}

const form = ref<FormLogin>({
  email: "",
  password: "",
});

const onSubmit = () => {
  console.log(form.value);
}
</script>

<template>
  <AuthWrapper>
    <template v-slot:form>
      <div class="form-wrapper">
        <h1 class="font-bold text-text-dark text-[40px] mb-[25px]">Login to your Account</h1>
        <div class="subtitle font-medium text-[15px] text-text-primary text-center h-[25px] mb-[25px]">with email</div>
        <form class="form">
          <div class="flex flex-col gap-[10px]">
            <BaseInput placeholder="Email" icon="envelope" type="email" :required="true" v-model="form.email" />
            <BaseInput placeholder="Password" icon="shield-slash" type="password" :required="true" v-model="form.password" />
            <span>{{ form }}</span>
          </div>
          <BaseButton type="submit" class="mt-[25px]" @click="onSubmit">LOG IN</BaseButton>
          <div class="font-[16px] flex items-center justify-center gap-[5px] text-text-primary text-center mt-[20px]">
            <span>Don’t have account?</span>
            <NuxtLink to="/signup" class="font-bold text-accent-light">Create an account</NuxtLink>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:image>
      <nuxt-icon name="right_login" filled class="image" />
    </template>
    <template v-slot:text>
      <div class="text-center text-text-light">
        <div class="font-bold text-[20px]">Connect with any device.</div>
        <div class="text-text-light/75 text-[16px]">Everything you need is an internet connection.</div>
      </div>
    </template>
  </AuthWrapper>
</template>

<style scoped lang="scss">
.image {
  :deep(svg) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

// .subtitle {
//   &:after
// }
</style>

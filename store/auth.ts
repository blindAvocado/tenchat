import { defineStore } from "pinia";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

interface AuthInfo {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthInfo => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  }),
  actions: {
    setForm(value: Optional<AuthInfo, "username" | "confirmPassword" | "terms">) {
      this.username = value.username ?? "";
      this.email = value.email;
      this.password = value.password;
      this.confirmPassword = value.confirmPassword ?? "";
      this.terms = value.terms ?? false;
    },
    clearForm() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.terms = false;
    },
    clearPassword() {
      this.password = "";
      this.confirmPassword = "";
    },
  },
});

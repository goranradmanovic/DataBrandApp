// store/auth.ts
import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username: 'emilys',
          email,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});

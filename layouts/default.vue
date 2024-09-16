<template>
  <nord-layout>
    <nord-navigation slot="nav">
      <nord-nav-group style="max-inline-size: 220px">
        <nuxt-link to="/">
          <nord-nav-item href="#">
            <nord-stack align-items="center" direction="horizontal" wrap>
              <nord-avatar :src="appLogo" name="Brand App" size="m" variant="square" />
              DataBrand App
            </nord-stack>
          </nord-nav-item>
        </nuxt-link>
      </nord-nav-group>

      <nord-nav-group heading="Menu">
        <nuxt-link to="/">
          <nord-nav-item href="#" :active="navRoute === '/' ? true : false" icon="interface-home" class="n-margin-be-s">Home</nord-nav-item>
        </nuxt-link>

        <nuxt-link to="/products">
          <nord-nav-item href="#" :active="navRoute === '/products' ? true : false" icon="interface-shopping-cart" class="n-margin-be-s">Products</nord-nav-item>
        </nuxt-link>

        <nuxt-link to="/success">
          <nord-nav-item href="#" :active="navRoute === '/success' ? true : false" icon="interface-checked-circle" class="n-margin-be-s">Success</nord-nav-item>
        </nuxt-link>
      </nord-nav-group>

      <nord-nav-group style="max-inline-size: 220px" slot="footer">
        <nord-nav-item v-if="authenticated" href="#" icon="interface-logout" @click="logout">
          Sign out
        </nord-nav-item>
      </nord-nav-group>
    </nord-navigation>

    <nord-stack gap="l">
      <slot />
    </nord-stack>
  </nord-layout>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
  import { useAuthStore } from '~/store/auth'; // import the auth store we just created
  import appLogo from '~/assets/images/db-logo.webp';

  const router = useRouter();
  const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

  const navRoute = computed(() => router.currentRoute.value.path)

  const logout = () => {
    logUserOut();
    router.push('/login');
  };
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
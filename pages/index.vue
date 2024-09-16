<template>
  <nord-card>
    <h2 slot="header">Home Page</h2>

    <section>
      <img :src="brandImg" alt="Brand image" />
    </section>
  </nord-card>
</template>
<script lang="ts" setup>
  import brandImg from '~/assets/images/db.webp';
</script>

<style scoped>
  section {
    display: flex; 
    justify-content: center;
    align-items: center;
  }
</style>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
}
</style>

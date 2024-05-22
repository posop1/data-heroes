<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
  router.push('/')
}, 6000)
</script>

<template>
  <section class="not__found__container">
    <h2>Страница не найдена 404</h2>
  </section>
</template>

<style scoped lang="scss">
.not__found__container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

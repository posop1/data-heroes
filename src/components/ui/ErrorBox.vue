<script setup lang="ts">
interface IErrorBoxProps {
  message: string
}

const props = defineProps<IErrorBoxProps>()
</script>

<template>
  <div class="error__box">
    <h2>{{ props.message }}</h2>
  </div>
</template>

<style scoped lang="scss">
.error__box {
  width: 100%;
  min-height: 50dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

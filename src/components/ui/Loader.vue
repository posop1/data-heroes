<template>
  <div class="loader__container">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
.loader__container {
  width: 100%;
  min-height: 50dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #000; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

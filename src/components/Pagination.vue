<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface IPaginationProps {
  page: number
  pagesCount: number
}

const props = defineProps<IPaginationProps>()
const emits = defineEmits(['changePage'])

const currentPage = ref<number>(1)

function nextPage() {
  if (currentPage.value >= props.pagesCount) {
    return
  }

  currentPage.value += 1

  //TODO: asd

  console.log(currentPage.value)

  changePage()
}

function prevPage() {
  if (currentPage.value <= 1) {
    return
  }

  currentPage.value -= 1

  changePage()
}

function changePage() {
  emits('changePage', currentPage.value)
}

onMounted(() => {
  currentPage.value = props.page
})
</script>

<template>
  <div class="pagination">
    <button @click="prevPage">{{ '<' }}</button>
    <p>{{ page }}</p>
    <button @click="nextPage">></button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin: 70px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  button {
    appearance: none;
    /*  safari  */
    -webkit-appearance: none;
    /*  other styles for aesthetics */
    font-size: 1.15rem;
    padding: 7px 10px;
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 0.25rem;
    color: #000;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      box-shadow:
        rgba(0, 0, 0, 0.07) 0px 1px 2px,
        rgba(0, 0, 0, 0.07) 0px 2px 4px,
        rgba(0, 0, 0, 0.07) 0px 4px 8px,
        rgba(0, 0, 0, 0.07) 0px 8px 16px,
        rgba(0, 0, 0, 0.07) 0px 16px 32px,
        rgba(0, 0, 0, 0.07) 0px 32px 64px;
    }
  }

  p {
    font-size: 1.15rem;
  }
}
</style>

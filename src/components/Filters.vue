<script setup lang="ts">
import { ref } from 'vue'

import type { CharacterStatusType } from '@/types/characters'

interface IFiltersProps {
  characterStatuses: CharacterStatusType[]
}

const props = defineProps<IFiltersProps>()
const emits = defineEmits(['getCharacters'])

const currentCharacterStatus = ref<CharacterStatusType>('No status')
const currentCharacterName = ref<string>('')

function getCharacters() {
  const params = {
    name: currentCharacterName.value,
    status: currentCharacterStatus.value
  }

  emits('getCharacters', params)
}
</script>

<template>
  <form @submit.prevent>
    <input
      type="text"
      class="name__input"
      placeholder="Введите имя персонажа"
      v-model="currentCharacterName"
    />
    <div class="custom-select">
      <select v-model="currentCharacterStatus">
        <option v-for="status in props.characterStatuses" :value="status" :key="status">
          {{ status }}
        </option>
      </select>
    </div>
    <button class="btn" @click="getCharacters">Применить</button>
  </form>
</template>

<style scoped lang="scss">
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.custom-select {
  position: relative;
}

select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em 6em 0.675em 1em;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
  cursor: pointer;
}

.custom-select::before,
.custom-select::after {
  --size: 0.3rem;
  content: '';
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.custom-select::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid black;
  top: 40%;
}

.custom-select::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid black;
  top: 55%;
}

.btn {
  appearance: none;
  /*  safari  */
  -webkit-appearance: none;
  /*  other styles for aesthetics */
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em;
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

.name__input {
  appearance: none;
  /*  safari  */
  -webkit-appearance: none;
  /*  other styles for aesthetics */
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
  transition: 0.3s ease-in-out;
}
</style>

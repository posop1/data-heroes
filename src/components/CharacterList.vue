<script setup lang="ts">
import type { ICharacter } from '@/types/characters'

interface ICharacterListProps {
  characters: ICharacter[]
}

const props = defineProps<ICharacterListProps>()
</script>

<template>
  <div class="characters__list">
    <div v-for="character in props.characters" :key="character.id">
      <img :src="character.image" :alt="character.name + ' image'" />
      {{ character.name }}
      {{ character.status }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.characters__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>

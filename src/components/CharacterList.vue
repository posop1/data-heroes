<script setup lang="ts">
import CharacterItem from './CharacterItem.vue'
import type { ICharacter } from '@/types/characters'

interface ICharacterListProps {
  characters: ICharacter[]
}

const props = defineProps<ICharacterListProps>()
</script>

<template>
  <div class="characters__list">
    <CharacterItem
      v-for="character in props.characters"
      :key="character.id"
      :character="character"
    />
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

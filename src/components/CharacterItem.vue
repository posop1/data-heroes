<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

import type { ICharacter, IEpisode } from '@/types/characters'

interface ICharacterItemProps {
  character: ICharacter
}

const props = defineProps<ICharacterItemProps>()

const lastSeenEpisode = ref<IEpisode>()

async function getEpisode() {
  try {
    const { data } = await axios.get(props.character.episode[0])

    lastSeenEpisode.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getEpisode()
})
</script>

<template>
  <div class="character">
    <img :src="props.character.image" :alt="props.character.name + ' image'" />
    <div class="info">
      <div>
        <h2>{{ props.character.name }}</h2>
        <span>{{ props.character.status }} - {{ props.character.species }}</span>
      </div>
      <div>
        <span class="grey__text">Последняя локация:</span>
        <span>{{ props.character.location.name }}</span>
      </div>
      <div v-if="lastSeenEpisode">
        <span class="grey__text">Впервые замечен в эпизоде:</span>
        <span>{{ lastSeenEpisode.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.character {
  max-width: 600px;
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  img {
    transition: opacity 0.5s ease 0s;
    object-position: center center;
    object-fit: cover;
    overflow-clip-margin: content-box;
    overflow: clip;

    @media (max-width: 768px) {
      height: 300px;
      width: 100%;
    }
  }

  .info {
    padding: 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    gap: 25px;

    h2 {
      font-size: 1.5rem;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .grey__text {
        color: #b2b2b2;
      }
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    height: 100%;
  }
}
</style>

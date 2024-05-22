<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CharacterList from '@/components/CharacterList.vue'
import Pagination from '@/components/Pagination.vue'
import Filters from '@/components/Filters.vue'

import { type CharacterStatusType, type ICharactersResponse } from '@/types/characters'
import api from '@/api/instance'
import { STATUS } from '@/types/common'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const characters = ref<ICharactersResponse>()

const currentPage = ref<number>(1)

const status = ref<STATUS>(STATUS.LOADING)

async function getCharacters(
  filterParams?: { name: string; status: CharacterStatusType },
  page?: number
) {
  try {
    status.value = STATUS.LOADING

    if (page && page > 1) {
      console.log('asd')

      currentPage.value = page
    }

    if (filterParams) {
      const { data } = await api.get<ICharactersResponse>('/character', {
        params: {
          page: currentPage.value,
          name: filterParams.name,
          status: filterParams.status === 'No status' ? '' : filterParams.status
        }
      })

      characters.value = data
    } else {
      const { data } = await api.get<ICharactersResponse>('/character', {
        params: {
          page: currentPage.value
        }
      })

      characters.value = data
    }

    status.value = STATUS.COMPLETED
  } catch (error) {
    console.log(error)
    STATUS.ERROR
  }
}

function changePage(page: number) {
  console.log(page)

  currentPage.value = page

  router.push({
    query: {
      page: currentPage.value
    }
  })

  getCharacters()
}

onMounted(() => {
  if (route.query.page && Number(route.query.page) > 1) {
    currentPage.value = Number(route.query.page)
  }

  getCharacters()
})
</script>

<template>
  <main v-if="status === STATUS.COMPLETED && characters">
    <Filters
      :character-statuses="['No status', 'alive', 'dead', 'unknown']"
      @get-characters="getCharacters"
    />
    <CharacterList :characters="characters.results" />
    <Pagination
      :page="currentPage"
      :pages-count="characters.info.pages"
      @change-page="changePage"
    />
  </main>
</template>

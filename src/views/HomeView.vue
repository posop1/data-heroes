<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CharacterList from '@/components/CharacterList.vue'
import Pagination from '@/components/Pagination.vue'
import Filters from '@/components/Filters.vue'
import Loader from '@/components/ui/Loader.vue'
import ErrorBox from '@/components/ui/ErrorBox.vue'

import { type CharacterStatusType, type ICharactersResponse } from '@/types/characters'
import api from '@/api/instance'
import { STATUS } from '@/types/common'

const route = useRoute()
const router = useRouter()

const characters = ref<ICharactersResponse>()

const currentPage = ref<number>(1)
const currentCharacterName = ref<string>('')
const currentCharacterStatus = ref<CharacterStatusType>('No status')

const requestStatus = ref<STATUS>(STATUS.LOADING)
const errorMessage = ref<string>('')

async function getCharacters(
  filterParams?: { name: string; status: CharacterStatusType },
  page?: number
) {
  try {
    requestStatus.value = STATUS.LOADING

    if (page && page > 1) {
      currentPage.value = page
    }

    currentCharacterName.value = filterParams ? filterParams.name : ''

    currentCharacterStatus.value = filterParams ? filterParams.status : 'No status'

    router.push({
      query: {
        page: currentPage.value
      }
    })

    const { data } = await api.get<ICharactersResponse>('/character', {
      params: {
        page: currentPage.value,
        name: currentCharacterName.value,
        status: currentCharacterStatus.value === 'No status' ? '' : currentCharacterStatus.value
      }
    })

    characters.value = data

    requestStatus.value = STATUS.COMPLETED
  } catch (error: any) {
    console.log(error)
    errorMessage.value = error.message
    requestStatus.value = STATUS.ERROR
  }
}

async function changePage(page: number) {
  currentPage.value = page

  router.push({
    query: {
      page: currentPage.value
    }
  })

  await getCharacters()
}

onMounted(() => {
  if (route.query.page && Number(route.query.page) > 1) {
    currentPage.value = Number(route.query.page)
  }

  getCharacters()
})
</script>

<template>
  <Filters
    :character-statuses="['No status', 'alive', 'dead', 'unknown']"
    @get-characters="getCharacters"
  />
  <main v-if="requestStatus === STATUS.COMPLETED && characters">
    <CharacterList :characters="characters.results" />
    <Pagination
      :page="currentPage"
      :pages-count="characters.info.pages"
      @change-page="changePage"
    />
  </main>
  <Loader v-else-if="requestStatus === STATUS.LOADING" />
  <ErrorBox v-else-if="requestStatus === STATUS.ERROR" :message="errorMessage" />
</template>

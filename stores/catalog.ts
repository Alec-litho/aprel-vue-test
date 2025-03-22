// stores/catalog.ts
import { defineStore } from 'pinia'
import axios from 'axios'

interface Country {
  name: {
    common: string
    official: string
  }
  region: string
  capital: string[]
  population: number
  flags: {
    png: string
  }
}

const API_BASE_URL = 'https://restcountries.com/v3.1'

export const useCatalogStore = defineStore('catalog', () => {
  const state = reactive({
    items: [] as Country[],
    searchQuery: '',
    viewMode: 'grid' as 'grid' | 'list',
    currentPage: 1,
    itemsPerPage: 12
  })

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`)
      state.items = response.data
    } catch (error) {
      console.error('Error fetching countries:', error)
      state.items = []
    }
  }

  const filteredItems = computed(() => {
    const query = state.searchQuery.toLowerCase()
    if (!query) return state.items

    return state.items.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(innerValue =>
            String(innerValue).toLowerCase().includes(query)
          )
        }
        return String(value).toLowerCase().includes(query)
      })
    })
  })

  const paginatedItems = computed(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage
    const end = start + state.itemsPerPage
    return filteredItems.value.slice(start, end)
  })

  const totalPages = computed(() => 
    Math.ceil(filteredItems.value.length / state.itemsPerPage)
  )

  return {
    ...toRefs(state),
    fetchItems,
    filteredItems,
    paginatedItems,
    totalPages
  }
})
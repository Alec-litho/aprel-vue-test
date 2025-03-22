<template>
    <div class="container">
      <!-- Controls -->
      <div class="controls">
        <input
          v-model="store.searchQuery"
          type="text"
          placeholder="Search countries..."
          class="search-input"
        >
        <div class="view-toggle">
          <button
            @click="store.viewMode = 'grid'"
            :class="'btn ', { active: store.viewMode === 'grid' }"
          >
            Grid
          </button>
          <button
            @click="store.viewMode = 'list'"
            :class="'btn ', { active: store.viewMode === 'list' }"
          >
            List
          </button>
        </div>
      </div>
  
      <div :class="['items-container', store.viewMode]">
        <div
          v-for="item in store.paginatedItems"
          :key="item.name.common"
          class="item-card"
          @click="openDetails(item)"
        >
          <img :src="item.flags.png" :alt="item.name.common + ' flag'">
          <h3>{{ item.name.common }}</h3>
          <p>{{ item.region }}</p>
        </div>
      </div>
  
      <div class="pagination">
        <button
          v-for="page in store.totalPages"
          :key="page"
          @click="store.currentPage = page"
          :class="{ active: store.currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
  
      <Modal v-if="selectedItem" :item="selectedItem" @close="selectedItem = null" />
    </div>
  </template>
  
  <script setup lang="ts">
  const store = useCatalogStore()
  const selectedItem = ref<Country | null>(null)
  
  onMounted(() => {
    store.fetchItems()
  })
  
  const openDetails = (item: Country) => {
    selectedItem.value = item
  }
  </script>
  
  <style scoped lang="scss">
  @import '~/assets/scss/main';
  </style>
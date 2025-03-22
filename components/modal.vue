<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>{{ item.name.official }}</h2>
        <img :src="item.flags.png" :alt="item.name.common + ' flag'">
        <div class="details">
          <p><strong>Region:</strong> {{ item.region }}</p>
          <p><strong>Capital:</strong> {{ item.capital?.[0] || 'N/A' }}</p>
          <p><strong>Population:</strong> {{ item.population.toLocaleString() }}</p>
        </div>
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    item: Country
  }>()
  
  defineEmits(['close'])
  </script>
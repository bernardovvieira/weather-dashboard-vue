<template>
  <div class="relative w-64">
    <input
      v-model="query"
      @input="fetchCities"
      @keydown.enter.prevent="submitSelected"
      placeholder="Enter a location..."
      class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      autocomplete="off"
    />
    <ul
      v-if="suggestions.length"
      class="absolute bg-white border border-gray-300 rounded w-full max-h-48 overflow-auto z-10"
    >
      <li
        v-for="(city, index) in suggestions"
        :key="index"
        @click="selectCity(city)"
        class="px-4 py-2 cursor-pointer hover:bg-blue-100"
      >
        {{ city.name }}, {{ city.state ? city.state + ', ' : '' }}{{ city.country }}
      </li>
    </ul>
    <p v-if="!suggestions.length && query.length >= 3 && !selectedCity" class="text-gray-500 p-2">
      No locations found.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const API_KEY = '12d6ed4ea2a149c930cedc9cf1368a26'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

const query = ref('')
const suggestions = ref([])
const selectedCity = ref(null)
const emit = defineEmits(['search-weather'])
let debounceTimer = null

async function fetchCities() {
  clearTimeout(debounceTimer)
  if (query.value.trim().length < 3) {
    suggestions.value = []
    return
  }
  debounceTimer = setTimeout(async () => {
    try {
      const url = `${GEO_URL}?q=${encodeURIComponent(query.value)}&limit=5&appid=${API_KEY}`
      const res = await fetch(url)
      suggestions.value = res.ok ? await res.json() : []
    } catch {
      suggestions.value = []
    }
  }, 300)
}

function selectCity(city) {
  selectedCity.value = city
  query.value = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
  suggestions.value = []
  emit('search-weather', { lat: city.lat, lon: city.lon })
}

function submitSelected() {
  if (selectedCity.value) {
    emit('search-weather', { lat: selectedCity.value.lat, lon: selectedCity.value.lon })
    suggestions.value = []
  } else if (query.value.trim().length > 0) {
    suggestions.value = []
  }
}
</script>
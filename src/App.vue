<template>
  <div class="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center px-4 py-6">
    <!-- Centered content before search -->
    <div
      v-if="!currentWeather"
      class="flex-grow w-full flex flex-col justify-center items-center max-w-md text-center"
      style="min-height: 80vh"
    >
      <h1 class="text-4xl sm:text-5xl font-semibold text-royal-blue mb-6">Weather Dashboard</h1>
      <WeatherSearch @search-weather="fetchWeather" />
      <div class="mt-8 w-full">
        <div class="bg-white p-6 rounded-lg shadow text-center">
          <p class="text-gray-700 text-base">
            <i class="fas fa-info-circle text-gray-600 mr-1"></i>
            Enter a location and select one of the suggestions to view the current weather and forecast.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading and error messages -->
    <div v-if="loading" class="mt-6 text-royal-blue animate-pulse">Loading data...</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

    <!-- Results -->
    <transition name="fade">
      <div
        v-if="currentWeather"
        class="mt-8 w-full max-w-2xl flex flex-col items-center gap-4"
      >
        <h1 class="text-4xl font-semibold text-royal-blue mb-4">Weather Dashboard</h1>
        <p class="text-gray-600 mb-4">Current weather and forecast for the selected location.</p>
        <WeatherDisplay :weather="currentWeather" />
        <ForecastDisplay v-if="forecast" :forecast="forecast" />
        <TemperatureChartCard v-if="forecast" :forecast="forecast" />

        <button
          @click="resetSearch"
          class="mt-6 px-6 py-2 bg-white text-royal-blue border border-blue-400 rounded-md hover:bg-blue-100 transition"
        >
          Start a new search
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherSearch from './components/WeatherSearch.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import ForecastDisplay from './components/ForecastDisplay.vue'
import TemperatureChartCard from './components/TemperatureChartCard.vue'
import { getCurrentWeather, getForecast } from './services/backendApi.js'

const currentWeather = ref(null)
const forecast = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchWeather(coords) {
  try {
    error.value = null
    loading.value = true
    currentWeather.value = await getCurrentWeather(coords.lat, coords.lon)
    forecast.value = await getForecast(coords.lat, coords.lon)
  } catch {
    error.value = 'Failed to fetch weather data. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetSearch() {
  currentWeather.value = null
  forecast.value = null
  error.value = null
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
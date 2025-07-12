<template>
  <div class="mt-8 bg-white p-6 rounded-2xl shadow w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4">Upcoming Hours</h2>
    <div class="grid grid-cols-3 gap-4 text-center text-sm">
      <div
        v-for="(item, index) in filteredForecast"
        :key="index"
        class="bg-gray-50 p-2 rounded-xl shadow hover:shadow-lg transition"
      >
        <p>{{ formatDate(item.dt_txt) }}</p>
        <img
          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
          :alt="item.weather[0].description"
          class="mx-auto w-12 h-12"
        />
        <p>{{ Math.round(item.main.temp) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ forecast: Object })
const filteredForecast = computed(() => props.forecast.list.slice(0, 6))

function formatDate(dateTimeStr) {
  const date = new Date(dateTimeStr)
  return date.getHours().toString().padStart(2, '0') + 'h'
}
</script>
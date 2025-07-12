<template>
  <div class="mt-8 bg-white p-6 rounded-2xl shadow w-full max-w-md">
    <h2 class="text-2xl font-bold mb-2">{{ weather.name }}, {{ weather.sys.country }}</h2>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-lg capitalize">
          {{ weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1) }}
        </p>
        <p class="text-4xl font-bold">{{ Math.round(weather.main.temp) }}°C</p>
        <p class="text-sm text-gray-500">Feels like: {{ Math.round(weather.main.feels_like) }}°C</p>
        <p class="text-sm text-gray-500">Humidity: {{ weather.main.humidity }}%</p>
        <p class="text-sm text-gray-500">Wind: {{ weather.wind.speed }} m/s</p>
      </div>
      <img
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="`Weather icon`"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ weather: Object })
</script>
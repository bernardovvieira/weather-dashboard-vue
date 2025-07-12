<template>
  <div class="mt-6 bg-white p-6 rounded-2xl shadow w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4">Temperature Chart</h2>
    <TemperatureChart :hourlyData="filteredForecast" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TemperatureChart from './TemperatureChart.vue'

const props = defineProps({ forecast: Object })
const filteredForecast = computed(() => props.forecast.list.slice(0, 6))
</script>
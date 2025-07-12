<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({ hourlyData: { type: Array, default: () => [] } })
const canvasRef = ref(null)
let chartInstance = null

function buildChart() {
  if (!canvasRef.value) return
  if (chartInstance) chartInstance.destroy()
  if (!props.hourlyData.length) return

  const labels = props.hourlyData.map(item => new Date(item.dt_txt).getHours() + 'h')
  const temps = props.hourlyData.map(item => Math.round(item.main.temp))

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temps,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => value + '°C',
          },
        },
      },
    },
  })
}

onMounted(buildChart)
watch(() => props.hourlyData, buildChart, { deep: true })
</script>
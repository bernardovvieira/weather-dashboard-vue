const API_KEY = '12d6ed4ea2a149c930cedc9cf1368a26'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

export async function getCoordinates(city) {
  const url = `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch coordinates')
  const data = await res.json()
  if (!data.length) throw new Error('City not found')
  return { lat: data[0].lat, lon: data[0].lon }
}

export async function getCurrentWeather(lat, lon) {
  const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch current weather data')
  return await res.json()
}

export async function getForecast(lat, lon) {
  const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch forecast data')
  return await res.json()
}
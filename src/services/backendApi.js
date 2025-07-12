export async function getCurrentWeather(lat, lon) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
  if (!res.ok) throw new Error('API error while fetching current weather')
  return await res.json()
}

export async function getForecast(lat, lon) {
  const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`)
  if (!res.ok) throw new Error('API error while fetching forecast')
  return await res.json()
}
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import NodeCache from 'node-cache'
import rateLimit from 'express-rate-limit'

const app = express()
const cache = new NodeCache({ stdTTL: 600 }) // cache TTL: 10 minutes
const PORT = process.env.PORT || 3000
const API_KEY = '12d6ed4ea2a149c930cedc9cf1368a26'

// Rate limiting: 60 requests per IP per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Request limit exceeded. Please try again shortly.',
})

app.use(cors())
app.use('/api/', limiter) // apply rate limiting to API routes

// Route: Current weather
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query
  const cacheKey = `weather-${lat}-${lon}`
  const cached = cache.get(cacheKey)
  if (cached) return res.json(cached)

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    )
    const data = await response.json()
    cache.set(cacheKey, data)
    res.json(data)
  } catch {
    res.status(500).json({ error: 'Failed to fetch current weather data.' })
  }
})

// Route: Weather forecast
app.get('/api/forecast', async (req, res) => {
  const { lat, lon } = req.query
  const cacheKey = `forecast-${lat}-${lon}`
  const cached = cache.get(cacheKey)
  if (cached) return res.json(cached)

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    )
    const data = await response.json()
    cache.set(cacheKey, data)
    res.json(data)
  } catch {
    res.status(500).json({ error: 'Failed to fetch forecast data.' })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
import express from 'express'
import cors from 'cors'
import { vocabularyRouter } from './routes/vocabulary.js'
import { exerciseRouter } from './routes/exercises.js'
import { progressRouter } from './routes/progress.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/vocabulary', vocabularyRouter)
app.use('/api/exercises', exerciseRouter)
app.use('/api/progress', progressRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Crossanto API is running!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

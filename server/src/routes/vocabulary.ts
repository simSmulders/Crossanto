import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const vocabularyRouter = Router()

// Get all vocabulary words
vocabularyRouter.get('/', async (_req, res) => {
  try {
    const words = await prisma.word.findMany({
      include: { category: true },
    })
    res.json(words)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vocabulary' })
  }
})

// Get vocabulary by category
vocabularyRouter.get('/category/:categoryId', async (req, res) => {
  try {
    const words = await prisma.word.findMany({
      where: { categoryId: req.params.categoryId },
      include: { category: true },
    })
    res.json(words)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vocabulary' })
  }
})

// Get all categories
vocabularyRouter.get('/categories', async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { words: true } } },
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// Get random words for practice
vocabularyRouter.get('/random/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10
    const words = await prisma.word.findMany()
    const shuffled = words.sort(() => 0.5 - Math.random())
    res.json(shuffled.slice(0, count))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random words' })
  }
})

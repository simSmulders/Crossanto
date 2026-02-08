import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const exerciseRouter = Router()

// Get fill-in-the-blank exercises (optionally filtered by category)
exerciseRouter.get('/fill-blank', async (req, res) => {
  try {
    const categoryId = req.query.categoryId as string | undefined
    const sentences = await prisma.sentence.findMany({
      where: categoryId ? { word: { categoryId } } : undefined,
      include: { word: { include: { category: true } } },
    })
    res.json(sentences)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' })
  }
})

// Get random fill-in-the-blank exercises (optionally filtered by category)
exerciseRouter.get('/fill-blank/random/:count', async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 5
    const categoryId = req.query.categoryId as string | undefined
    const sentences = await prisma.sentence.findMany({
      where: categoryId ? { word: { categoryId } } : undefined,
      include: { word: { include: { category: true } } },
    })
    const shuffled = sentences.sort(() => 0.5 - Math.random())
    res.json(shuffled.slice(0, count))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' })
  }
})

// Check answer for fill-in-the-blank
exerciseRouter.post('/fill-blank/check', async (req, res) => {
  try {
    const { sentenceId, answer } = req.body
    const sentence = await prisma.sentence.findUnique({
      where: { id: sentenceId },
      include: { word: true },
    })

    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' })
    }

    const isCorrect = sentence.word.french.toLowerCase() === answer.toLowerCase()
    res.json({
      correct: isCorrect,
      correctAnswer: sentence.word.french,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to check answer' })
  }
})

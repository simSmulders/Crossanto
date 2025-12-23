import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const progressRouter = Router()

// Get user progress stats
progressRouter.get('/stats', async (_req, res) => {
  try {
    const totalWords = await prisma.word.count()
    const learnedWords = await prisma.wordProgress.count({
      where: { learned: true },
    })
    const totalPractices = await prisma.practiceSession.count()

    res.json({
      totalWords,
      learnedWords,
      totalPractices,
      progressPercentage: totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress stats' })
  }
})

// Record practice result
progressRouter.post('/practice', async (req, res) => {
  try {
    const { wordId, correct } = req.body

    // Update or create word progress
    const existingProgress = await prisma.wordProgress.findFirst({
      where: { wordId },
    })

    if (existingProgress) {
      await prisma.wordProgress.update({
        where: { id: existingProgress.id },
        data: {
          timesCorrect: correct ? existingProgress.timesCorrect + 1 : existingProgress.timesCorrect,
          timesIncorrect: !correct ? existingProgress.timesIncorrect + 1 : existingProgress.timesIncorrect,
          learned: correct && existingProgress.timesCorrect >= 2,
          lastPracticed: new Date(),
        },
      })
    } else {
      await prisma.wordProgress.create({
        data: {
          wordId,
          timesCorrect: correct ? 1 : 0,
          timesIncorrect: correct ? 0 : 1,
          learned: false,
        },
      })
    }

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to record practice' })
  }
})

// Get words that need review (spaced repetition)
progressRouter.get('/review', async (_req, res) => {
  try {
    const wordsToReview = await prisma.wordProgress.findMany({
      where: {
        OR: [
          { learned: false },
          {
            lastPracticed: {
              lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // More than 1 day ago
            },
          },
        ],
      },
      include: { word: true },
      take: 10,
    })
    res.json(wordsToReview)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review words' })
  }
})

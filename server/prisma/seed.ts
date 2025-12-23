/// <reference types="node" />
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const greetings = await prisma.category.upsert({
    where: { name: 'Greetings' },
    update: {},
    create: {
      name: 'Greetings',
      description: 'Common French greetings and phrases',
      icon: '👋',
    },
  })

  const food = await prisma.category.upsert({
    where: { name: 'Food' },
    update: {},
    create: {
      name: 'Food',
      description: 'French food and drink vocabulary',
      icon: '🍽️',
    },
  })

  const numbers = await prisma.category.upsert({
    where: { name: 'Numbers' },
    update: {},
    create: {
      name: 'Numbers',
      description: 'Numbers in French',
      icon: '🔢',
    },
  })

  const colors = await prisma.category.upsert({
    where: { name: 'Colors' },
    update: {},
    create: {
      name: 'Colors',
      description: 'Colors in French',
      icon: '🎨',
    },
  })

  const family = await prisma.category.upsert({
    where: { name: 'Family' },
    update: {},
    create: {
      name: 'Family',
      description: 'Family members and relationships',
      icon: '👨‍👩‍👧‍👦',
    },
  })

  // Create words for Greetings
  const greetingWords = [
    { french: 'Bonjour', english: 'Hello / Good morning', pronunciation: 'bohn-ZHOOR' },
    { french: 'Bonsoir', english: 'Good evening', pronunciation: 'bohn-SWAHR' },
    { french: 'Salut', english: 'Hi / Bye (informal)', pronunciation: 'sah-LUE' },
    { french: 'Au revoir', english: 'Goodbye', pronunciation: 'oh ruh-VWAHR' },
    { french: 'Merci', english: 'Thank you', pronunciation: 'mehr-SEE' },
    { french: "S'il vous plaît", english: 'Please (formal)', pronunciation: 'seel voo PLEH' },
    { french: 'Excusez-moi', english: 'Excuse me', pronunciation: 'ex-kew-zay-MWAH' },
    { french: 'Comment allez-vous?', english: 'How are you? (formal)', pronunciation: 'koh-mahn tah-lay VOO' },
    { french: 'Je vais bien', english: "I'm doing well", pronunciation: 'zhuh vay BYEH' },
    { french: 'Enchanté', english: 'Nice to meet you', pronunciation: 'ahn-shahn-TAY' },
  ]

  for (const word of greetingWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: greetings.id } },
      update: {},
      create: { ...word, categoryId: greetings.id },
    })
  }

  // Create words for Food
  const foodWords = [
    { french: 'le pain', english: 'bread', pronunciation: 'luh PAH', gender: 'm' },
    { french: 'le fromage', english: 'cheese', pronunciation: 'luh froh-MAHZH', gender: 'm' },
    { french: 'le vin', english: 'wine', pronunciation: 'luh VAH', gender: 'm' },
    { french: 'la baguette', english: 'baguette', pronunciation: 'lah bah-GET', gender: 'f' },
    { french: 'le croissant', english: 'croissant', pronunciation: 'luh kwah-SAHN', gender: 'm' },
    { french: "l'eau", english: 'water', pronunciation: 'LOH', gender: 'f' },
    { french: 'le café', english: 'coffee', pronunciation: 'luh kah-FAY', gender: 'm' },
    { french: 'la pomme', english: 'apple', pronunciation: 'lah POM', gender: 'f' },
    { french: 'le poulet', english: 'chicken', pronunciation: 'luh poo-LAY', gender: 'm' },
    { french: 'la salade', english: 'salad', pronunciation: 'lah sah-LAD', gender: 'f' },
  ]

  for (const word of foodWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: food.id } },
      update: {},
      create: { ...word, categoryId: food.id },
    })
  }

  // Create words for Numbers
  const numberWords = [
    { french: 'un', english: 'one', pronunciation: 'UH' },
    { french: 'deux', english: 'two', pronunciation: 'DUH' },
    { french: 'trois', english: 'three', pronunciation: 'TWAH' },
    { french: 'quatre', english: 'four', pronunciation: 'KAT-ruh' },
    { french: 'cinq', english: 'five', pronunciation: 'SANK' },
    { french: 'six', english: 'six', pronunciation: 'SEES' },
    { french: 'sept', english: 'seven', pronunciation: 'SET' },
    { french: 'huit', english: 'eight', pronunciation: 'WEET' },
    { french: 'neuf', english: 'nine', pronunciation: 'NUF' },
    { french: 'dix', english: 'ten', pronunciation: 'DEES' },
  ]

  for (const word of numberWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: numbers.id } },
      update: {},
      create: { ...word, categoryId: numbers.id },
    })
  }

  // Create words for Colors
  const colorWords = [
    { french: 'rouge', english: 'red', pronunciation: 'ROOZH' },
    { french: 'bleu', english: 'blue', pronunciation: 'BLUH' },
    { french: 'vert', english: 'green', pronunciation: 'VEHR' },
    { french: 'jaune', english: 'yellow', pronunciation: 'ZHOHN' },
    { french: 'noir', english: 'black', pronunciation: 'NWAHR' },
    { french: 'blanc', english: 'white', pronunciation: 'BLAHN' },
    { french: 'orange', english: 'orange', pronunciation: 'oh-RAHNZH' },
    { french: 'rose', english: 'pink', pronunciation: 'ROHZ' },
    { french: 'violet', english: 'purple', pronunciation: 'vee-oh-LAY' },
    { french: 'gris', english: 'gray', pronunciation: 'GREE' },
  ]

  for (const word of colorWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: colors.id } },
      update: {},
      create: { ...word, categoryId: colors.id },
    })
  }

  // Create words for Family
  const familyWords = [
    { french: 'la mère', english: 'mother', pronunciation: 'lah MEHR', gender: 'f' },
    { french: 'le père', english: 'father', pronunciation: 'luh PEHR', gender: 'm' },
    { french: 'la soeur', english: 'sister', pronunciation: 'lah SUHR', gender: 'f' },
    { french: 'le frère', english: 'brother', pronunciation: 'luh FREHR', gender: 'm' },
    { french: 'la fille', english: 'daughter', pronunciation: 'lah FEE-yuh', gender: 'f' },
    { french: 'le fils', english: 'son', pronunciation: 'luh FEES', gender: 'm' },
    { french: 'la grand-mère', english: 'grandmother', pronunciation: 'lah grahn-MEHR', gender: 'f' },
    { french: 'le grand-père', english: 'grandfather', pronunciation: 'luh grahn-PEHR', gender: 'm' },
    { french: 'la tante', english: 'aunt', pronunciation: 'lah TAHNT', gender: 'f' },
    { french: "l'oncle", english: 'uncle', pronunciation: 'LOHN-kluh', gender: 'm' },
  ]

  for (const word of familyWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: family.id } },
      update: {},
      create: { ...word, categoryId: family.id },
    })
  }

  // Create some example sentences for fill-in-the-blank
  const bonjourWord = await prisma.word.findFirst({ where: { french: 'Bonjour' } })
  const merciWord = await prisma.word.findFirst({ where: { french: 'Merci' } })
  const painWord = await prisma.word.findFirst({ where: { french: 'le pain' } })
  const cafeWord = await prisma.word.findFirst({ where: { french: 'le café' } })
  const rougeWord = await prisma.word.findFirst({ where: { french: 'rouge' } })

  if (bonjourWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-1' },
      update: {},
      create: {
        id: 'sentence-1',
        french: 'Bonjour, comment allez-vous?',
        english: 'Hello, how are you?',
        wordId: bonjourWord.id,
        blankIndex: 0,
      },
    })
  }

  if (merciWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-2' },
      update: {},
      create: {
        id: 'sentence-2',
        french: 'Merci beaucoup pour votre aide.',
        english: 'Thank you very much for your help.',
        wordId: merciWord.id,
        blankIndex: 0,
      },
    })
  }

  if (painWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-3' },
      update: {},
      create: {
        id: 'sentence-3',
        french: "J'achète le pain à la boulangerie.",
        english: 'I buy bread at the bakery.',
        wordId: painWord.id,
        blankIndex: 1,
      },
    })
  }

  if (cafeWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-4' },
      update: {},
      create: {
        id: 'sentence-4',
        french: 'Je voudrais le café, s\'il vous plaît.',
        english: 'I would like coffee, please.',
        wordId: cafeWord.id,
        blankIndex: 2,
      },
    })
  }

  if (rougeWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-5' },
      update: {},
      create: {
        id: 'sentence-5',
        french: 'La voiture rouge est très belle.',
        english: 'The red car is very beautiful.',
        wordId: rougeWord.id,
        blankIndex: 2,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

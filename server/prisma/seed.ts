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

  // Create thematic categories
  const eatingOut = await prisma.category.upsert({
    where: { name: 'Eating Out' },
    update: {},
    create: {
      name: 'Eating Out',
      description: 'Vocabulary for dining at restaurants and cafés',
      icon: '🍴',
    },
  })

  const conversation = await prisma.category.upsert({
    where: { name: 'Conversation' },
    update: {},
    create: {
      name: 'Conversation',
      description: 'Everyday phrases for casual conversation',
      icon: '💬',
    },
  })

  const holiday = await prisma.category.upsert({
    where: { name: 'Holiday' },
    update: {},
    create: {
      name: 'Holiday',
      description: 'Travel and vacation vocabulary',
      icon: '✈️',
    },
  })

  // Create words for Eating Out
  const eatingOutWords = [
    { french: 'le menu', english: 'the menu', pronunciation: 'luh meh-NEW', gender: 'm' },
    { french: 'le serveur', english: 'the waiter', pronunciation: 'luh sehr-VUHR', gender: 'm' },
    { french: "l'addition", english: 'the bill / check', pronunciation: 'lah-dee-SYOHN', gender: 'f' },
    { french: 'le plat', english: 'the dish / course', pronunciation: 'luh PLAH', gender: 'm' },
    { french: 'la boisson', english: 'the drink', pronunciation: 'lah bwah-SOHN', gender: 'f' },
    { french: 'le pourboire', english: 'the tip', pronunciation: 'luh poor-BWAHR', gender: 'm' },
    { french: 'la réservation', english: 'the reservation', pronunciation: 'lah ray-zehr-vah-SYOHN', gender: 'f' },
    { french: "l'entrée", english: 'the starter / appetizer', pronunciation: 'lahn-TRAY', gender: 'f' },
    { french: 'le dessert', english: 'the dessert', pronunciation: 'luh deh-SEHR', gender: 'm' },
    { french: 'la carte', english: 'the menu card', pronunciation: 'lah KART', gender: 'f' },
  ]

  for (const word of eatingOutWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: eatingOut.id } },
      update: {},
      create: { ...word, categoryId: eatingOut.id },
    })
  }

  // Create words for Conversation
  const conversationWords = [
    { french: "Comment ça va?", english: 'How are you? (informal)', pronunciation: 'koh-MAHN sah VAH' },
    { french: 'Ça va bien', english: "I'm fine", pronunciation: 'sah vah BYEH' },
    { french: "Je m'appelle", english: 'My name is', pronunciation: 'zhuh mah-PEL' },
    { french: "D'où venez-vous?", english: 'Where are you from?', pronunciation: 'DOO vuh-nay VOO' },
    { french: 'Je suis désolé', english: "I'm sorry", pronunciation: 'zhuh swee day-zoh-LAY' },
    { french: 'Bien sûr', english: 'Of course', pronunciation: 'byeh SOOR' },
    { french: 'Pas de problème', english: 'No problem', pronunciation: 'pah duh proh-BLEM' },
    { french: "Je ne comprends pas", english: "I don't understand", pronunciation: 'zhuh nuh kohn-PRAHN pah' },
    { french: 'Parlez-vous anglais?', english: 'Do you speak English?', pronunciation: 'par-lay VOO ahn-GLEH' },
    { french: "À bientôt", english: 'See you soon', pronunciation: 'ah byeh-TOH' },
  ]

  for (const word of conversationWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: conversation.id } },
      update: {},
      create: { ...word, categoryId: conversation.id },
    })
  }

  // Create words for Holiday
  const holidayWords = [
    { french: "l'hôtel", english: 'the hotel', pronunciation: 'loh-TEL', gender: 'm' },
    { french: 'la plage', english: 'the beach', pronunciation: 'lah PLAHZH', gender: 'f' },
    { french: 'le billet', english: 'the ticket', pronunciation: 'luh bee-YAY', gender: 'm' },
    { french: 'la valise', english: 'the suitcase', pronunciation: 'lah vah-LEEZ', gender: 'f' },
    { french: "l'avion", english: 'the airplane', pronunciation: 'lah-VYOHN', gender: 'm' },
    { french: 'le passeport', english: 'the passport', pronunciation: 'luh pahs-POHR', gender: 'm' },
    { french: 'la gare', english: 'the train station', pronunciation: 'lah GAHR', gender: 'f' },
    { french: 'le musée', english: 'the museum', pronunciation: 'luh mew-ZAY', gender: 'm' },
    { french: 'la carte postale', english: 'the postcard', pronunciation: 'lah kart poh-STAL', gender: 'f' },
    { french: 'les vacances', english: 'the vacation / holidays', pronunciation: 'lay vah-KAHNS', gender: 'f' },
  ]

  for (const word of holidayWords) {
    await prisma.word.upsert({
      where: { french_categoryId: { french: word.french, categoryId: holiday.id } },
      update: {},
      create: { ...word, categoryId: holiday.id },
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

  // Create sentences for Eating Out category
  const menuWord = await prisma.word.findFirst({ where: { french: 'le menu', categoryId: eatingOut.id } })
  const additionWord = await prisma.word.findFirst({ where: { french: "l'addition", categoryId: eatingOut.id } })
  const dessertWord = await prisma.word.findFirst({ where: { french: 'le dessert', categoryId: eatingOut.id } })
  const platWord = await prisma.word.findFirst({ where: { french: 'le plat', categoryId: eatingOut.id } })
  const reservationWord = await prisma.word.findFirst({ where: { french: 'la réservation', categoryId: eatingOut.id } })

  if (menuWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-6' },
      update: {},
      create: {
        id: 'sentence-6',
        french: "Puis-je voir le menu, s'il vous plaît?",
        english: 'May I see the menu, please?',
        wordId: menuWord.id,
        blankIndex: 2,
      },
    })
  }

  if (additionWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-7' },
      update: {},
      create: {
        id: 'sentence-7',
        french: "L'addition, s'il vous plaît.",
        english: 'The check, please.',
        wordId: additionWord.id,
        blankIndex: 0,
      },
    })
  }

  if (dessertWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-8' },
      update: {},
      create: {
        id: 'sentence-8',
        french: 'Je voudrais le dessert au chocolat.',
        english: 'I would like the chocolate dessert.',
        wordId: dessertWord.id,
        blankIndex: 2,
      },
    })
  }

  if (platWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-9' },
      update: {},
      create: {
        id: 'sentence-9',
        french: 'Le plat du jour est excellent.',
        english: 'The dish of the day is excellent.',
        wordId: platWord.id,
        blankIndex: 0,
      },
    })
  }

  if (reservationWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-10' },
      update: {},
      create: {
        id: 'sentence-10',
        french: "J'ai une réservation pour deux personnes.",
        english: 'I have a reservation for two people.',
        wordId: reservationWord.id,
        blankIndex: 2,
      },
    })
  }

  // Create sentences for Conversation category
  const caVaWord = await prisma.word.findFirst({ where: { french: "Comment ça va?", categoryId: conversation.id } })
  const appelleWord = await prisma.word.findFirst({ where: { french: "Je m'appelle", categoryId: conversation.id } })
  const desoleWord = await prisma.word.findFirst({ where: { french: 'Je suis désolé', categoryId: conversation.id } })
  const comprendsWord = await prisma.word.findFirst({ where: { french: "Je ne comprends pas", categoryId: conversation.id } })
  const parlezWord = await prisma.word.findFirst({ where: { french: 'Parlez-vous anglais?', categoryId: conversation.id } })

  if (caVaWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-11' },
      update: {},
      create: {
        id: 'sentence-11',
        french: "Comment ça va? Tout va bien?",
        english: 'How are you? Everything okay?',
        wordId: caVaWord.id,
        blankIndex: 0,
      },
    })
  }

  if (appelleWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-12' },
      update: {},
      create: {
        id: 'sentence-12',
        french: "Je m'appelle Marie, et vous?",
        english: 'My name is Marie, and you?',
        wordId: appelleWord.id,
        blankIndex: 0,
      },
    })
  }

  if (desoleWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-13' },
      update: {},
      create: {
        id: 'sentence-13',
        french: 'Je suis désolé pour le retard.',
        english: "I'm sorry for the delay.",
        wordId: desoleWord.id,
        blankIndex: 0,
      },
    })
  }

  if (comprendsWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-14' },
      update: {},
      create: {
        id: 'sentence-14',
        french: "Je ne comprends pas cette question.",
        english: "I don't understand this question.",
        wordId: comprendsWord.id,
        blankIndex: 0,
      },
    })
  }

  if (parlezWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-15' },
      update: {},
      create: {
        id: 'sentence-15',
        french: "Parlez-vous anglais? J'ai besoin d'aide.",
        english: "Do you speak English? I need help.",
        wordId: parlezWord.id,
        blankIndex: 0,
      },
    })
  }

  // Create sentences for Holiday category
  const hotelWord = await prisma.word.findFirst({ where: { french: "l'hôtel", categoryId: holiday.id } })
  const billetWord = await prisma.word.findFirst({ where: { french: 'le billet', categoryId: holiday.id } })
  const plageWord = await prisma.word.findFirst({ where: { french: 'la plage', categoryId: holiday.id } })
  const passeportWord = await prisma.word.findFirst({ where: { french: 'le passeport', categoryId: holiday.id } })
  const museeWord = await prisma.word.findFirst({ where: { french: 'le musée', categoryId: holiday.id } })

  if (hotelWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-16' },
      update: {},
      create: {
        id: 'sentence-16',
        french: "Nous restons à l'hôtel près de la mer.",
        english: "We're staying at the hotel near the sea.",
        wordId: hotelWord.id,
        blankIndex: 2,
      },
    })
  }

  if (billetWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-17' },
      update: {},
      create: {
        id: 'sentence-17',
        french: "J'ai acheté le billet pour le train.",
        english: 'I bought the ticket for the train.',
        wordId: billetWord.id,
        blankIndex: 2,
      },
    })
  }

  if (plageWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-18' },
      update: {},
      create: {
        id: 'sentence-18',
        french: 'La plage est magnifique en été.',
        english: 'The beach is beautiful in summer.',
        wordId: plageWord.id,
        blankIndex: 0,
      },
    })
  }

  if (passeportWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-19' },
      update: {},
      create: {
        id: 'sentence-19',
        french: "N'oubliez pas le passeport à la maison.",
        english: "Don't forget the passport at home.",
        wordId: passeportWord.id,
        blankIndex: 2,
      },
    })
  }

  if (museeWord) {
    await prisma.sentence.upsert({
      where: { id: 'sentence-20' },
      update: {},
      create: {
        id: 'sentence-20',
        french: "Le musée du Louvre est célèbre.",
        english: 'The Louvre Museum is famous.',
        wordId: museeWord.id,
        blankIndex: 0,
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

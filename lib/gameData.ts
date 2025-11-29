// Game Data: Animal Care Tasks, Story, Dialogue

export interface MonsterTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  realm: string;
  threatLevel: number;
  questType: 'daily' | 'weekly' | 'boss' | 'side';
  sparklePoints: number;
  magicGems: number;
  xpReward: number;
  recurrenceRule?: string;
}

// Fedora's Zoo Animal Care Templates
export const MONSTER_TEMPLATES: MonsterTemplate[] = [
  // === FEEDING TASKS (Daily Care) ===
  {
    id: 'penguin-feeding',
    name: 'Feed the Penguins',
    emoji: '🐧',
    description: 'Prepare and distribute fish to the penguin colony',
    realm: 'arctic',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'lion-feeding',
    name: 'Feed the Lions',
    emoji: '🦁',
    description: 'Prepare meat portions for the pride',
    realm: 'savanna',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'monkey-feeding',
    name: 'Feed the Monkeys',
    emoji: '🐵',
    description: 'Distribute fruits and vegetables to the primates',
    realm: 'jungle',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'elephant-feeding',
    name: 'Feed the Elephants',
    emoji: '🐘',
    description: 'Provide hay, fruits, and vegetables to the gentle giants',
    realm: 'savanna',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'giraffe-feeding',
    name: 'Feed the Giraffes',
    emoji: '🦒',
    description: 'Place fresh leaves in the tall feeding stations',
    realm: 'savanna',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'panda-feeding',
    name: 'Feed the Pandas',
    emoji: '🐼',
    description: 'Provide fresh bamboo to our bamboo-loving friends',
    realm: 'asia',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'parrot-feeding',
    name: 'Feed the Parrots',
    emoji: '🦜',
    description: 'Provide seeds, nuts, and fruits to the colorful flock',
    realm: 'aviary',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'seal-feeding',
    name: 'Feed the Seals',
    emoji: '🦭',
    description: 'Toss fish to the playful seals',
    realm: 'aquatic',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === HABITAT CLEANING (Daily Maintenance) ===
  {
    id: 'penguin-pool-clean',
    name: 'Clean Penguin Pool',
    emoji: '🧼',
    description: 'Remove debris and maintain water quality',
    realm: 'arctic',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'monkey-habitat-tidy',
    name: 'Tidy Monkey Habitat',
    emoji: '🌴',
    description: 'Clean up enrichment toys and maintain cleanliness',
    realm: 'jungle',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'elephant-yard-clean',
    name: 'Clean Elephant Yard',
    emoji: '🧹',
    description: 'Remove waste and refresh the outdoor area',
    realm: 'savanna',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'aviary-sweep',
    name: 'Sweep the Aviary',
    emoji: '🧹',
    description: 'Clean floors and perches in the bird sanctuary',
    realm: 'aviary',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === GROOMING TASKS ===
  {
    id: 'lion-grooming',
    name: 'Groom the Lions',
    emoji: '💇',
    description: 'Brush and check the lions for health',
    realm: 'savanna',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'panda-grooming',
    name: 'Groom the Pandas',
    emoji: '🧴',
    description: 'Brush bamboo bits from panda fur',
    realm: 'asia',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'elephant-bath',
    name: 'Bathe the Elephants',
    emoji: '🚿',
    description: 'Give the elephants their weekly scrub and spray',
    realm: 'savanna',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },

  // === ENRICHMENT ACTIVITIES ===
  {
    id: 'monkey-enrichment',
    name: 'Monkey Enrichment Time',
    emoji: '🎁',
    description: 'Set up puzzle feeders and toys for mental stimulation',
    realm: 'jungle',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=WE',
  },
  {
    id: 'seal-training',
    name: 'Seal Training Session',
    emoji: '🎯',
    description: 'Practice tricks and behaviors with the seals',
    realm: 'aquatic',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU',
  },
  {
    id: 'parrot-socialization',
    name: 'Parrot Socialization',
    emoji: '🗣️',
    description: 'Spend time talking and playing with the parrots',
    realm: 'aviary',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH',
  },

  // === DEEP CLEANING (Weekly Boss Battles) ===
  {
    id: 'lion-habitat-deep-clean',
    name: 'Deep Clean Lion Habitat',
    emoji: '🦁',
    description: 'Thorough scrub of the entire lion enclosure',
    realm: 'savanna',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'penguin-exhibit-overhaul',
    name: 'Penguin Exhibit Overhaul',
    emoji: '🐧',
    description: 'Complete water change and habitat refresh',
    realm: 'arctic',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'aquarium-maintenance',
    name: 'Aquarium Deep Maintenance',
    emoji: '🐠',
    description: 'Filter cleaning, water testing, and tank maintenance',
    realm: 'aquatic',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },

  // === HEALTH CHECKS ===
  {
    id: 'morning-health-rounds',
    name: 'Morning Health Rounds',
    emoji: '🩺',
    description: 'Check all animals for signs of illness or injury',
    realm: 'wholeZoo',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'veterinary-checkup',
    name: 'Veterinary Check-ups',
    emoji: '💉',
    description: 'Assist the vet with animal examinations',
    realm: 'wholeZoo',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO',
  },

  // === FOOD PREPARATION ===
  {
    id: 'morning-food-prep',
    name: 'Morning Food Prep',
    emoji: '🍎',
    description: 'Prepare all morning meals for the zoo animals',
    realm: 'kitchen',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'afternoon-food-prep',
    name: 'Afternoon Food Prep',
    emoji: '🥕',
    description: 'Prepare afternoon and evening meals',
    realm: 'kitchen',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'supply-procurement',
    name: 'Procure Animal Supplies',
    emoji: '🛒',
    description: 'Purchase food and supplies for the zoo',
    realm: 'wholeZoo',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 50,
    magicGems: 1,
    xpReward: 25,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },

  // === VISITOR AREAS ===
  {
    id: 'visitor-path-clean',
    name: 'Clean Visitor Paths',
    emoji: '🧹',
    description: 'Sweep and maintain clean pathways for guests',
    realm: 'wholeZoo',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'gift-shop-restock',
    name: 'Restock Gift Shop',
    emoji: '🎁',
    description: 'Organize and restock animal plushies and souvenirs',
    realm: 'giftShop',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=FR',
  },

  // === SPECIAL EVENTS ===
  {
    id: 'baby-animal-care',
    name: 'Baby Animal Care',
    emoji: '🍼',
    description: 'Feed and care for the newest zoo arrivals',
    realm: 'nursery',
    threatLevel: 3,
    questType: 'side',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
  },
  {
    id: 'education-program',
    name: 'Education Program',
    emoji: '📚',
    description: 'Teach visitors about animal conservation',
    realm: 'education',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },

  // === REPTILE HOUSE ===
  {
    id: 'snake-feeding',
    name: 'Feed the Snakes',
    emoji: '🐍',
    description: 'Carefully feed the reptile residents',
    realm: 'reptileHouse',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=WE',
  },
  {
    id: 'terrarium-maintenance',
    name: 'Maintain Terrariums',
    emoji: '🦎',
    description: 'Clean and maintain humidity and temperature',
    realm: 'reptileHouse',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH',
  },

  // === FRIENDLY EVENTS ===
  {
    id: 'tiger-cubs-playtime',
    name: 'Tiger Cubs Playtime',
    emoji: '🐯',
    description: 'A joyful task! Play and socialize with baby tigers',
    realm: 'nursery',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH',
  },
  {
    id: 'dolphin-show',
    name: 'Dolphin Show Preparation',
    emoji: '🐬',
    description: 'A fun task! Prepare for the dolphin demonstration',
    realm: 'aquatic',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=FR',
  },
];

// Zooey Dialogue
export const SPARKLE_DIALOGUE = {
  morning: [
    "Good morning, Fedora! The animals are waking up and ready for breakfast! Time to start the day! 🦜",
    "Rise and shine, Zookeeper! Your furry and feathered friends need you! 🌅",
    "Morning, Fedora! I hear the lions roaring - they're hungry! Let's get to work! 🦁",
    "Another beautiful day at the zoo! The animals missed you! 🦒",
  ],

  questComplete: [
    "Amazing work, Fedora! The animals are so happy! 🦜",
    "That's the dedication of a true zookeeper! Well done! 🌟",
    "FANTASTIC! Another animal well cared for! You're a natural! 🐾",
    "You make it look easy, Fedora! The animals are lucky to have you! 💚",
  ],

  criticalHit: [
    "💚 PERFECT CARE! That was absolutely wonderful! 🦜",
    "🌟 AMAZING! You've mastered that technique! 🐾",
    "🦁 FLAWLESS EXECUTION! The animals are thriving thanks to you! 💚",
  ],

  streakMilestone: [
    "🔥 {days} days in a row?! You're becoming a legendary zookeeper! 🦁",
    "🌟 {days} consecutive days! Your dedication is inspiring! 🦜",
    "💚 {days} day streak! The animals depend on you and you deliver! 🐘",
  ],

  bossEncounter: [
    "🚨 BIG TASK AHEAD! This is it, Fedora! Time for that deep clean! I believe in you! 🦜",
    "⚡ A major project appears! But I know you can handle this! Show your expertise! 🌟",
    "💪 It's time for an epic cleaning session! Let's show this habitat what a pro zookeeper can do! 🦁",
  ],

  missedDay: [
    "Even the best zookeepers need rest sometimes. The animals understand! 🦜",
    "Don't worry, Fedora! Every keeper has days off. You'll bounce back! 💚",
    "Rest is important for everyone. When you're ready, the animals will be waiting! 🌟",
  ],

  shieldEarned: [
    "🏖️ VACATION DAY EARNED! Your dedication has been rewarded! Take a break when you need it! 🦜",
    "🌟 A rest day appears! Your consistent efforts have earned you a day off! Use it wisely! 💚",
    "🏝️ DAY OFF ACQUIRED! Your {days}-day streak has granted you the power of rest! Recharge! 🦁",
  ],

  shieldUsed: [
    "🏖️ Vacation day activated! Your streak is safe today, Zookeeper! Rest well! 🦜",
    "🌟 Taking a well-deserved break! Your hard-earned streak is protected! Enjoy! 💚",
    "💚 Rest day engaged! Your {days}-day streak remains strong! Recharge and return stronger! 🏝️",
  ],

  levelUp: [
    "🌟 LEVEL UP! You're becoming an expert zookeeper, Fedora! New skills unlocked! 🦜",
    "🦁 You've reached level {level}! The animals are thriving thanks to you! 🌟",
    "💚 LEVEL {level} ACHIEVED! The zoo is in great hands! 🐘",
  ],

  secretIdentity: {
    wifeNearby: [
      "*whispers* Your wife is nearby! Act casual about the chores! 🤫",
      "Shh! Just doing normal housework... nothing special! 🤐",
      "*quiet voice* Remember: you're just cleaning up... 😉",
    ],
    kidNearby: [
      "Quick! Look normal! Can't let them see the tracking app! 🤫",
      "*whispers frantically* Family approaching! Normal chore mode! 😅",
    ],
    closeCall: [
      "That was close! Good save, Fedora! They didn't see the stats! 🤫🦜",
      "Whew! They almost saw the app! Well played! 😅💚",
      "Crisis averted! Your gamification secret remains safe! 🎭🌟",
    ],
  },

  familyHelp: [
    "⚡ UNEXPECTED HELP! Someone else helped with that task! 💚",
    "🌟 BACKUP ARRIVED! Looks like you have unexpected assistance! 🦜",
    "💚 FAMILY SUPPORT! Even without knowing about the game, they're helping! 🌟",
  ],
};

// Story Chapters
export const STORY_CHAPTERS = [
  {
    number: 0,
    title: "Welcome to the Zoo",
    unlockLevel: 1,
    content: `Fedora stood at the entrance of the small community zoo, keys jingling in her hand. The morning sun was just beginning to rise, painting the sky in shades of orange and pink.

"First day as head zookeeper," she whispered to herself, a mix of excitement and nerves bubbling in her chest.

That's when she heard it - a cheerful chirp from a nearby tree. A brilliant parrot with emerald and sapphire feathers landed on the welcome sign.

"Good morning! You must be Fedora! I'm Zooey!" the parrot said brightly. "I'm the unofficial zoo mascot and your new best friend!"

Fedora blinked. "Did... did you just talk?"

"Of course I talk! And I'm here to help you repopulate this wonderful zoo! It's been empty for too long. But together, we're going to bring it back to life!"

Fedora looked around at the empty enclosures, the quiet paths, the potential waiting to bloom. Her home needed attention too - housework waited for no one. But maybe... maybe she could handle both?

"Alright, Zooey," Fedora smiled. "Let's build something amazing. One animal at a time."

The parrot's eyes sparkled. "That's the spirit! Now, the penguins are arriving this afternoon, and they're going to be HUNGRY! Let's get started!"`,
  },
  {
    number: 1,
    title: "First Arrivals",
    unlockLevel: 2,
    content: `The truck pulled up just after lunch, and Fedora's heart raced with excitement.

"They're here! The penguins are here!" Zooey fluttered around her head enthusiastically.

The delivery team carefully unloaded the transport crates, and soon, five adorable penguins were waddling into their new habitat. The pool sparkled in the sunlight, fresh water waiting for them.

"Remember," Zooey coached, "fresh fish twice a day, pool cleaning every morning, and lots of enrichment!"

Fedora watched as the penguins dove into the water, their joyful honks filling the air. This was real. The zoo was coming alive.

Just then, her phone buzzed. Her wife Sarah was texting: "How's the new job going?"

Fedora glanced at Zooey, who was doing an elaborate wing-gesture that seemed to say "act normal!"

"Great!" she texted back. "Just... taking care of things. You know me!"

Sarah replied with a heart emoji. "Don't forget about the dishes at home!"

Fedora laughed. Right. The dishes. Because she wasn't just a zookeeper - she was also responsible for keeping her actual house running. The penguins weren't the only ones who needed feeding.

"Looks like I've got two jobs," Fedora said.

Zooey chirped cheerfully. "Good thing you're organized! Let's make a schedule! Zoo animals AND housework - you've got this, Fedora!"

And somehow, watching the penguins play, Fedora believed it.`,
  },
  {
    number: 2,
    title: "The Lion's Arrival",
    unlockLevel: 5,
    content: `Week three brought the zoo's most impressive residents yet: a pair of lions.

"Now this is serious business, Fedora!" Zooey perched on her shoulder, uncharacteristically serious. "Lions need respect, space, and very careful handling."

Fedora watched from a safe distance as the experienced handlers from the wildlife preserve carefully guided the magnificent creatures into their new savanna habitat. The male's mane caught the sunlight like gold.

"They're beautiful," she breathed.

"And hungry!" Zooey reminded her. "Come on, let's prep their dinner!"

In the food preparation area, Fedora carefully portioned out the lions' meal, following the nutritional guidelines precisely. This was no joke - these were powerful predators depending on her care.

Later that evening, she sat on a bench, watching the lions explore their new home. Her phone buzzed - a video call from Sarah.

"Hey honey! How's work?"

Fedora quickly angled the phone away from the zoo. "Oh, you know... busy day. Lots of... organizing."

"You look tired. Remember to take breaks!"

"I will," Fedora smiled. If only Sarah knew she was caring for lions by day and doing laundry by night.

After hanging up, Zooey landed on the bench. "You're doing great, you know. The zoo's really coming together. The animals are happy and healthy."

Fedora looked out at the lion habitat, at the penguins splashing in their pool, at the growing collection of creatures who depended on her.

"Yeah," she said softly. "We're really building something special here."

"And keeping your house running!" Zooey added with a cheerful chirp. "Double duty champion!"

Fedora laughed. It was exhausting, sure. But it was also wonderful. Her secret double life as a zookeeper and homemaker wasn't so bad after all.`,
  },
];

// Rank titles based on level
export function getRankTitle(level: number, rank: number): string {
  const rankNames = [
    'Junior Zookeeper',
    'Zookeeper',
    'Senior Zookeeper',
    'Head Zookeeper',
    'Zoo Director',
  ];

  return rankNames[rank - 1] || 'Junior Zookeeper';
}

// Get random dialogue
export function getRandomDialogue(category: keyof typeof SPARKLE_DIALOGUE, params?: Record<string, any>): string {
  const dialogues = SPARKLE_DIALOGUE[category];
  if (!Array.isArray(dialogues)) return '';

  let dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];

  // Replace parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      dialogue = dialogue.replace(`{${key}}`, String(value));
    });
  }

  return dialogue;
}

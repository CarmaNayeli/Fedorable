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
    name: 'Feed the Penguins [Make Breakfast]',
    emoji: '🐧',
    description: 'Prepare and distribute fish to the penguin colony',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'lion-feeding',
    name: 'Feed the Lions [Make Dinner]',
    emoji: '🦁',
    description: 'Prepare meat portions for the pride',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'monkey-feeding',
    name: 'Feed the Monkeys [Make Lunch]',
    emoji: '🐵',
    description: 'Distribute fruits and vegetables to the primates',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'elephant-feeding',
    name: 'Feed the Elephants [Meal Prep]',
    emoji: '🐘',
    description: 'Provide hay, fruits, and vegetables to the gentle giants',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'giraffe-feeding',
    name: 'Feed the Giraffes [Make Snacks]',
    emoji: '🦒',
    description: 'Place fresh leaves in the tall feeding stations',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'panda-feeding',
    name: 'Feed the Pandas [Pack Lunches]',
    emoji: '🐼',
    description: 'Provide fresh bamboo to our bamboo-loving friends',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'parrot-feeding',
    name: 'Feed the Parrots [Wash Dishes]',
    emoji: '🦜',
    description: 'Provide seeds, nuts, and fruits to the colorful flock',
    realm: 'kitchen',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'seal-feeding',
    name: 'Feed the Seals [Clean After Meals]',
    emoji: '🦭',
    description: 'Toss fish to the playful seals',
    realm: 'kitchen',
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
    name: 'Clean Penguin Pool [Clean Bathroom]',
    emoji: '🧼',
    description: 'Remove debris and maintain water quality',
    realm: 'bathroom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'monkey-habitat-tidy',
    name: 'Tidy Monkey Habitat [Tidy Living Room]',
    emoji: '🌴',
    description: 'Clean up enrichment toys and maintain cleanliness',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'elephant-yard-clean',
    name: 'Clean Elephant Yard [Sweep Kitchen]',
    emoji: '🧹',
    description: 'Remove waste and refresh the outdoor area',
    realm: 'kitchen',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'aviary-sweep',
    name: 'Sweep the Aviary [Vacuum Floors]',
    emoji: '🧹',
    description: 'Clean floors and perches in the bird sanctuary',
    realm: 'wholeHouse',
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
    name: 'Groom the Lions [Self Care]',
    emoji: '💇',
    description: 'Brush and check the lions for health',
    realm: 'bedroom',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'panda-grooming',
    name: 'Groom the Pandas [Deep Clean Tub]',
    emoji: '🧴',
    description: 'Brush bamboo bits from panda fur',
    realm: 'bathroom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'elephant-bath',
    name: 'Bathe the Elephants [Deep Clean Shower]',
    emoji: '🚿',
    description: 'Give the elephants their weekly scrub and spray',
    realm: 'bathroom',
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
    name: 'Monkey Enrichment Time [Hobby Time]',
    emoji: '🎁',
    description: 'Set up puzzle feeders and toys for mental stimulation',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=WE',
  },
  {
    id: 'seal-training',
    name: 'Seal Training Session [Exercise/Workout]',
    emoji: '🎯',
    description: 'Practice tricks and behaviors with the seals',
    realm: 'wholeHouse',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU',
  },
  {
    id: 'parrot-socialization',
    name: 'Parrot Socialization [Roommate Time]',
    emoji: '🗣️',
    description: 'Spend time talking and playing with the parrots',
    realm: 'livingRoom',
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
    name: 'Deep Clean Lion Habitat [Deep Clean Kitchen]',
    emoji: '🦁',
    description: 'Thorough scrub of the entire lion enclosure',
    realm: 'kitchen',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'penguin-exhibit-overhaul',
    name: 'Penguin Exhibit Overhaul [Deep Clean Bathroom]',
    emoji: '🐧',
    description: 'Complete water change and habitat refresh',
    realm: 'bathroom',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'aquarium-maintenance',
    name: 'Aquarium Deep Maintenance [Organize Storage]',
    emoji: '🐠',
    description: 'Filter cleaning, water testing, and tank maintenance',
    realm: 'storageRoom',
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
    name: 'Morning Health Rounds [Morning Routine]',
    emoji: '🩺',
    description: 'Check all animals for signs of illness or injury',
    realm: 'wholeHouse',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'veterinary-checkup',
    name: 'Veterinary Check-ups [Self Care Check]',
    emoji: '💉',
    description: 'Assist the vet with animal examinations',
    realm: 'bedroom',
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
    name: 'Morning Food Prep [Make Breakfast]',
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
    name: 'Afternoon Food Prep [Make Dinner]',
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
    name: 'Procure Animal Supplies [Grocery Shopping]',
    emoji: '🛒',
    description: 'Purchase food and supplies for the zoo',
    realm: 'wholeHouse',
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
    name: 'Clean Visitor Paths [Sweep Entryway]',
    emoji: '🧹',
    description: 'Sweep and maintain clean pathways for guests',
    realm: 'wholeHouse',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'gift-shop-restock',
    name: 'Restock Gift Shop [Organize Closets]',
    emoji: '🎁',
    description: 'Organize and restock animal plushies and souvenirs',
    realm: 'bedroom',
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
    name: 'Baby Animal Care [Help Roommate]',
    emoji: '🍼',
    description: 'Feed and care for the newest zoo arrivals',
    realm: 'guestRoom',
    threatLevel: 3,
    questType: 'side',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
  },
  {
    id: 'education-program',
    name: 'Education Program [Read/Learn]',
    emoji: '📚',
    description: 'Teach visitors about animal conservation',
    realm: 'bedroom',
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
    name: 'Feed the Snakes [Take Out Trash]',
    emoji: '🐍',
    description: 'Carefully feed the reptile residents',
    realm: 'wholeHouse',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=WE',
  },
  {
    id: 'terrarium-maintenance',
    name: 'Maintain Terrariums [Organize Bedroom]',
    emoji: '🦎',
    description: 'Clean and maintain humidity and temperature',
    realm: 'bedroom',
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
    name: 'Tiger Cubs Playtime [Game Night]',
    emoji: '🐯',
    description: 'A joyful task! Play and socialize with baby tigers',
    realm: 'livingRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH',
  },
  {
    id: 'dolphin-show',
    name: 'Dolphin Show Preparation [Movie Night]',
    emoji: '🐬',
    description: 'A fun task! Prepare for the dolphin demonstration',
    realm: 'livingRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=FR',
  },

  // === SELF CARE & MINDFULNESS ===
  {
    id: 'zookeeper-journal',
    name: 'Zookeeper Journal [Write in Journal]',
    emoji: '📔',
    description: 'Document your daily observations and reflections',
    realm: 'bedroom',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'meditation-garden',
    name: 'Visit Meditation Garden [Meditate]',
    emoji: '🧘',
    description: 'Find peace in the tranquil meditation garden',
    realm: 'bedroom',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'social-gathering',
    name: 'Zoo Social Time [Reach Out to a Friend]',
    emoji: '👥',
    description: 'Connect with friends, family, or community',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'laundry-washing',
    name: 'Wash Animal Bedding [Wash Laundry]',
    emoji: '🧺',
    description: 'Clean and refresh all the animal bedding',
    realm: 'laundryRoom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'laundry-folding',
    name: 'Fold Clean Bedding [Fold Laundry]',
    emoji: '👕',
    description: 'Neatly fold freshly cleaned bedding',
    realm: 'laundryRoom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'laundry-putaway',
    name: 'Store Clean Bedding [Put Away Laundry]',
    emoji: '🗄️',
    description: 'Organize and store clean bedding properly',
    realm: 'bedroom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 25,
    magicGems: 1,
    xpReward: 12,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
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

Later that evening, she sat on a bench, watching the lions explore their new home. The setting sun painted the savanna habitat in shades of gold and amber.

Zooey landed on the bench beside her. "You're doing great, you know. The zoo's really coming together. The animals are happy and healthy."

Fedora looked out at the lion habitat, at the penguins splashing in their pool, at the growing collection of creatures who depended on her.

"Yeah," she said softly. "We're really building something special here."

"And you're managing everything like a pro!" Zooey chirped. "The zoo, the house, all of it! You're a natural at balancing it all."

Fedora laughed. It was exhausting, sure. But it was also wonderful. Building this zoo, caring for these magnificent creatures, keeping everything running - it filled her with a sense of purpose she'd never felt before.`,
  },
  {
    number: 3,
    title: "The Elephant Herd",
    unlockLevel: 10,
    content: `The truck that rolled up to the zoo gates wasn't like the others. It was massive, reinforced, and accompanied by three handlers from the wildlife sanctuary.

"Fedora!" Zooey swooped down excitedly. "They're here! A whole family of elephants!"

Fedora's heart pounded as she watched the gentle giants emerge from the transport - a matriarch, two younger females, and a baby elephant no bigger than a large dog. The little one trumpeted experimentally, making Fedora laugh with delight.

"They're magnificent," she breathed, watching the family explore their new habitat. The lead handler approached with detailed care instructions - diet requirements, enrichment needs, the importance of maintaining their social bonds.

That night, Fedora stood at the habitat fence long after the zoo had closed, watching the elephant family huddle together under the stars. The baby elephant lay between the adults, safe and content.

"You've created something really special here," Zooey said softly from her shoulder. "Look at them - they're not just surviving, they're thriving."

Fedora smiled. From a few penguins to a full elephant herd - the zoo was becoming a real sanctuary. And she was making it happen, one careful day at a time.`,
  },
  {
    number: 4,
    title: "Zooey's Secret",
    unlockLevel: 15,
    content: `It was during the weekly habitat inspection that Fedora noticed something strange. Zooey was perched on a fence post, having what appeared to be a full conversation with the elephants. And they seemed to be... responding?

"Zooey," Fedora called out. "Are you... talking to them?"

The parrot fluttered over, looking unusually sheepish. "Okay, okay. I might have been holding back a tiny detail. I can... sort of communicate with all the animals. It's not just squawking - we understand each other."

Fedora stared. "You're telling me that this whole time, you've been translating?"

"Well, yes! How else did you think I knew exactly what the lions needed, or that the penguins wanted their pool temperature adjusted?" Zooey ruffled his feathers. "I'm not just a pretty parrot, Fedora. I'm your liaison to the animal kingdom!"

Fedora sat down hard on a bench. "This is... actually incredible. So when I've been caring for them..."

"They know you care," Zooey said warmly. "They trust you. The elephants just told me you remind them of their favorite keeper from the sanctuary. The lions say you have a 'calm strength.' You're not just feeding them, Fedora - you're connecting with them."

Fedora looked around at her zoo with new eyes. She wasn't just running a facility. She was building a community, a place where animals and humans truly understood each other. And with Zooey as her translator, she could do even more.

"Okay then," she said, standing up with renewed determination. "Let's go see what the monkeys have been trying to tell us all week."`,
  },
  {
    number: 5,
    title: "The Promotion",
    unlockLevel: 20,
    content: `The letter from the Regional Zoo Association arrived on a Tuesday morning. Fedora's hands trembled as she opened it.

"What is it?" Zooey landed on her shoulder, peering at the official letterhead.

"They want to certify the zoo," Fedora whispered. "Full accreditation. They're sending an inspector next week."

The next seven days were a whirlwind. Fedora scrubbed, organized, documented, and perfected every aspect of the zoo. She updated health records, checked every habitat twice, and made sure every animal's enrichment program was flawless.

The day of the inspection, a stern-looking woman with a clipboard arrived. For six hours, she examined everything - from the penguin pool filtration system to the lion's dental care records. Fedora's anxiety mounted with each scribbled note.

Finally, the inspector turned to her. "Ms. Fedora, in my twenty years of zoo inspections, I've rarely seen such dedication. Your animals are healthy, happy, and clearly bonded with you. The care standards here exceed our requirements."

Fedora's eyes widened. "Does that mean...?"

"Congratulations. You're now officially a Certified Zookeeper, and this facility is accredited." The inspector actually smiled. "More importantly, I'd like to offer you a position on the regional advisory board. We need people like you - people who truly care."

That evening, Fedora stood in the center of her zoo, watching the sunset paint the sky. Zooey chirped proudly beside her.

"From Junior Zookeeper to Certified Professional," the parrot said. "I always knew you had it in you."

Fedora smiled. This was more than just a job now. It was her calling.`,
  },
  {
    number: 6,
    title: "The Rescue",
    unlockLevel: 25,
    content: `The emergency call came at 2 AM. A wildlife sanctuary three hours away had flooded, and they needed immediate help relocating their animals. Fedora was out of bed and dressed before the second ring.

"I'm coming too!" Zooey declared, already perched on her shoulder.

The sanctuary was chaos when they arrived - handlers rushing everywhere, animals distressed, water still rising. The director grabbed Fedora immediately.

"Thank God you're here. We need to move the tigers first - three cubs and their mother. Can you take them?"

Fedora's training kicked in. "Yes. I have space prepared. What do they need?"

For the next twelve hours, Fedora coordinated the relocation of fifteen animals from the flooded sanctuary. The tiger family, a pair of otters, several tropical birds, and even a family of prairie dogs. Her own zoo became a temporary shelter, every spare habitat converted to emergency housing.

Zooey flew between animals, using his gift to keep them calm during the stressful transition. "The tiger mom says thank you," he translated at one point. "She knows her cubs are safe here."

By sunset, every rescued animal was secure, fed, and settling in. The sanctuary director approached Fedora with tears in her eyes.

"You saved them. All of them. If you hadn't responded so fast..."

"This is what we do," Fedora said simply. "We take care of each other."

Standing in her zoo that night, surrounded by twice as many animals as before, Fedora realized something important. She wasn't just running a zoo anymore. She was part of a network of people dedicated to protecting these creatures. She was making a real difference.

And that felt better than anything.`,
  },
  {
    number: 7,
    title: "The Conservation Project",
    unlockLevel: 30,
    content: `The email from the National Wildlife Conservation Society was marked "URGENT."

Fedora read it three times before believing it: they wanted her zoo to host a breeding program for endangered red pandas. Her facility, her protocols, her care standards - they'd all been reviewed and approved for this critical work.

"Zooey, this is huge," she breathed. "Breeding programs save species. This is real conservation work."

The parrot puffed up with pride. "I told you that you were special! This is your chance to make history!"

The red pandas arrived a month later - a bonded pair named Maple and Crimson. They were shy, delicate, and absolutely beautiful. Fedora spent hours learning their specific needs, consulting with conservation biologists, adjusting their habitat to perfection.

"They're settling in well," the lead biologist told her during a video check-in. "But I have to tell you, Fedora - most facilities take years to get to this level of care. You've done it in months. How?"

Fedora looked at Zooey, who was carefully not revealing his secret translation abilities. "I listen," she said simply. "Really listen to what the animals need."

Six months later, Maple gave birth to twin cubs. Fedora watched through the monitor as the tiny red pandas nursed, their mother carefully grooming them. Each cub represented hope - hope for their endangered species, hope for the future.

The conservation society called it a triumph. The zoo community called it remarkable. But for Fedora, it was something simpler: it was proof that caring deeply, working hard, and really connecting with the animals could change the world, one precious life at a time.`,
  },
  {
    number: 8,
    title: "Senior Keeper",
    unlockLevel: 35,
    content: `The certification ceremony was held at the regional zoo conference. Fedora stood on stage, feeling both proud and slightly embarrassed as the director read her accomplishments: successful breeding programs, emergency rescue coordination, perfect health inspections, innovative enrichment protocols.

"And so," the director concluded, "it is my honor to promote Fedora to Senior Zookeeper status. Please come accept your certification."

The audience of zoo professionals stood and applauded. Fedora accepted the framed certificate with shaking hands.

"You've earned this," Zooey whispered from backstage. "Every single animal agrees."

At the reception afterward, younger zookeepers approached her with questions. How did she manage so many animals? What was her secret to such high care standards? Could she give advice on enrichment programs?

"The secret," Fedora told a nervous young keeper who reminded her of her early days, "is that there is no secret. You just care. Really, truly care. Listen to the animals, learn what they need, and never stop trying to do better."

Later that night, back at her zoo, Fedora walked the familiar paths. She'd come so far from that first day with just a few penguins. Now she had dozens of animals, all healthy and thriving. She had a team of volunteers who came weekly to help. She had recognition from the professional community.

But more than that, she had purpose. Every morning she woke up knowing that she was making a difference. The elephants trumpeted their morning greetings. The lions dozed in the sun. The red pandas played with their enrichment toys.

This was more than a job. It was her life's work. And she was exactly where she was meant to be.`,
  },
  {
    number: 9,
    title: "The Grand Vision",
    unlockLevel: 40,
    content: `The city council's invitation came as a surprise. They wanted to discuss "expansion opportunities" for the zoo. Fedora arrived at city hall with Zooey hidden in her bag (officially, he was just a pet parrot).

"Ms. Fedora," the mayor began, "your zoo has become a point of pride for our community. We'd like to propose a significant expansion - a full educational center, a veterinary clinic, and three new habitat areas. The city will fund half if you can match it."

Fedora's mind raced. This wasn't just an expansion - it was a transformation. Her small community zoo could become a real conservation center, a place where people learned about and protected wildlife.

Over the next months, Fedora worked with architects, conservationists, and educators to design the new facilities. An interactive learning center where children could understand animal behavior. A state-of-the-art veterinary clinic to serve rescued wildlife. New habitats for species that desperately needed breeding programs.

The fundraising was intense - grant applications, donation campaigns, benefit events. But the community rallied. Local businesses donated. Schools held fundraisers. People who'd never even visited the zoo contributed because they believed in the vision.

The groundbreaking ceremony drew hundreds of people. As Fedora turned the first shovel of earth, she looked out at the faces - families, students, fellow zookeepers, city officials - all united in this mission.

"We're not just building bigger habitats," she told the crowd. "We're building a future where humans and animals thrive together. Where every child learns to respect and protect wildlife. Where every animal that comes through our gates gets the best care possible. This is just the beginning."

That night, Zooey landed on her shoulder as she surveyed the construction site. "From one woman and a talking parrot to all this," he marveled. "You've created something incredible, Fedora."

She smiled. "We've created something incredible. And we're not done yet."`,
  },
  {
    number: 10,
    title: "Full Circle",
    unlockLevel: 45,
    content: `The day of the grand reopening arrived with perfect sunshine. Thousands of people waited outside the gates - families, school groups, other zookeepers, even representatives from national conservation organizations.

Fedora stood at the entrance, wearing her new uniform with "Zoo Director" embroidered on the pocket. The title still felt surreal. She'd come so far from that first nervous day.

"Ready?" Zooey asked from his special perch by the gates.

"Ready," Fedora confirmed.

She cut the ribbon, and the crowd flooded in. Children raced to the new interactive exhibits, gasping at the underwater viewing area where penguins swam overhead. Parents read the educational displays about conservation efforts. The veterinary clinic, already treating its first rescued owl, hummed with purposeful activity.

Throughout the day, Fedora walked the grounds, watching people connect with the animals she'd spent years caring for. A little girl pressed her face to the glass of the elephant habitat, eyes wide with wonder. A teenager took careful notes for a school project on endangered species. An elderly couple held hands, watching the lions rest in the afternoon sun.

As evening approached and the last visitors left, Fedora found herself back at the original penguin habitat - the first animals she'd ever cared for. They waddled up to the edge of their pool, recognizing her.

"You remember the beginning?" Zooey asked softly.

"Every moment," Fedora replied. "Standing here, terrified and excited, not knowing if I could really do this."

"And now?"

Fedora looked around at the zoo - her zoo. The animals she'd saved, the programs she'd built, the lives she'd touched. The balance of caring for them and keeping everything else in her life running. It had been hard, exhausting even. But it had been worth every single moment.

"Now I know exactly who I am," she said. "I'm a zookeeper. Not just by title, but by calling. This is where I belong."

Zooey chirped his agreement. Around them, the zoo settled into its peaceful evening routine. Animals bedding down, the night crew making their rounds, everything running exactly as it should.

Fedora smiled. Tomorrow would bring new challenges, new animals to care for, new ways to make a difference. But tonight, she simply stood in the center of her dream made real, grateful for every step that had brought her here.

The journey wasn't over. It was just beginning.`,
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

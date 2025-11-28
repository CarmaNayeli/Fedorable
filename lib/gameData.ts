// Game Data: Monsters, Story, Dialogue

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

// Rhia's Real Household Monster Templates
export const MONSTER_TEMPLATES: MonsterTemplate[] = [
  // === GENERAL TIDY-UP (Daily Patrols) ===
  {
    id: 'kitchen-chaos',
    name: 'Kitchen Chaos Spirit',
    emoji: '🍽️',
    description: 'Scatters items across counters and creates general disorder',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'living-room-clutter',
    name: 'Living Room Clutter King',
    emoji: '🛋️',
    description: 'Hoards items on every surface',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'bedroom-disorder',
    name: 'Bedroom Disorder Demon',
    emoji: '🛏️',
    description: 'Creates chaos in the master bedroom',
    realm: 'bedroom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'sylvie-room-scatter',
    name: "Sylvie's Room Scatter Imp",
    emoji: '🧸',
    description: "Leaves toys and items scattered throughout Sylvie's domain",
    realm: 'sylvieRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'etc-room-mayhem',
    name: 'Etc Room Mayhem Beast',
    emoji: '📦',
    description: 'The mysterious Etc room harbors untold clutter',
    realm: 'etcRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === DISHES ===
  {
    id: 'dishwasher-dragon',
    name: 'Dishwasher Dragon',
    emoji: '🐉',
    description: 'Load and run the dishwasher to vanquish this mechanical beast',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'handwash-horror',
    name: 'Handwash Horror',
    emoji: '💀',
    description: 'Those dishes that must be scrubbed by hand',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === LAUNDRY ===
  {
    id: 'washing-machine-wyrm',
    name: 'Washing Machine Wyrm',
    emoji: '🌊',
    description: 'Run the washing machine to cleanse the fabric realm',
    realm: 'laundryRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'dryer-demon',
    name: 'Dryer Demon',
    emoji: '🔥',
    description: 'Move wet clothes from washer to dryer',
    realm: 'laundryRoom',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'laundry-folding-fiend',
    name: 'Laundry Folding Fiend',
    emoji: '🧺',
    description: 'Sort, fold, and put away the clean garments',
    realm: 'laundryRoom',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'sock-sorting-sprite',
    name: 'Sock Sorting Sprite',
    emoji: '🧦',
    description: 'Match the endless pairs of scattered socks',
    realm: 'laundryRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === VACUUM & SWEEP ===
  {
    id: 'vacuum-vortex',
    name: 'Vacuum Vortex',
    emoji: '🌪️',
    description: 'Vacuum the entire house to banish dust and debris',
    realm: 'wholeHouse',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'sweep-mop-monster',
    name: 'Sweep & Mop Monster',
    emoji: '🧹',
    description: 'Sweep and mop floors throughout the house',
    realm: 'wholeHouse',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },

  // === TRASH (Individual by room) ===
  {
    id: 'kitchen-trash-goblin',
    name: 'Kitchen Trash Goblin',
    emoji: '🗑️',
    description: 'Take out the kitchen garbage',
    realm: 'kitchen',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'livingroom-refuse-imp',
    name: 'Living Room Refuse Imp',
    emoji: '🗑️',
    description: 'Empty the living room trash can',
    realm: 'livingRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'sylvie-garbage-ghost',
    name: "Sylvie's Room Garbage Ghost",
    emoji: '👻',
    description: "Empty Sylvie's room trash can",
    realm: 'sylvieRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'bedroom-waste-wraith',
    name: 'Bedroom Waste Wraith',
    emoji: '🗑️',
    description: 'Take out the bedroom trash',
    realm: 'bedroom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'downstairs-bathroom-trash',
    name: 'Downstairs Bathroom Trash Troll',
    emoji: '🚽',
    description: 'Empty the downstairs bathroom waste bin',
    realm: 'bathroomDownstairs',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'upstairs-bathroom-trash',
    name: 'Upstairs Bathroom Trash Troll',
    emoji: '🚽',
    description: 'Empty the upstairs bathroom waste bin',
    realm: 'bathroomUpstairs',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },

  // === CAT LITTER ===
  {
    id: 'upstairs-litter-beast',
    name: 'Upstairs Litter Box Beast',
    emoji: '🐱',
    description: 'Scoop and dispose of upstairs litter box',
    realm: 'bathroomUpstairs',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'downstairs-litter-beast',
    name: 'Downstairs Litter Box Beast',
    emoji: '🐱',
    description: 'Scoop and dispose of downstairs litter box',
    realm: 'bathroomDownstairs',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'upstairs-litter-dragon',
    name: 'Upstairs Litter Change Dragon',
    emoji: '🐉',
    description: 'Full litter box change - upstairs edition',
    realm: 'bathroomUpstairs',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'downstairs-litter-dragon',
    name: 'Downstairs Litter Change Dragon',
    emoji: '🐉',
    description: 'Full litter box change - downstairs edition',
    realm: 'bathroomDownstairs',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 35,
    magicGems: 1,
    xpReward: 18,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },

  // === WASH SHEETS ===
  {
    id: 'bedroom-sheet-specter',
    name: 'Bedroom Sheet Specter',
    emoji: '🛏️',
    description: 'Strip, wash, and remake the master bedroom',
    realm: 'bedroom',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'sylvie-sheet-phantom',
    name: "Sylvie's Sheet Phantom",
    emoji: '👻',
    description: "Strip, wash, and remake Sylvie's bed",
    realm: 'sylvieRoom',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },

  // === CLEAN BATHROOMS ===
  {
    id: 'upstairs-bathroom-banshee',
    name: 'Upstairs Bathroom Banshee',
    emoji: '🧼',
    description: 'Scrub, sanitize, and restore the upstairs bathroom',
    realm: 'bathroomUpstairs',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },
  {
    id: 'downstairs-bathroom-banshee',
    name: 'Downstairs Bathroom Banshee',
    emoji: '🧼',
    description: 'Scrub, sanitize, and restore the downstairs bathroom',
    realm: 'bathroomDownstairs',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 60,
    magicGems: 2,
    xpReward: 30,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SA',
  },

  // === GROCERIES ===
  {
    id: 'grocery-golem',
    name: 'Grocery Golem',
    emoji: '🛒',
    description: 'Venture forth to gather supplies and provisions',
    realm: 'wholeHouse',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 50,
    magicGems: 1,
    xpReward: 25,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },

  // === GAME NIGHTS (Friendly Quests!) ===
  {
    id: 'thursday-game-guardian',
    name: 'Thursday Game Guardian',
    emoji: '🎲',
    description: 'A friendly ally! Protect sacred Thursday game night tradition',
    realm: 'livingRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH',
  },
  {
    id: 'friday-game-guardian',
    name: 'Friday Game Guardian',
    emoji: '🎮',
    description: 'A friendly ally! Protect sacred Friday game night tradition',
    realm: 'livingRoom',
    threatLevel: 1,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 1,
    xpReward: 15,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=FR',
  },

  // === KITCHEN COUNTERS ===
  {
    id: 'counter-tidy-sprite',
    name: 'Counter Tidy Sprite',
    emoji: '📦',
    description: 'Clear clutter and organize kitchen counters',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'counter-clean-demon',
    name: 'Counter Clean Demon',
    emoji: '🧽',
    description: 'Wipe down and sanitize all kitchen counters',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },

  // === COOKING ===
  {
    id: 'breakfast-beast',
    name: 'Breakfast Beast',
    emoji: '🍳',
    description: 'Prepare the morning meal to fuel the day',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'lunch-lurker',
    name: 'Lunch Lurker',
    emoji: '🥗',
    description: 'Conjure the midday sustenance',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 25,
    magicGems: 0,
    xpReward: 12,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'dinner-dragon',
    name: 'Dinner Dragon',
    emoji: '🍽️',
    description: 'Create the evening feast for the household',
    realm: 'kitchen',
    threatLevel: 3,
    questType: 'daily',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'sarah-lunch-packer',
    name: "Sarah's Lunch Packing Pixie",
    emoji: '🍱',
    description: 'Pack a nutritious lunch for Sarah to take to work',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
  },
];

// Sparkle Dialogue
export const SPARKLE_DIALOGUE = {
  morning: [
    "Good morning, Rhia! The forces of mess are stirring! Are you ready to protect your home today? ✨",
    "Rise and shine, Magical Girl! Your realm needs you! 💫",
    "Morning, Rhia! I sense disturbances in the tidy-force! Time to suit up! 🌟",
  ],

  questComplete: [
    "Amazing work, Rhia! Your dedication inspires us all! ✨",
    "That's the power of a true Magical Girl! Well done! 💫",
    "SPECTACULAR! Another victory for justice and cleanliness! 🌟",
    "You make it look easy, Rhia! Simply magnificent! ✨",
  ],

  criticalHit: [
    "💥 CRITICAL HIT! That was absolutely perfect! ✨",
    "🌟 AMAZING! You've mastered that technique! 💫",
    "✨ FLAWLESS EXECUTION! The legends will tell of this day! 🌟",
  ],

  streakMilestone: [
    "🔥 {days} days in a row?! You're becoming a legend! 🌟",
    "✨ {days} consecutive days! Your determination is unmatched! 💫",
    "💫 {days} day streak! This is the power of consistency! ✨",
  ],

  bossEncounter: [
    "🚨 BOSS ALERT! This is it, Rhia! Channel all your cleaning power! I believe in you! 💫",
    "⚔️ A powerful foe appears! But I know you can handle this! Show them your strength! ✨",
    "💪 It's time for an epic battle! Let's show this boss what a Magical Girl can do! 🌟",
  ],

  missedDay: [
    "Even magical girls need rest sometimes. Tomorrow is a new day! ✨",
    "Don't worry, Rhia! Every hero has days off. You'll bounce back! 💫",
    "Rest is part of being strong. When you're ready, the quests will be waiting! 🌟",
  ],

  levelUp: [
    "✨ LEVEL UP! You're growing stronger, Rhia! New powers unlocked! 💫",
    "🌟 You've reached level {level}! Your magical girl journey continues! ✨",
    "💫 LEVEL {level} ACHIEVED! The realm is safer thanks to you! 🌟",
  ],

  secretIdentity: {
    wifeNearby: [
      "*whispers* Your wife is nearby! Act natural! 🤫",
      "Shh! Maintain your cover, Magical Girl! 🤐",
      "*quiet voice* Remember: you're just doing normal chores... 😉",
    ],
    kidNearby: [
      "Quick! Look casual! Sylvie can't know about your secret! 🤫",
      "*whispers frantically* Civilian approaching! Normal chore mode activated! 😅",
    ],
    closeCall: [
      "That was close! Good save, Rhia! Your secret is safe! 🤫✨",
      "Whew! They almost saw the sparkles! Well played! 😅💫",
      "Crisis averted! Your double life remains secure! 🎭✨",
    ],
  },

  familyHelp: [
    "⚡ MYSTERIOUS ALLY STRIKES! Someone else has weakened a monster! 💫",
    "✨ BACKUP ARRIVED! Looks like you have unexpected help! 🌟",
    "💫 CIVILIAN ASSISTANCE DETECTED! Even normal people can be heroes! ✨",
  ],
};

// Story Chapters
export const STORY_CHAPTERS = [
  {
    number: 0,
    title: "The Awakening",
    unlockLevel: 1,
    content: `It started like any other morning. Rhia looked around her home and sighed at the growing chaos. Dishes piled in the sink. Laundry mountain had evolved from hill to full-blown peak. The bathroom... well, best not to think about that.

Her wife was already at work. Sylvie was at school. Finally, a moment alone.

But today was different.

A sparkle of light appeared in the air. "Greetings, chosen one!" a tiny glowing creature chirped. "I am Sparkle, and I bring urgent news!"

Rhia blinked. "I... what?"

"Your home is under attack by the forces of Chaos and Clutter! But fear not—you have been chosen to become a Magical Girl and defend your domain!"

"A... magical girl? To do chores?"

"Not just chores! QUESTS! BATTLES! You will transform, power up, and restore your realm to its rightful glory! Plus you get sparkle points!"

Rhia looked at the dishes. She looked at Sparkle. She looked back at the dishes.

"...I'm listening."

"That's the spirit! Now, repeat after me: In the name of cleanliness, I'll tidy you up!"

Rhia glanced toward the door. "Wait. Does my family need to know about this?"

Sparkle's eyes widened. "Oh! Oh no! Your secret identity must be protected! They can NEVER know you're a magical girl! It would... uh... disrupt the magical balance!"

"So I just... do chores but pretend it's normal?"

"Exactly! You'll be a hero in hiding! Cleaning by day, WARRIOR by day-but-secretly-in-your-head!"

And thus began the legend of Magical Girl Rhia, Defender of the Home Realm, Keeper of Secrets.

✨ CHAPTER 0 COMPLETE ✨
New transformation unlocked: Kitchen Guardian Rhia!
Secret Identity Protocol: ACTIVE 🤫`,
  },
  {
    number: 1,
    title: "First Battle",
    unlockLevel: 2,
    content: `"Alright, Sparkle," Rhia said, rolling up her sleeves. "What do I do first?"

"First, we must assess the threat! Look—there!" Sparkle pointed at the sink.

A shadowy figure seemed to loom over the pile of dishes. Through the mystical lens Sparkle provided, Rhia could see it: a grotesque creature made of grease and food particles.

"The DISHWASHER DRAGON! Level 2 threat!" Sparkle announced. "Are you ready for your first battle?"

Rhia grabbed a sponge. "Let's do this."

"Wait! First, your transformation! Close your eyes and say the words!"

Rhia felt silly, but... "In the name of cleanliness, I'll tidy you up!"

Light swirled around her. Nothing changed physically, but somehow she felt... different. Stronger. Like she could tackle any mess.

"Behold! KITCHEN GUARDIAN RHIA!"

Rhia approached the dishwasher. The Dishwasher Dragon hissed. She loaded each dish like striking a blow. Added detergent like casting a spell. Hit start.

💫✨💥 VICTORY! ✨💫

"AMAZING!" Sparkle cheered. "You're a natural! +25 Sparkle Points! +12 XP!"

Rhia smiled. Maybe this wouldn't be so bad after all.

Just then, she heard the door. Her wife was home early.

"Quick! Detransform!" Sparkle whispered, disappearing.

"Honey?" her wife called out.

"Just running the dishwasher!" Rhia called back, as if it was the most normal thing in the world.

If only she knew.`,
  },
  {
    number: 2,
    title: "The Secret Keeper",
    unlockLevel: 5,
    content: `Life as a magical girl was... interesting.

By day, Rhia was just another person doing household tasks. Her wife would comment: "Wow, you've been really on top of things lately!"

If only she knew that Rhia wasn't just "tidying"—she was BATTLING EVIL.

"Do you ever feel bad about keeping secrets?" Rhia asked Sparkle one morning.

"Hmm?" Sparkle looked up from counting the Sparkle Points.

"Like... my wife thinks I'm just being more organized. But really I'm a magical warrior protecting our home."

Sparkle giggled. "That's the fun part! You get to know the TRUTH! You're not just doing chores—you're saving the realm! They see you making the bed. You know you're defeating the Bedroom Disorder Demon!"

Rhia had to admit, it did make things more interesting.

Sylvie ran into the room. "Mom! Can we play?"

"Sure, honey. Just let me finish—" Rhia glanced at Sparkle, who had frozen mid-flight. "—putting away these toys."

"You're doing chores AGAIN?" Sylvie groaned.

Rhia smiled. "Someone has to keep Sylvie's Room Scatter Imp from taking over."

"Huh?"

"Nothing, sweetie. Nothing."

When Sylvie left, Sparkle unfroze. "Close one! But you're getting good at this cover story thing!"

Rhia laughed. Maybe being a secret magical girl wasn't so hard after all.`,
  },
];

// Rank titles based on level
export function getRankTitle(level: number, rank: number): string {
  const rankNames = [
    'Magical Girl',
    'Magical Girl Captain',
    'Magical Girl Commander',
    'Legendary Guardian',
    'Mythical Keeper',
  ];

  return rankNames[rank - 1] || 'Magical Girl';
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

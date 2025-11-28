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

// Pre-made Monster Templates
export const MONSTER_TEMPLATES: MonsterTemplate[] = [
  // Kitchen Realm
  {
    id: 'dish-monster',
    name: 'Dish Monster',
    emoji: '💀',
    description: 'Lurks in sinks, multiplies if ignored',
    realm: 'kitchen',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
    recurrenceRule: 'FREQ=DAILY',
  },
  {
    id: 'fridge-dragon',
    name: 'Fridge Cleanout Dragon',
    emoji: '🐉',
    description: 'Guards expired items with fierce determination',
    realm: 'kitchen',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 100,
    magicGems: 3,
    xpReward: 50,
  },
  {
    id: 'counter-clutter-ghost',
    name: 'Counter Clutter Ghost',
    emoji: '👻',
    description: 'Haunts surfaces with random items',
    realm: 'kitchen',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 15,
    magicGems: 0,
    xpReward: 8,
  },

  // Bedroom Realm
  {
    id: 'laundry-mountain',
    name: 'Laundry Mountain Titan',
    emoji: '🏔️',
    description: 'The pile that never ends',
    realm: 'bedroom',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 50,
    magicGems: 1,
    xpReward: 25,
    recurrenceRule: 'FREQ=WEEKLY;BYDAY=SU',
  },
  {
    id: 'laundry-zombie',
    name: 'Laundry Zombie',
    emoji: '🧟',
    description: 'Rises from the hamper seeking cleanliness',
    realm: 'bedroom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
  },
  {
    id: 'bed-chaos-imp',
    name: 'Bed Chaos Imp',
    emoji: '🛏️',
    description: 'Unmakes beds and tangles sheets',
    realm: 'bedroom',
    threatLevel: 1,
    questType: 'daily',
    sparklePoints: 10,
    magicGems: 0,
    xpReward: 5,
    recurrenceRule: 'FREQ=DAILY',
  },

  // Bathroom Realm
  {
    id: 'grime-witch',
    name: 'Grime Witch',
    emoji: '🧙',
    description: 'Leaves stains and sticky residue everywhere',
    realm: 'bathroom',
    threatLevel: 4,
    questType: 'boss',
    sparklePoints: 80,
    magicGems: 2,
    xpReward: 40,
  },
  {
    id: 'tub-scum-serpent',
    name: 'Tub Scum Serpent',
    emoji: '🐍',
    description: 'Coils around bathtubs and showers',
    realm: 'bathroom',
    threatLevel: 3,
    questType: 'weekly',
    sparklePoints: 40,
    magicGems: 1,
    xpReward: 20,
  },

  // Living Room Realm
  {
    id: 'dust-bunny-swarm',
    name: 'Dust Bunny Swarm',
    emoji: '🐰',
    description: 'Multiplies when ignored, hides in corners',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'weekly',
    sparklePoints: 30,
    magicGems: 0,
    xpReward: 15,
  },
  {
    id: 'toy-tornado',
    name: 'Toy Tornado',
    emoji: '🧸',
    description: 'Leaves a trail of toys in every room',
    realm: 'livingRoom',
    threatLevel: 2,
    questType: 'daily',
    sparklePoints: 20,
    magicGems: 0,
    xpReward: 10,
  },
  {
    id: 'clutter-king',
    name: 'Clutter King',
    emoji: '👑',
    description: 'Hoards items everywhere, rules chaos',
    realm: 'livingRoom',
    threatLevel: 5,
    questType: 'boss',
    sparklePoints: 150,
    magicGems: 5,
    xpReward: 75,
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
      "Quick! Look casual! Your kid can't know about your secret! 🤫",
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

Her wife was already at work. Her kid was at school. Finally, a moment alone.

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

"The DISH MONSTER! Level 2 threat!" Sparkle announced. "Are you ready for your first battle?"

Rhia grabbed a sponge. "Let's do this."

"Wait! First, your transformation! Close your eyes and say the words!"

Rhia felt silly, but... "In the name of cleanliness, I'll tidy you up!"

Light swirled around her. Nothing changed physically, but somehow she felt... different. Stronger. Like she could tackle any mess.

"Behold! KITCHEN GUARDIAN RHIA!"

Rhia approached the sink. The Dish Monster hissed. She turned on the water, added soap, and began the battle.

Each dish washed was a blow struck. Each glass scrubbed was a attack landed. The monster weakened.

And then—the final dish. Clean.

💫✨💥 VICTORY! ✨💫

"AMAZING!" Sparkle cheered. "You're a natural! +20 Sparkle Points! +10 XP!"

Rhia smiled. Maybe this wouldn't be so bad after all.

Just then, she heard the door. Her wife was home early.

"Quick! Detransform!" Sparkle whispered, disappearing.

"Honey?" her wife called out.

"Just doing the dishes!" Rhia called back, as if it was the most normal thing in the world.

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

Sparkle giggled. "That's the fun part! You get to know the TRUTH! You're not just doing chores—you're saving the realm! They see you making the bed. You know you're defeating the Bed Chaos Imp!"

Rhia had to admit, it did make things more interesting.

Her kid ran into the room. "Mom! Can we play?"

"Sure, honey. Just let me finish—" Rhia glanced at Sparkle, who had frozen mid-flight. "—putting away these toys."

"You're doing chores AGAIN?" her kid groaned.

Rhia smiled. "Someone has to keep the Toy Tornado from taking over."

"Huh?"

"Nothing, sweetie. Nothing."

When her kid left, Sparkle unfroze. "Close one! But you're getting good at this cover story thing!"

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

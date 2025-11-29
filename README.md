# Fedorable - Zoo Animal Care Tracker

A modern, gamified animal care tracking app built with Next.js, featuring push notifications, recurring tasks, and smart scheduling. Help Fedora manage a thriving zoo by completing daily animal care tasks!

## Features

### ✅ Core Functionality
- **Animal Care Tasks**: Create, complete, and manage zoo care responsibilities
- **Care Level System**: Rate tasks by difficulty (1-5 stars)
- **Recurring Tasks**: Set up daily, weekly, or custom schedules for animal care
- **Quest Types**: Organize tasks as daily, weekly, boss (big tasks), side quests, or one-time tasks

### 🎮 Gamification
- **XP & Levels**: Earn experience points and level up from Junior Zookeeper to Zoo Director
- **Rank System**: Progress through 5 star ranks as you gain levels
- **Streaks**: Build daily completion streaks
- **Dynamic Rewards**: Earn Zoo Coins 🪙, Treats 🍖, and XP ⚡
- **Titles**: Unlock special titles like "Fedora, Friend of All Creatures"
- **Critical Hits**: 20% chance for perfect care with bonus rewards

### 🦁 Zoo Theme
- **Character**: Play as Fedora, a dedicated zookeeper
- **Zoo Guide**: Zooey the parrot 🦜 provides helpful tips and encouragement
- **Animal Stickers**: Collect 40+ animal stickers from the shop
- **Story Mode**: Follow Fedora's journey through unlockable story chapters
- **Vacation Days**: Purchase streak protection with Zoo Coins

### 📅 Smart Scheduling
- **Notification Settings**: Customize notification times for each day of the week
- **Recurring Rules**: Use RRule for complex recurring schedules
- **Task Templates**: 40+ pre-made animal care tasks to get started quickly

### 🔔 Notifications
- **Push Notifications**: Get reminded about animal care tasks
- **Custom Times**: Set different notification times per quest
- **Action Buttons**: Complete or snooze directly from notifications

### 🛍️ Shop & Collections
- **Animal Shop**: Purchase animal stickers with Treats 🍖
- **Achievement Stickers**: Unlock special stickers by completing challenges
- **Sticker Book**: View your complete collection
- **Vacation Days**: Buy streak protection for 50 Zoo Coins 🪙

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Prisma ORM with PostgreSQL
- **UI**: Tailwind CSS with custom gradient design (emerald/green/teal theme)
- **Notifications**: Web Push API with Service Workers
- **Scheduling**: RRule for recurring tasks
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or use Vercel Postgres)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Fedorable
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Generate VAPID keys for push notifications:
```bash
npx web-push generate-vapid-keys
```

Add the generated keys to your `.env` file:
```
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-public-key"
VAPID_PRIVATE_KEY="your-private-key"
VAPID_SUBJECT="mailto:your-email@example.com"
```

5. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

6. Seed the shop with stickers:
```bash
npm run seed
```

7. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start your zoo adventure!

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub

2. Import your repository in Vercel

3. Add environment variables:
   - `DATABASE_URL`: Vercel Postgres connection string
   - `DIRECT_URL`: Vercel Postgres direct connection string
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: Your VAPID public key
   - `VAPID_PRIVATE_KEY`: Your VAPID private key
   - `VAPID_SUBJECT`: Your email
   - `CRON_SECRET`: Secret for cron job authentication

4. Deploy!

### Database Options

**Production**:
- Vercel Postgres (recommended)
- Neon
- Supabase
- Railway

The schema is configured for PostgreSQL by default.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── magical-girl/ # Player profile
│   │   ├── quests/       # Quest CRUD operations
│   │   ├── notifications/# Push notification handling
│   │   ├── shop/         # Sticker shop
│   │   └── cron/         # Scheduled tasks
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard
├── components/           # React components
│   ├── QuestBoard.tsx    # Main task board
│   ├── BattleSequence.tsx# Task completion animation
│   ├── MonsterLab.tsx    # Task planner
│   ├── SparkleShop.tsx   # Animal shop
│   ├── StickerBook.tsx   # Collection viewer
│   ├── StoryReader.tsx   # Story chapters
│   └── NotificationSettings.tsx
├── lib/
│   ├── gameData.ts       # Game content (tasks, dialogue, stories)
│   ├── gameUtils.ts      # Game mechanics
│   ├── shopData.ts       # Shop inventory
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
└── public/
    ├── manifest.json     # PWA manifest
    └── sw.js            # Service worker
```

## Usage

### Adding a Task

**Using Templates:**
1. Click "📋 Task Planner"
2. Browse 40+ pre-made animal care tasks
3. Click a template to customize timing
4. Set notification preferences
5. Add to your task board

**Creating Custom Tasks:**
1. Click "📋 Task Planner" → "Create Custom"
2. Fill in details:
   - Task Name (e.g., "Clean Lion Habitat")
   - Animal/Task Emoji 🦁
   - Realm (area of zoo)
   - Care Level (1-5 stars)
   - Quest Type (daily/weekly/one-time)
3. Set up recurring schedule if needed
4. Configure notification times
5. Create task!

### Completing Tasks

1. Click "START TASK!" on any quest card
2. Watch the animated task completion sequence
3. Earn rewards:
   - Zoo Coins 🪙 (always)
   - Treats 🍖 (for higher difficulty tasks)
   - XP ⚡ (always)
4. 20% chance for PERFECT CARE with bonus rewards!
5. Every 10 tasks completed earns a Vacation Day 🏖️

### Shopping for Stickers

1. Click "🦁 Animal Shop"
2. Browse categories:
   - Starter (free)
   - Zoo Animals
   - Nature
   - Food
   - Sparkle
   - Achievements (unlocked by completing challenges)
3. Purchase with Treats 🍖
4. View collection in Sticker Book

### Managing Your Zoo

- **Level Up**: Earn XP to increase your zookeeper level
- **Rank Progression**:
  - ⭐ Junior Zookeeper (Level 1-10)
  - ⭐⭐ Zookeeper (Level 11-20)
  - ⭐⭐⭐ Senior Zookeeper (Level 21-30)
  - ⭐⭐⭐⭐ Head Zookeeper (Level 31-40)
  - ⭐⭐⭐⭐⭐ Zoo Director (Level 41+)
- **Story Chapters**: Unlock new chapters every 5 levels
- **Streaks**: Complete tasks daily to build your streak
- **Vacation Days**: Use them to protect your streak when you need a break

## Game Mechanics

### Currency
- **Zoo Coins** 🪙: Earned from completing tasks (10-50 per task)
- **Treats** 🍖: Earned from difficult tasks (4-5 star difficulty)
- **Vacation Days** 🏖️: Earned every 10 completed tasks, or buy for 50 Zoo Coins

### Level Formula
- Level = floor(sqrt(XP / 100)) + 1
- XP for next level = currentLevel² × 100

### Rewards Scale
- 1 star: 10 coins, 0 treats, 5 XP
- 2 stars: 20 coins, 0 treats, 10 XP
- 3 stars: 30 coins, 0 treats, 15 XP
- 4 stars: 50 coins, 2 treats, 20 XP
- 5 stars: 70 coins, 2 treats, 25 XP

## Features Roadmap

### Implemented ✅
- [x] Quest system with 40+ animal care templates
- [x] Recurring schedules with custom timing
- [x] Gamification (XP, levels, ranks, streaks)
- [x] Zoo-themed rewards (coins, treats, vacation days)
- [x] Push notifications with custom times
- [x] Animal sticker shop with 40+ stickers
- [x] Achievement system
- [x] Story mode with chapters
- [x] Animated task completion sequences

### Future Enhancements 🚀
- [ ] Multiple zoos/users
- [ ] Shared tasks for zoo staff
- [ ] More story chapters
- [ ] Seasonal events and limited stickers
- [ ] Statistics dashboard
- [ ] Zoo expansion mechanics
- [ ] Mobile app
- [ ] Social features (visit friends' zoos)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Built with ❤️ for animal lovers and productivity enthusiasts!

Special thanks to all the virtual animals under Fedora's care. 🦁🐧🦒🐘

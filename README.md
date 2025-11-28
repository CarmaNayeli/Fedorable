# Rhia-minder - Gamified Chore Tracker

A modern, gamified chore tracking app built with Next.js, featuring push notifications, recurring tasks, and smart scheduling.

## Features

### ✅ Core Functionality
- **Chore Management**: Create, complete, and skip chores
- **Time Estimation**: Add time estimates (minutes) or difficulty scale (1-5)
- **Recurring Tasks**: Set up chores to repeat daily, weekly, or on custom schedules
- **Priority System**: Organize chores by priority (low, medium, high)

### 🎮 Gamification
- **XP & Levels**: Earn experience points and level up
- **Streaks**: Build daily completion streaks
- **Dynamic Rewards**: XP scales with difficulty and time investment

### 📅 Smart Scheduling
- **Days Off**: Schedule days when you don't want notifications (weekends, etc.)
- **Priority Modes**:
  - 🌙 **Light**: See only low-priority chores
  - ☀️ **Normal**: Balanced view of all chores
  - ⚡ **Heavy**: Full productivity mode with all tasks

### 🔔 Notifications
- **Push Notifications**: Get reminded about your chores
- **Snooze Function**: Delay notifications by 15 minutes
- **Action Buttons**: Complete or snooze directly from notifications

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Prisma ORM with SQLite (Postgres ready for production)
- **UI**: Tailwind CSS with custom gradient design
- **State**: Zustand
- **Notifications**: Web Push API with Service Workers
- **Scheduling**: RRule for recurring tasks
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Rhia-minder
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
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-public-key"
VAPID_PRIVATE_KEY="your-private-key"
VAPID_SUBJECT="mailto:your-email@example.com"
```

5. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub

2. Import your repository in Vercel

3. Add environment variables:
   - `DATABASE_URL`: Use Vercel Postgres or another database
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: Your VAPID public key
   - `VAPID_PRIVATE_KEY`: Your VAPID private key
   - `VAPID_SUBJECT`: Your email

4. Deploy!

### Database Options

**Development**: SQLite (default)
**Production**:
- Vercel Postgres (recommended)
- PlanetScale
- Neon
- Supabase

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // or "mysql"
  url      = env("DATABASE_URL")
}
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── chores/       # Chore CRUD operations
│   │   ├── notifications/# Push notification handling
│   │   └── user/         # User settings
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard
├── components/           # React components
│   ├── AddChoreModal.tsx
│   ├── ChoreCard.tsx
│   ├── ChoreList.tsx
│   ├── SettingsModal.tsx
│   └── StatsPanel.tsx
├── lib/
│   ├── prisma.ts        # Prisma client
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Utility functions
├── prisma/
│   └── schema.prisma    # Database schema
└── public/
    ├── manifest.json    # PWA manifest
    └── sw.js           # Service worker
```

## Usage

### Adding a Chore

1. Click "Add Chore"
2. Fill in details:
   - Title (required)
   - Description (optional)
   - Time estimate in minutes
   - Difficulty (1-5 stars)
   - Priority (low/medium/high)
   - Color tag
3. Optionally set up recurrence:
   - Daily
   - Specific weekdays
   - Every N days
4. Click "Create Chore"

### Managing Settings

Click the settings icon to:
- Change priority mode (light/normal/heavy)
- Set days off (select days when you don't want notifications)
- Enable push notifications
- View your stats

### Completing/Skipping Chores

- **Complete**: Click the checkmark to earn XP and update your streak
- **Skip**: Click the skip button to defer without penalty

## Features Roadmap

### Implemented ✅
- [x] Chore creation with time/difficulty estimation
- [x] Recurring schedules
- [x] Gamification (XP, levels, streaks)
- [x] Priority system
- [x] Days off scheduling
- [x] Push notifications
- [x] Snooze functionality
- [x] Skip/cancel chores

### Future Enhancements 🚀
- [ ] Multiple users/authentication
- [ ] Shared chores for households
- [ ] Custom notification times per chore
- [ ] Statistics and analytics dashboard
- [ ] Achievement badges
- [ ] Theme customization
- [ ] Mobile app (React Native)
- [ ] Voice commands integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Built with ❤️ using modern web technologies.

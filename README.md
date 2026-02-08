# USC Coin
ONE Hack 3.0 | 2026 Submission By Team Quincers

# USC FoodChain

Real-time campus food marketplace built for OneHack 3.0.

## What it does

Shows live inventory from USC canteens so students can see what's available before walking there. Pay with USC tokens on OneChain.

## Tech Stack

- **Backend:** Node.js, Express, PostgreSQL (Supabase)
- **Blockchain:** OneChain, OneWallet
- **Frontend:** Next.js (coming soon)

## Setup
```bash
cd backend/api
npm install
npm run dev
```

Add `.env` file with your Supabase credentials.

## API Endpoints

- `GET /api/vendors` - List canteens
- `GET /api/menu` - All available food
- `GET /api/vendors/:id/menu` - Menu for specific canteen

## Team

Team Quincers - University of San Carlos

## Status

In development for OneHack 3.0 (Feb 8 - Mar 9, 2026)
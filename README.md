# Little Jappy's Joyful Hub

A baby care management platform built with React, TypeScript, and Tailwind CSS.

## Features

- Baby product shop with cart, reviews, and checkout (M-Pesa, Card, Bank Transfer)
- Babysitter booking system with availability, distance, and booking status
- Parenting tips by age milestone with expert sources
- Community donation platform connecting donors with families in need
- Admin dashboard for managing products, bookings, sitters, and donations
- Customer authentication (signup / login)

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router v6
- Browser localStorage (no backend required)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ytlewis/little-jappys.git

# 2. Enter the project folder
cd little-jappys

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:8080**

### Build for Production

```bash
npm run build
npm run preview
```

## Admin Access

Navigate to `/admin/login`

- Username: `admin`
- Password: `admin123`

## Project Structure

```
src/
├── assets/          # Product and sitter images
├── components/      # Shared UI components
│   ├── admin/       # Admin dashboard components
│   └── ui/          # shadcn/ui components
├── context/         # React context (Auth)
├── hooks/           # Custom hooks
├── lib/             # Data, storage utilities
└── pages/           # Route pages
```

## License

MIT

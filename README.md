# Little Jappy's - Baby Care & Services Platform

A comprehensive web platform for baby products, babysitting services, parenting resources, and community support.

## Features

### 🛍️ Baby Shop
- Browse and purchase quality baby products
- Product categories: Clothing, Feeding, Toys, Hygiene, Nursery
- Secure shopping cart and checkout
- Product reviews and ratings
- Prices in Kenya Shillings (KSh)

### 👶 Babysitting Services
- Browse verified babysitters
- View sitter profiles with experience and ratings
- Book babysitters with date, time, and duration
- Real-time cost calculation
- Manage bookings through admin dashboard

### 📚 Parenting Resources
- Age-specific parenting tips (0-6 months, 6-12 months, 1-2 years)
- Expert advice on baby care
- Helpful guides for new parents

### 🤝 Community Support
- Donation platform for baby items
- Give back to families in need
- Track community contributions

### 📞 Contact & Support
- Direct contact information
- Contact form for inquiries
- Business hours and location

## User Features

### For Customers
- User registration and authentication
- Secure login system
- Shopping cart management
- Product reviews and ratings
- Babysitter booking system
- Order history tracking

### For Administrators
- Admin dashboard with analytics
- Product management (add, edit, delete)
- Booking management (confirm, cancel)
- User and order tracking
- Review monitoring

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Query
- **Forms**: React Hook Form + Zod
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ytlewis/little-jappys.git
cd little-jappys
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── admin/       # Admin-specific components
│   └── ui/          # Base UI components
├── pages/           # Page components
├── lib/             # Utility functions and data
├── hooks/           # Custom React hooks
└── assets/          # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Admin Access

To access the admin dashboard:
1. Navigate to `/admin/login`
2. Use your admin credentials
3. Manage products, bookings, and view analytics

## Customer Features

### Shopping
1. Browse products at `/shop`
2. Add items to cart
3. Proceed to checkout
4. Leave reviews after purchase

### Babysitting
1. View babysitters at `/babysitting`
2. Select a sitter
3. Fill booking form with date, time, and details
4. Confirm booking

## Security Features

- Secure authentication system
- Protected admin routes
- Input validation and sanitization
- XSS protection
- Secure data storage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private project. For inquiries, please contact the development team.

## License

© 2026 Little Jappy's. All rights reserved.

## Contact

- **Email**: sapenzian@gmail.com
- **Phone**: 0722 123 329
- **Location**: Nairobi, Kenya

## Acknowledgments

- Developed by Sapenzia Musyoka
- UI components from shadcn/ui
- Icons from Lucide
- Images from Unsplash

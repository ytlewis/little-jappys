# Little Jappy's - Baby Care & Services Platform

A comprehensive web platform for baby products, babysitting services, parenting resources, and community support.

## 🚀 Quick Start for Visual Studio Code

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ytlewis/little-jappys.git
   cd little-jappys
   ```

2. **Open in Visual Studio Code**
   ```bash
   code .
   ```
   Or open VS Code and use `File > Open Folder` and select the project folder.

3. **Install dependencies**
   
   Open the integrated terminal in VS Code (`Ctrl + ~` or `View > Terminal`) and run:
   ```bash
   npm install
   ```
   
   Wait for all packages to install (this may take a few minutes).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will start at: **http://localhost:8080**

5. **Open in browser**
   
   Click the link in the terminal or manually open: http://localhost:8080

### 🎯 That's It! You're Ready to Develop!

The development server will automatically reload when you make changes to the code.

---

## 📁 Project Structure

```
little-jappys/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── admin/       # Admin-specific components
│   │   └── ui/          # Base UI components (shadcn/ui)
│   ├── pages/           # Page components (routes)
│   ├── lib/             # Utility functions and data
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Images and static files
│   └── main.tsx         # Application entry point
├── public/              # Public static files
└── package.json         # Dependencies and scripts
```

---

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

---

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```
Starts the app at http://localhost:8080 with hot reload.

### Build for Production
```bash
npm run build
```
Creates optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

### Run Linter
```bash
npm run lint
```
Check code for errors and style issues.

### Run Tests
```bash
npm test
```
Run the test suite.

---

## 🎨 VS Code Recommended Extensions

For the best development experience, install these extensions:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Tailwind autocomplete
3. **ESLint** - Code linting
4. **Prettier** - Code formatting
5. **TypeScript Vue Plugin (Volar)** - TypeScript support

VS Code will prompt you to install recommended extensions when you open the project.

---

## 🔑 Admin Access

To access the admin dashboard:
1. Navigate to `/admin/login`
2. Use your admin credentials
3. Manage products, bookings, and view analytics

---

## 🌐 Available Pages

- **Home**: `/` - Landing page
- **Shop**: `/shop` - Browse and buy products
- **Cart**: `/cart` - Shopping cart
- **Babysitting**: `/babysitting` - Book babysitters
- **Parenting**: `/parenting` - Parenting tips
- **Donate**: `/donate` - Donation platform
- **Contact**: `/contact` - Contact information
- **Login**: `/login` - Customer login
- **Signup**: `/signup` - Customer registration
- **Admin Login**: `/admin/login` - Admin access
- **Admin Dashboard**: `/admin/dashboard` - Admin panel

---

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is already in use, the dev server will automatically use the next available port.

### Dependencies Not Installing
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### Build Errors
Make sure you're using Node.js version 18 or higher:
```bash
node --version
```

### Hot Reload Not Working
Try restarting the dev server (`Ctrl+C` then `npm run dev`).

---

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🤝 Contributing

This is a private project. For inquiries, please contact the development team.

---

## 📄 License

© 2026 Little Jappy's. All rights reserved.

---

## 📞 Contact

- **Email**: sapenzian@gmail.com
- **Phone**: 0722 123 329
- **Location**: Nairobi, Kenya

---

## 🙏 Acknowledgments

- Developed by Sapenzia Musyoka
- UI components from shadcn/ui
- Icons from Lucide
- Images from Unsplash

---

## 💡 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Make sure all dependencies are installed
3. Verify Node.js version is 18+
4. Contact: sapenzian@gmail.com

**Happy Coding! 🚀**

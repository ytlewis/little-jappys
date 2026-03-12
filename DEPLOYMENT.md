# Deployment Guide

## Production Build

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Little Jappy's
VITE_API_URL=your_api_url_here
```

## Deployment Options

### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

### Option 3: GitHub Pages

1. Update `vite.config.ts` with base path
2. Build the project
3. Deploy to gh-pages branch

## Post-Deployment

1. Test all features:
   - User registration/login
   - Product browsing and purchase
   - Babysitter booking
   - Admin dashboard access

2. Verify security:
   - Admin routes are protected
   - Authentication works correctly
   - Data is stored securely

3. Monitor performance:
   - Page load times
   - API response times
   - Error tracking

## Maintenance

- Regularly update dependencies
- Monitor user feedback
- Backup data periodically
- Review security logs

## Support

For deployment issues, contact: sapenzian@gmail.com

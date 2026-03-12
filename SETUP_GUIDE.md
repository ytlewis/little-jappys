# 🚀 Setup Guide for Visual Studio Code

## Quick Start (3 Steps!)

### Step 1: Install Node.js
1. Download from: https://nodejs.org/
2. Install the LTS version (recommended)
3. Verify installation:
   ```bash
   node --version
   ```
   Should show v18 or higher

### Step 2: Open in VS Code
1. Open Visual Studio Code
2. Click `File > Open Folder`
3. Select the `little-jappys` folder
4. VS Code will prompt to install recommended extensions - click "Install All"

### Step 3: Run the Project
1. Open the integrated terminal in VS Code:
   - Press `Ctrl + ~` (Windows/Linux)
   - Or `Cmd + ~` (Mac)
   - Or go to `View > Terminal`

2. Install dependencies (first time only):
   ```bash
   npm install
   ```
   Wait for it to complete (2-3 minutes)

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to: **http://localhost:8080**

**That's it! You're ready to develop!** 🎉

---

## 📝 Common Commands

### Start Development Server
```bash
npm run dev
```
- Starts the app with hot reload
- Opens at http://localhost:8080
- Changes auto-refresh in browser

### Stop Development Server
- Press `Ctrl + C` in the terminal

### Build for Production
```bash
npm run build
```
- Creates optimized build in `dist` folder

### Check for Errors
```bash
npm run lint
```
- Checks code for issues

---

## 🎨 VS Code Tips

### Keyboard Shortcuts
- `Ctrl + ~` - Toggle terminal
- `Ctrl + P` - Quick file search
- `Ctrl + Shift + F` - Search in all files
- `Ctrl + /` - Comment/uncomment line
- `Alt + Up/Down` - Move line up/down
- `Ctrl + D` - Select next occurrence

### Recommended Extensions (Auto-prompted)
When you open the project, VS Code will suggest installing:
- ESLint - Code quality
- Prettier - Code formatting
- Tailwind CSS IntelliSense - CSS autocomplete
- ES7+ React Snippets - Code snippets

Click "Install All" when prompted!

---

## 🐛 Troubleshooting

### "npm: command not found"
- Node.js is not installed
- Download from: https://nodejs.org/
- Restart VS Code after installing

### "Port 8080 is already in use"
- Another app is using port 8080
- The dev server will automatically use port 8081
- Or stop the other app using port 8080

### Dependencies Won't Install
1. Delete `node_modules` folder
2. Delete `package-lock.json` file
3. Run `npm install` again

### Changes Not Showing in Browser
1. Make sure dev server is running (`npm run dev`)
2. Hard refresh browser: `Ctrl + Shift + R`
3. Check terminal for errors

### TypeScript Errors in VS Code
1. Restart TypeScript server:
   - Press `Ctrl + Shift + P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

---

## 📁 Project Structure

```
little-jappys/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── lib/              # Utilities
│   └── main.tsx          # Entry point
├── public/               # Static files
├── .vscode/             # VS Code settings
├── package.json         # Dependencies
└── README.md           # Documentation
```

---

## 🎯 What to Edit

### To Change Pages:
- Edit files in `src/pages/`
- Example: `src/pages/HomePage.tsx`

### To Change Components:
- Edit files in `src/components/`
- Example: `src/components/Header.tsx`

### To Change Styles:
- Edit `src/index.css` for global styles
- Use Tailwind classes in components

### To Add Products:
- Login to admin: http://localhost:8080/admin/login
- Go to "Manage Products" section
- Click "Add Product"

---

## ✅ Checklist

Before you start developing:
- [ ] Node.js installed (v18+)
- [ ] VS Code installed
- [ ] Project folder opened in VS Code
- [ ] Extensions installed (prompted by VS Code)
- [ ] `npm install` completed successfully
- [ ] `npm run dev` running
- [ ] Browser showing app at http://localhost:8080

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Read the main [README.md](./README.md)
3. Contact: sapenzian@gmail.com

**Happy Coding! 🚀**

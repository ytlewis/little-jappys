# Push to GitHub - Step by Step

## You need to do 2 things:

### STEP 1: Create the Repository on GitHub (Do this first!)

1. Open your browser and go to: **https://github.com/new**
2. Log in with your GitHub account (ytlewis)
3. Fill in the form:
   - **Repository name**: `little-jappys`
   - **Description**: Baby care platform with shop and babysitting services
   - **Visibility**: Choose Public or Private
   - **IMPORTANT**: Do NOT check any boxes (no README, no .gitignore, no license)
4. Click the green **"Create repository"** button
5. You'll see a page with instructions - LEAVE IT OPEN

### STEP 2: Push Your Code

Now open your terminal (Command Prompt or PowerShell) and run these commands ONE BY ONE:

```bash
cd "C:\Users\gatha\OneDrive\Desktop\little-jappy's\little-jappy-s-joyful-hub-main"
```

```bash
git remote add origin https://github.com/ytlewis/little-jappys.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

### What Each Command Does:

1. **cd** - Goes to your project folder
2. **git remote add** - Connects your local code to GitHub
3. **git branch -M main** - Renames branch to main
4. **git push** - Uploads your code to GitHub

### After Pushing:

Go to: **https://github.com/ytlewis/little-jappys**

You should see all your files there! 🎉

---

## If You Get an Error:

### "remote origin already exists"
Run this first:
```bash
git remote remove origin
```
Then try the `git remote add origin` command again.

### "Authentication failed"
You need to set up a Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "little-jappys"
4. Check "repo" scope
5. Generate and copy the token
6. Use the token as your password when pushing

### "Repository not found"
Make sure you created the repository on GitHub first (Step 1)!

---

## Quick Check:

Before pushing, verify your git is set up:
```bash
git config user.name
git config user.email
git remote -v
```

Should show:
- Name: ytlewis
- Email: gathaiyalewis1122@gmail.com
- Remote: (nothing yet, until you add it)

---

**Ready? Create the repo on GitHub first, then run the commands!** 🚀

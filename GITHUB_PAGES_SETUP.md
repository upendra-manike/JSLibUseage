# 📦 GitHub Pages Deployment Guide

## ✅ Pre-Setup Complete

- ✅ `vite.config.js` updated with base path
- ✅ `package.json` has deploy scripts ready
- ✅ Build configuration ready

## 🚀 Deployment Steps

### Step 1: Initialize Git Repository (if not already done)

```bash
# Initialize git
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - @upendra.manike packages demo"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `JSLibUseage` (or your preferred name)
3. Choose **Public** (required for free GitHub Pages)
4. Click **"Create repository"**

### Step 3: Connect Local Repo to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/JSLibUseage.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/JSLibUseage.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Update Base Path in vite.config.js

**IMPORTANT:** Update the base path to match your repository name:

```js
// vite.config.js
export default defineConfig({
  base: '/JSLibUseage/', // Change this to your repo name
  // ...
})
```

If your repo is named differently, change `/JSLibUseage/` to `/{your-repo-name}/`

### Step 5: Build and Deploy

```bash
# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Deploy `dist` folder to `gh-pages` branch
3. Make your site live!

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch: **`gh-pages`**
5. Select folder: **`/ (root)`**
6. Click **Save**

## 🎉 Your Site is Live!

Your site will be available at:
```
https://YOUR_USERNAME.github.io/JSLibUseage/
```

**Note:** It may take 1-2 minutes for changes to propagate.

---

## 🔄 Update Your Site

After making changes:

```bash
# Make changes, then:
git add .
git commit -m "Update app"
git push

# Deploy
npm run deploy
```

---

## 🛠️ Troubleshooting

### Issue: 404 errors on routes
**Solution:** Make sure `base` path in `vite.config.js` matches your repo name exactly.

### Issue: Assets not loading
**Solution:** 
1. Check `base` path is correct
2. Clear browser cache
3. Wait a few minutes for GitHub Pages to update

### Issue: White screen
**Solution:**
- Check browser console for errors
- Verify all imports are correct
- Rebuild: `npm run build` and `npm run deploy`

---

## 📝 Quick Reference

**Deploy command:**
```bash
npm run deploy
```

**Update base path:**
Edit `vite.config.js` → Change `base: '/JSLibUseage/'` to your repo name

**Your site URL:**
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## ✅ Checklist

Before deploying:
- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Remote added (`git remote add origin`)
- [ ] Base path updated in `vite.config.js`
- [ ] Code pushed to GitHub
- [ ] `npm run deploy` executed
- [ ] GitHub Pages enabled in Settings

**You're ready to deploy!** 🚀


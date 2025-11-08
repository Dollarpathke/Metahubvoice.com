# GitHub Setup Guide for Metahub Voice

Follow these steps to push your project to GitHub.

## Prerequisites

- Git installed on your computer
- GitHub account created
- Repository created on GitHub (e.g., `metahub-voice`)

## Step-by-Step Instructions

### 1. Initialize Git Repository (if not already done)

Open your terminal/command prompt in the project folder and run:

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Metahub Voice - The Voice of Decentralized Wealth"
```

### 4. Add Your GitHub Repository as Remote

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:
```bash
git remote add origin https://github.com/sethcryptolord/metahub-voice.git
```

### 5. Push to GitHub

For the first push:

```bash
git branch -M main
git push -u origin main
```

For subsequent pushes:

```bash
git push
```

## Alternative: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "Add" → "Add Existing Repository"
4. Select your project folder
5. Click "Publish repository"
6. Choose repository name and visibility
7. Click "Publish Repository"

## Verify Your Upload

1. Go to your GitHub repository URL
2. You should see all your files including:
   - index.html
   - crypto-trading-course.html
   - my-library.html
   - backend/ folder
   - README.md

## Important Notes

✅ The `.gitignore` file is already created - it will prevent sensitive files from being uploaded:
- `.env` files (contains secrets)
- `node_modules/` (dependencies)
- Log files

⚠️ **NEVER commit your `.env` file!** It contains sensitive information like:
- Database passwords
- API keys
- JWT secrets

## Updating Your Repository

After making changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Common Git Commands

```bash
# Check status
git status

# View commit history
git log

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# View remote URL
git remote -v
```

## Need Help?

If you encounter issues:
1. Check that Git is installed: `git --version`
2. Verify you're in the correct folder: `pwd` (Mac/Linux) or `cd` (Windows)
3. Make sure you have internet connection
4. Verify your GitHub credentials

## Repository Settings

After pushing, configure these on GitHub:

1. **GitHub Pages** (for frontend hosting):
   - Go to Settings → Pages
   - Select branch: main
   - Select folder: / (root)
   - Save

2. **Add Description**:
   "Metahub Voice - The Voice of Decentralized Wealth. Crypto trading education and Web3 empowerment platform."

3. **Add Topics**:
   - crypto
   - education
   - web3
   - trading
   - affiliate-marketing
   - nodejs
   - mongodb

## Success! 🎉

Your Metahub Voice project is now on GitHub and ready to share with the world!

Repository URL format:
`https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

---

**Built by Seth Cryptolord & Starico Isige John**

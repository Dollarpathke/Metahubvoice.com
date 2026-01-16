# Install Git on Windows

Git is not currently installed on your system. Follow these steps:

## Option 1: Download Git for Windows (Recommended)

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download will start automatically
   - Or click "Click here to download manually"

2. **Install Git:**
   - Run the downloaded installer
   - Use default settings (just click "Next")
   - Important: Make sure "Git Bash Here" is checked
   - Complete the installation

3. **Verify Installation:**
   - Open a new Command Prompt or PowerShell
   - Type: `git --version`
   - You should see: `git version 2.x.x`

## Option 2: Use GitHub Desktop (Easier)

1. **Download GitHub Desktop:**
   - Go to: https://desktop.github.com/
   - Download and install

2. **Sign in to GitHub:**
   - Open GitHub Desktop
   - Sign in with your GitHub account

3. **Add Your Repository:**
   - Click "File" → "Add Local Repository"
   - Browse to: `C:\Users\PC\OneDrive\Desktop\Metahubvoice.com`
   - Click "Add Repository"

4. **Publish to GitHub:**
   - Click "Publish repository"
   - Repository name: `Metahubvoice.com`
   - Uncheck "Keep this code private" (or keep checked if you want it private)
   - Click "Publish Repository"

## After Installing Git

### Method 1: Use the Batch File (Easiest)

1. Double-click `push-to-github.bat`
2. Wait for it to complete
3. Done! ✅

### Method 2: Manual Commands

Open Command Prompt or PowerShell in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Bull Bear Trading - Master the Markets"
git remote add origin https://github.com/Dollarpathke/Metahubvoice.com.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### "git is not recognized"
- Restart your computer after installing Git
- Or close and reopen Command Prompt/PowerShell

### "Permission denied"
- Make sure you're logged into GitHub
- Run: `git config --global user.name "Your Name"`
- Run: `git config --global user.email "your@email.com"`

### "Repository not found"
- Make sure the repository exists on GitHub
- Check you have access to: https://github.com/Dollarpathke/Metahubvoice.com

## Quick Links

- Git Download: https://git-scm.com/download/win
- GitHub Desktop: https://desktop.github.com/
- Your Repository: https://github.com/Dollarpathke/Metahubvoice.com

---

**Need help? Contact: info@metahubacademy.com**

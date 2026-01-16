# 📸 Add Checklist Cover Image - Quick Guide

## You Have the Image!

Your screenshot is at:
```
C:\Users\PC\Downloads\Screenshot_15-1-2026_165814_.jpeg
```

## What to Do (2 minutes):

### Step 1: Copy the File
1. Open File Explorer
2. Go to: `C:\Users\PC\Downloads\`
3. Find: `Screenshot_15-1-2026_165814_.jpeg`
4. **Copy** the file (Ctrl+C)

### Step 2: Paste to Project
1. Go to your project folder
2. Open the `images/` folder
3. **Paste** the file (Ctrl+V)

### Step 3: Rename the File
1. Right-click the pasted file
2. Select "Rename"
3. Change name to: `checklist-cover.jpg`
4. Press Enter

### Final Result:
```
your-project/
├── images/
│   ├── bullbear-logo.png
│   └── checklist-cover.jpg  ← Your screenshot here!
└── index.html
```

## Step 4: Test It!

1. Open `index.html` in your browser
2. Scroll to "Featured Products"
3. Look at the checklist card
4. Should show your screenshot! ✅

## Already Configured!

The code is already set up in `index.html` (line ~1362):
```html
<img src="images/checklist-cover.jpg" alt="Crypto Quickstart Checklist">
```

Once you move and rename the file, it will work automatically!

## Troubleshooting

**Image not showing?**
- Check file name is exactly: `checklist-cover.jpg` (lowercase)
- Check it's in the `images/` folder
- Hard refresh browser: Ctrl + F5

**Wrong image showing?**
- Clear browser cache
- Make sure old image is replaced

---

**Time:** 2 minutes
**Action:** Copy → Paste → Rename
**Result:** Your screenshot on the checklist card! 🎉

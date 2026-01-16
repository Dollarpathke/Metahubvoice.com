# 📄 Use PDF Cover as Card Image - Quick Guide

## Quick Steps (5 minutes)

### Step 1: Extract PDF Cover
1. Open `extract-pdf-cover.html` in your browser
2. Click "Choose PDF File"
3. Select `crypto-quickstart-checklist.pdf`
4. Wait for it to load (you'll see the first page)
5. Click "⬇️ Download Cover Image"
6. Image downloads as `checklist-cover.jpg`

### Step 2: Save to Images Folder
1. Move the downloaded `checklist-cover.jpg` to your project
2. Place it in the `images/` folder
3. Final path should be: `images/checklist-cover.jpg`

### Step 3: Update index.html
The checklist card image is already set to use the cover! 

**Current setting (line ~1309):**
```html
<img src="images/checklist-cover.jpg" alt="Crypto Quickstart Checklist">
```

If it's not already updated, find this line:
```html
<img loading="auto" class="card__image" alt="Crypto Quickstart Checklist"
     src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80">
```

And change to:
```html
<img loading="auto" class="card__image" alt="Crypto Quickstart Checklist"
     src="images/checklist-cover.jpg">
```

### Step 4: Test
1. Open `index.html` in browser
2. Scroll to Featured Products
3. See your PDF cover on the checklist card!

## Alternative: Manual Screenshot Method

If the PDF extractor doesn't work:

1. Open `crypto-quickstart-checklist.pdf` in any PDF viewer
2. Go to page 1
3. Take a screenshot (Windows: Win+Shift+S, Mac: Cmd+Shift+4)
4. Crop to just the page content
5. Save as `checklist-cover.jpg`
6. Move to `images/` folder

## Troubleshooting

**PDF won't load?**
- Make sure you're using a modern browser (Chrome, Firefox, Edge)
- Try the manual screenshot method instead

**Image looks blurry?**
- The extractor uses high quality (2.5x scale)
- If still blurry, increase scale in extract-pdf-cover.html (line 186)

**Card doesn't show image?**
- Check file path: `images/checklist-cover.jpg`
- Check file name is exactly: `checklist-cover.jpg` (lowercase)
- Refresh browser with Ctrl+F5 (hard refresh)

## What You'll Get

Before:
- Generic crypto stock photo

After:
- Actual first page of your PDF
- Shows real checklist content
- Professional and authentic
- Matches the PDF users will download

## File Locations

```
project/
├── images/
│   ├── bullbear-logo.png
│   └── checklist-cover.jpg  ← Save here
├── crypto-quickstart-checklist.pdf
├── extract-pdf-cover.html  ← Use this tool
└── index.html  ← Already configured
```

---

**Time Required:** 5 minutes
**Difficulty:** Easy
**Result:** Professional PDF cover on your card!

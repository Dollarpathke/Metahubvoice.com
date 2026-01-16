# Add Custom Checklist Cover Image

## Current Status
✅ Checklist card now shows a crypto-themed image
✅ Card redirects to signup page when clicked
✅ Signup page requires phone number

## To Use Your Own PDF Cover Image

### Option 1: Use Your PDF's First Page as Image

1. **Convert PDF first page to image:**
   - Open `crypto-quickstart-checklist.pdf`
   - Take a screenshot of the first page
   - Or use online tool: https://www.ilovepdf.com/pdf_to_jpg
   - Save as `checklist-cover.jpg` or `checklist-cover.png`

2. **Add image to project:**
   ```
   images/
   └── checklist-cover.jpg  (or .png)
   ```

3. **Update index.html:**
   Find the checklist card image line and change to:
   ```html
   <img loading="auto" class="card__image" alt="Crypto Quickstart Checklist"
        src="images/checklist-cover.jpg">
   ```

### Option 2: Use Current Crypto Image (Already Set)

The card currently uses a professional crypto-themed image from Unsplash:
```
https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80
```

This shows cryptocurrency/blockchain theme which is perfect for a crypto checklist.

### Option 3: Create Custom Cover Image

**Recommended dimensions:** 800x600px or 1200x800px

**Design tips:**
- Include "5-Step Crypto Quickstart Checklist" title
- Use BullBear branding colors (blue gradient: #6366f1 to #06b6d4)
- Add checklist icon or crypto symbols
- Keep it clean and professional

**Tools to create:**
- Canva (free): https://www.canva.com
- Figma (free): https://www.figma.com
- Photoshop/GIMP

### Option 4: Use Different Stock Image

Browse free crypto images:
- Unsplash: https://unsplash.com/s/photos/cryptocurrency
- Pexels: https://www.pexels.com/search/crypto/

Then update the `src` in index.html.

## Current Card Setup

The checklist card is located in `index.html` around line 1308:

```html
<div class="card checklist-card" onclick="showSignupForChecklist()">
    <img loading="auto" class="card__image" alt="Crypto Quickstart Checklist"
         src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80">
    <div class="card__body background-light">
        <span class="free-badge">🎁 FREE DOWNLOAD</span>
        <h4 class="card__title">Crypto Quickstart Checklist</h4>
        <p class="card__text">Essential checklist to kickstart your crypto trading journey. Get started with confidence!</p>
        <p class="signup-required">📝 Sign up to download</p>
    </div>
</div>
```

## How It Works Now

1. **User sees card** with crypto image
2. **User clicks anywhere on card**
3. **Redirects to** `checklist-signup.html`
4. **User signs up** with name, email, phone, password
5. **PDF downloads** and **email sent** automatically

## Testing

1. Open `index.html` in browser
2. Scroll to "Featured Products"
3. Click the checklist card
4. Should redirect to signup page
5. Complete signup
6. PDF downloads and email arrives

---

**Status:** ✅ Working with crypto-themed image
**Next:** Add your custom PDF cover image if desired

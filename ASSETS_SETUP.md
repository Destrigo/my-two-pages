# HeBe Order - App Icons & Assets Setup

## Required Assets

### 1. App Icon (Primary)
Create a **1024x1024px** PNG image with:
- No transparency
- No rounded corners (iOS handles this)
- The HeBe logo centered
- Background color: `#F5E6E8` (soft pink from brand colors)

---

## iOS Icons

### Automatic Generation (Recommended)
Use [appicon.co](https://appicon.co) or similar service:

1. Upload your 1024x1024px icon
2. Download iOS icon set
3. Replace contents of: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

### Required iOS Sizes:
- 20x20 @2x, @3x
- 29x29 @2x, @3x
- 40x40 @2x, @3x
- 60x60 @2x, @3x
- 76x76 @1x, @2x
- 83.5x83.5 @2x
- 1024x1024 @1x

### Manual Setup:
Place all icons in: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

Update `Contents.json` accordingly (or use Xcode to add icons).

---

## Android Icons

### Automatic Generation (Recommended)
Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/):

1. Upload your 1024x1024px icon
2. Choose "Launcher icons"
3. Download generated assets
4. Place in: `android/app/src/main/res/`

### Required Android Directories:
```
android/app/src/main/res/
├── mipmap-hdpi/
│   └── ic_launcher.png (72x72)
├── mipmap-mdpi/
│   └── ic_launcher.png (48x48)
├── mipmap-xhdpi/
│   └── ic_launcher.png (96x96)
├── mipmap-xxhdpi/
│   └── ic_launcher.png (144x144)
├── mipmap-xxxhdpi/
│   └── ic_launcher.png (192x192)
└── mipmap-anydpi-v26/
    ├── ic_launcher.xml
    └── ic_launcher_round.xml
```

### Adaptive Icon (Android 8+)
Android 8+ uses adaptive icons. Create:
- **Foreground layer:** Your logo (108x108dp safe area)
- **Background layer:** Solid color or pattern

Place in: `android/app/src/main/res/drawable/`

---

## Splash Screen

### iOS Splash Screen
The splash screen is defined in `LaunchScreen.storyboard`.

**Current Setup:** Shows app icon centered on pink background.

**To customize:**
1. Open `ios/App/App/Base.lproj/LaunchScreen.storyboard` in Xcode
2. Modify background color, logo, or text
3. Keep it simple - splash screens show briefly

### Android Splash Screen
Configured in `capacitor.config.ts`:
```typescript
SplashScreen: {
  launchShowDuration: 2000,
  backgroundColor: '#F5E6E8',
  androidSplashResourceName: 'splash',
  showSpinner: false
}
```

**To add custom splash image:**
1. Create `splash.png` (2732x2732px centered content)
2. Generate for all densities using Android Asset Studio
3. Place in: `android/app/src/main/res/drawable-*/splash.png`

---

## Store Listing Assets

### App Store (iOS)

**App Icon:**
- 1024x1024px PNG
- No transparency
- Upload directly in App Store Connect

**Screenshots:**
Minimum 1 set required. Recommended: all device sizes.

**iPhone 6.7" (Pro Max):** 1290x2796px
- Minimum: 1-3 screenshots
- Recommended: 3-5 screenshots

**iPhone 6.5" (Plus):** 1242x2688px
- Same as above

**iPhone 5.5":** 1242x2208px (optional, older devices)

**iPad Pro 12.9":** 2048x2732px
- Minimum: 1-3 screenshots

**iPad Pro 11":** 1668x2388px (optional)

**What to Screenshot:**
1. Login screen
2. Order form (empty)
3. Order form (filled with sample data)
4. Product selection screen
5. Success message after submission

**Tips:**
- Use actual device or high-quality simulator
- Show real UI, no mockups
- No excessive text overlays
- Show app in action

---

### Google Play Store

**Hi-res Icon:**
- 512x512px PNG
- 32-bit PNG with alpha
- Upload in Play Console

**Feature Graphic:**
- 1024x500px JPG or 24-bit PNG
- No transparency
- Required for store listing
- Design tip: Show app logo + tagline

**Screenshots:**
Minimum 2 required per device type.

**Phone Screenshots:**
- 1080x1920px or 1080x2340px (portrait)
- Minimum: 2, Maximum: 8
- First 2 are featured

**7-inch Tablet:**
- 1200x1920px (portrait)
- Optional but recommended

**10-inch Tablet:**
- 1920x1200px (landscape)
- Optional but recommended

**What to Screenshot:**
Same as iOS, but in Android UI.

---

## Quick Setup Commands

### Generate All Icons from Single Source
```bash
# Install icon generator (one-time)
npm install -g @capacitor/assets

# Generate all icons and splash screens
npx capacitor-assets generate --iconBackgroundColor '#F5E6E8' --splashBackgroundColor '#F5E6E8'
```

This requires a `resources/` folder with:
```
resources/
├── icon.png (1024x1024)
└── splash.png (2732x2732, centered content in middle 1200x1200)
```

---

## Asset Checklist

### Before App Store Submission:
- [ ] 1024x1024 app icon uploaded
- [ ] All iOS icon sizes generated
- [ ] All Android icon sizes generated
- [ ] Splash screen configured
- [ ] iPhone screenshots (minimum 1 set)
- [ ] iPad screenshots (optional but recommended)
- [ ] Feature graphic for Play Store
- [ ] Play Store phone screenshots (minimum 2)
- [ ] All assets follow brand colors

---

## Brand Colors Reference

From `src/index.css`:
- **Primary:** `hsl(340, 65%, 65%)` → `#E57A9B` (pink)
- **Background:** `hsl(340, 30%, 96%)` → `#F5E6E8` (soft pink)
- **Secondary:** `hsl(340, 30%, 90%)` → `#EEDEE1` (light pink)
- **Accent:** `hsl(340, 55%, 75%)` → `#E99DB3` (medium pink)

Use these consistently across all assets.

---

## Example Asset Creation

### Using Figma/Sketch/Adobe XD:

1. **Create 1024x1024 canvas**
2. **Set background:** `#F5E6E8`
3. **Add HeBe logo** (centered, scaled appropriately)
4. **Use font:** 'Great Vibes' for "HeBe"
5. **Export as PNG** (no transparency)

### Using Photoshop:

1. **New file:** 1024x1024px, 72 DPI, RGB
2. **Fill background:** `#F5E6E8`
3. **Add text layer:** "He'Be" in Great Vibes, color `#E57A9B`
4. **Add subtitle:** "No Age Skin" in Cormorant (optional)
5. **Save as PNG** (flatten layers)

---

## Online Tools for Asset Generation

**Icon Generation:**
- [appicon.co](https://appicon.co) - iOS + Android
- [makeappicon.com](https://makeappicon.com)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

**Screenshot Mockups:**
- [Previewed](https://previewed.app)
- [Shotsnapp](https://shotsnapp.com)
- [MockUPhone](https://mockuphone.com)

**Feature Graphic Design:**
- [Canva](https://canva.com) - Templates available
- [Figma](https://figma.com) - Free plan available

---

## Need Help?

If you need custom asset design:
1. Hire a designer on Fiverr or Upwork
2. Provide brand colors and existing logo
3. Request: app icon, splash screen, store screenshots
4. Budget: $50-$200 for full set

Or use automated tools and follow this guide!
# HeBe Order - Mobile Build & Deploy Guide

## Prerequisites

### Required Software
- **Node.js** 18+ and npm
- **Android Studio** (for Android builds)
- **Xcode** (for iOS builds, macOS only)
- **CocoaPods** (for iOS): `sudo gem install cocoapods`

### Installation
```bash
# Install dependencies
npm install

# Add Capacitor platforms (if not already added)
npx cap add android
npx cap add ios
```

---

## Building the App

### Step 1: Build Web Assets
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Step 2: Sync with Native Projects
```bash
npx cap sync
```
This copies web assets to native projects and updates native dependencies.

---

## Android Build Process

### Option A: Using Android Studio (Recommended)

1. **Open Android Studio:**
```bash
npm run mobile:android
# OR manually: npx cap open android
```

2. **Wait for Gradle sync** to complete

3. **Build APK for Testing:**
   - Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - APK will be in: `android/app/build/outputs/apk/debug/`

4. **Build Signed APK/AAB for Play Store:**
   - **Generate Signing Key** (first time only):
   ```bash
   keytool -genkey -v -keystore hebe-release-key.keystore -alias hebe-key -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   - **Configure signing** in `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file('../../hebe-release-key.keystore')
               storePassword 'YOUR_KEYSTORE_PASSWORD'
               keyAlias 'hebe-key'
               keyPassword 'YOUR_KEY_PASSWORD'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled true
               shrinkResources true
               proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

   - **Build Release AAB:**
     - Click **Build** → **Generate Signed Bundle / APK**
     - Select **Android App Bundle**
     - Choose your keystore
     - Select **release** build variant
     - AAB will be in: `android/app/build/outputs/bundle/release/`

### Option B: Command Line Build

```bash
# Debug build
cd android
./gradlew assembleDebug

# Release build (after configuring signing)
./gradlew bundleRelease
```

---

## iOS Build Process

### Option A: Using Xcode (Recommended)

1. **Open Xcode:**
```bash
npm run mobile:ios
# OR manually: npx cap open ios
```

2. **Configure Signing:**
   - Select the **App** target
   - Go to **Signing & Capabilities**
   - Select your **Team**
   - Ensure **Bundle Identifier** is: `it.hebe.orderform`

3. **Set Version & Build Number:**
   - Select project → **General** tab
   - Set **Version**: `1.0.0`
   - Set **Build**: `1`

4. **Build for Testing:**
   - Select a device or simulator
   - Click **Product** → **Build** (⌘B)

5. **Archive for App Store:**
   - Select **Any iOS Device (arm64)** as target
   - Click **Product** → **Archive**
   - When archive completes, click **Distribute App**
   - Follow App Store Connect upload wizard

### Option B: Command Line Build

```bash
# Build for simulator
cd ios/App
xcodebuild -workspace App.xcworkspace -scheme App -sdk iphonesimulator -configuration Debug

# Build for device (requires provisioning profile)
xcodebuild -workspace App.xcworkspace -scheme App -sdk iphoneos -configuration Release archive -archivePath ./build/App.xcarchive
```

---

## Quick Development Commands

```bash
# Build web + sync + open Android Studio
npm run mobile:android

# Build web + sync + open Xcode
npm run mobile:ios

# Build web + sync only
npm run mobile:sync

# Run on connected Android device
npm run mobile:run:android

# Run on connected iOS device
npm run mobile:run:ios
```

---

## App Store Submission Checklist

### Apple App Store

#### Before Submission:
- [ ] Create App Store Connect account
- [ ] Create app listing in App Store Connect
- [ ] Configure Bundle ID: `it.hebe.orderform`
- [ ] Add app icon (1024x1024px)
- [ ] Add screenshots (required sizes for each device)
- [ ] Add app description, keywords, privacy policy URL
- [ ] Set app category: **Business** or **Productivity**
- [ ] Verify age rating (likely 4+)
- [ ] Add support URL and privacy policy URL

#### Required Files:
- [ ] App icon set (App Icon.appiconset)
- [ ] Launch screen (LaunchScreen.storyboard)
- [ ] Privacy policy hosted online

#### App Review Information:
- [ ] Demo account credentials (if login required)
- [ ] Contact information
- [ ] Notes for reviewer

#### Export Compliance:
- [ ] Set `ITSAppUsesNonExemptEncryption` to `false` in Info.plist (already done)
- [ ] Confirm no encryption beyond HTTPS

#### Submit:
1. Archive app in Xcode
2. Upload to App Store Connect
3. Fill in all metadata
4. Submit for review
5. Wait 1-3 days for review

---

### Google Play Store

#### Before Submission:
- [ ] Create Google Play Console account ($25 one-time fee)
- [ ] Create app listing
- [ ] Configure app details:
  - App name: **HeBe Order**
  - Package: `it.hebe.orderform`
  - Category: **Business** or **Productivity**
  - Target audience: **General**

#### Required Assets:
- [ ] High-res icon (512x512px)
- [ ] Feature graphic (1024x500px)
- [ ] Screenshots (minimum 2, recommended 8):
  - Phone: 1080x1920px or 1080x2340px
  - 7-inch tablet: 1200x1920px
  - 10-inch tablet: 1920x1200px
- [ ] Privacy policy URL

#### App Content:
- [ ] Privacy policy
- [ ] Data safety form (declare "no data collected")
- [ ] Content rating questionnaire
- [ ] Target age rating: **Everyone**

#### Release:
1. Upload signed AAB file
2. Fill in all store listing details
3. Complete questionnaires
4. Submit for review
5. Wait 1-7 days for review

---

## Store Listing Recommendations

### App Description (English)

**Title:** HeBe Order - Agent Management

**Short Description:**
Professional order management system for HeBe sales agents. Create and submit orders efficiently on the go.

**Full Description:**
HeBe Order is the official mobile app for HeBe sales agents. Streamline your order process with an intuitive mobile interface designed for productivity.

**Features:**
• Simple login for registered agents
• Create detailed customer orders
• Add products with quantities and discounts
• Request display stands and samples
• Add order notes
• Submit orders directly via email
• Works offline - data stored securely on device
• No ads, no tracking, completely free

**For Sales Agents:**
Registered HeBe agents can use their credentials to access the order form and submit orders to the main office.

**Privacy First:**
Your data never leaves your device except when you explicitly submit an order. No tracking, no analytics, no data collection.

**Support:**
For questions or support, contact: ordini@newcossrl.it

---

### Keywords (for both stores)
sales, order, agent, business, productivity, hebe, form, orders, management, sales agent

---

## Version Management

### Incrementing Version Numbers

**For minor updates:**
- Change version in `package.json`: `1.0.0` → `1.0.1`
- **iOS:** Update **Version** and increment **Build** number
- **Android:** Increment `versionCode` and update `versionName` in `android/app/build.gradle`

**For feature updates:**
- Change version: `1.0.x` → `1.1.0`
- Reset build number to 1

**For major updates:**
- Change version: `1.x.x` → `2.0.0`
- Reset build number to 1

---

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
npm run build
npx cap sync
```

### Android: Gradle errors
```bash
cd android
./gradlew clean
./gradlew build
```

### iOS: CocoaPods errors
```bash
cd ios/App
pod deintegrate
pod install
```

### App crashes on device
- Check console logs in Xcode or Android Studio
- Verify all Capacitor plugins are correctly installed
- Test on different devices/OS versions

---

## Post-Launch Checklist

- [ ] Monitor crash reports (App Store Connect / Play Console)
- [ ] Check user reviews
- [ ] Update app with bug fixes as needed
- [ ] Keep dependencies updated
- [ ] Test on new OS versions before they launch

---

## Need Help?

Contact the development team or refer to:
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Android Developer Documentation](https://developer.android.com/docs)
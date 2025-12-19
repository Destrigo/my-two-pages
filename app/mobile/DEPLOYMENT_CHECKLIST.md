HeBe Order - Final Deployment Checklist
Pre-Build Verification
Code Quality
 All console.log statements removed or disabled
 No hardcoded passwords or API keys in code
 All TODO comments addressed
 TypeScript/ESLint errors fixed
 Build completes without warnings: npm run build
Functionality Testing
 Login works with valid credentials
 Login fails gracefully with invalid credentials
 Admin login works
 Admin can add/delete agents
 Form submission works
 Email is received at ordini@newcossrl.it
 All form fields validate correctly
 App works in portrait orientation
 App works in landscape orientation (if supported)
 Keyboard appears/disappears correctly
 Logout works correctly
Mobile-Specific Testing
 App installs successfully on device
 Splash screen displays correctly
 App icon shows correctly
 Status bar styling is correct
 Safe area insets work on notched devices
 Back button works on Android
 App doesn't crash on rotation
 No web-only APIs causing crashes
 Offline functionality (if applicable)
App Store Preparation (iOS)
Xcode Configuration
 Bundle ID: it.hebe.orderform
 Team selected in signing
 App name: "HeBe Order"
 Version: 1.0.0
 Build number: 1
 Deployment target: iOS 13.0 or higher
 All capabilities correctly configured
App Store Connect
 App listing created
 Bundle ID matches: it.hebe.orderform
 App name: "HeBe Order" (or "HeBe - Order Management")
 Subtitle: "Agent Order Management"
 Category: Business or Productivity
 Age rating: 4+
 Privacy policy URL added
 Support URL added
 App icon uploaded (1024x1024)
 Screenshots uploaded (all required sizes)
 App description written
 Keywords added
 Promotional text added (optional)
 Copyright notice: "© 2025 HeBe / New Cos S.r.l."
App Review Information
 Demo account credentials provided:
Username: [Provide demo agent name]
Password: [Provide demo password]
 Contact information: ordini@newcossrl.it
 Notes for reviewer explaining app purpose
 Export compliance: "No" to encryption question
Privacy & Compliance
 Privacy policy hosted online
 Privacy policy URL added to App Store Connect
 Data collection practices declared (none for this app)
 Age rating correct
 No in-app purchases
 No third-party advertising
Google Play Store Preparation (Android)
App Signing
 Release keystore generated
 Keystore backup stored securely
 Keystore passwords documented securely
 build.gradle configured with signing config
 Release AAB builds successfully
Play Console Setup
 App listing created
 Package name: it.hebe.orderform
 App name: "HeBe Order"
 Short description (80 chars)
 Full description (4000 chars)
 Category: Business or Productivity
 Tags: business, productivity, sales, orders
Store Listing Assets
 Hi-res icon uploaded (512x512)
 Feature graphic uploaded (1024x500)
 Phone screenshots (minimum 2)
 7-inch tablet screenshots (optional)
 10-inch tablet screenshots (optional)
Content Rating
 Content rating questionnaire completed
 Expected rating: Everyone or Teen
App Content
 Privacy policy URL added
 Data safety form completed:
Data collection: None
Data sharing: None
Security practices: Data encrypted in transit
 Target audience: Adults
 Content guidelines reviewed
Distribution
 Countries selected (all or specific)
 Pricing: Free
 No in-app products
 No ads
Technical Verification
Build Process
 Web build completes: npm run build
 Capacitor sync works: npx cap sync
 Android build succeeds
 iOS build succeeds
 No build warnings related to app code
App Size
 iOS IPA < 100MB
 Android APK/AAB < 100MB
 No unnecessary assets included
Performance
 App launches in < 3 seconds
 UI is responsive
 No ANR (Application Not Responding) errors on Android
 No crashes in testing
Security
 No sensitive data in logs
 HTTPS only for network requests
 Local storage encrypted by OS
 No debug code in production
Documentation
Internal Documentation
 README updated with mobile commands
 BUILD_AND_DEPLOY.md reviewed
 PRIVACY_POLICY.md accessible
 Demo credentials documented for team
User-Facing
 In-app help/FAQ (if applicable)
 Contact information visible
 Version number displayed in app
Post-Submission Monitoring
First 48 Hours
 Monitor App Store Connect for review status
 Monitor Play Console for review status
 Check for crash reports
 Respond to any review questions quickly
First Week
 Check user reviews
 Monitor crash analytics
 Verify email submissions working
 Test on various devices if possible
First Month
 Gather user feedback
 Plan updates if needed
 Monitor app performance metrics
Common Rejection Reasons (and how to avoid)
iOS App Store
App crashes on launch
✅ Test on actual device before submission
Inaccurate metadata
✅ Ensure screenshots show actual app
✅ Description matches functionality
Missing features from description
✅ Only mention features that actually work
Privacy issues
✅ Privacy policy URL must be accessible
✅ Must not collect data without disclosure
Login required but no demo account
✅ Provide working demo credentials
Google Play Store
Misleading content
✅ Don't use copyrighted images in listing
✅ Screenshots must show actual app
Privacy policy issues
✅ Must have accessible privacy policy
✅ Data safety form must be accurate
Crashes or bugs
✅ Test thoroughly before submission
Inappropriate content rating
✅ Complete rating questionnaire accurately
Launch Day Checklist
Morning of Launch
 Final build uploaded
 All metadata verified
 Demo account tested
 Team notified
 Support email monitored
After Approval
 Update internal documentation with store URLs
 Announce to agents via email
 Provide quick start guide
 Monitor for issues
First User Support
 Have support email ready: ordini@newcossrl.it
 Prepared for common questions:
How to login?
Forgot password?
How to submit order?
Order not received?
Version Update Checklist (Future Updates)
When releasing version 1.0.1, 1.1.0, etc.:

 Increment version in package.json
 Increment iOS version + build number
 Increment Android versionCode + versionName
 Update "What's New" section in stores
 Test update process (install old → update → new)
 Verify data persists after update
Emergency Rollback Plan
If critical bug found post-launch:

iOS
Remove app from sale immediately in App Store Connect
Fix bug locally
Submit expedited review with explanation
Typical expedited review: 1-2 days
Android
Halt rollout in Play Console (can pause release)
Fix bug locally
Upload new build
Resume rollout gradually (staged rollout recommended)
Success Metrics
Track these after launch:

 Number of downloads
 Daily active users
 Crash-free rate (target: >99%)
 App store rating (target: 4.0+)
 Average session length
 Order submission success rate
Contact Information for Support
Technical Issues:

Email: ordini@newcossrl.it
Response time: 24-48 hours
Agent Support:

Login issues: Contact admin
Order issues: Contact office
Store Review Responses:

Respond within 7 days
Be professional and helpful
Offer to help via email
Final Sign-Off
Before submitting to stores:

Product Owner: [ ] Approved
Technical Lead: [ ] Approved
QA Team: [ ] Approved
Legal/Compliance: [ ] Approved

Date: _______________
Submitted By: _______________

Congratulations! 🎉
You're ready to launch HeBe Order on mobile!

Remember: The first submission is always the hardest. Be patient with the review process, respond promptly to any questions, and celebrate when your app goes live!

Good luck! 🚀


import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.marcotarantino.HeBeForm', // ⚠️ Change this to your own (e.g., com.john.myapp)
  appName: 'heBe Form', // ⚠️ Change this to your actual app name
  webDir: 'dist',
  // ⚠️ REMOVE the server section for production builds
  // The app will use the local dist/ folder instead
};

export default config;

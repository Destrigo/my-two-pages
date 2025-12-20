import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'it.hebe.orderform',
  appName: 'HeBe Order',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F5E6E8',
      androidSplashResourceName: 'splash',
      iosSpinnerStyle: 'small',
      showSpinner: false
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#F5E6E8'
    }
  }
};

export default config;

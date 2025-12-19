import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'it.hebe.form',
  appName: 'HeBe Form',
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
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  }
};

export default config;
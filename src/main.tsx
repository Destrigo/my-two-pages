import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

// Initialize Capacitor plugins
const initCapacitor = async () => {
  try {
    // Configure status bar
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#F5E6E8' });

    // Configure keyboard
    Keyboard.setAccessoryBarVisible({ isVisible: true });

    // Hide splash screen after app loads
    await SplashScreen.hide();

    // Handle back button on Android
    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapApp.exitApp();
      } else {
        window.history.back();
      }
    });
  } catch (error) {
    console.log('Capacitor initialization error (probably running in browser):', error);
  }
};

// Initialize app
initCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
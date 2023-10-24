import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.madina-inventory',
  appName: 'Madina Inventory App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

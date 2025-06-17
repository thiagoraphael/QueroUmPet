import React, { useEffect, useCallback } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';

// Impede a splash screen de desaparecer antes da hora
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  const isFontsLoaded = barriecitoLoaded && georamaLoaded;

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!isFontsLoaded) {
    return null;  // Enquanto as fontes carregam, mantém a splash screen
  }

  return <AppNavigator />;
}
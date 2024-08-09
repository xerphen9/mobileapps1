import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HeaderComponent } from '@/components/HeaderComponent';
import { ThemedText } from '@/components/ThemedText';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Sans Serif Medium.ttf'),
    Poppins: require('@/assets/fonts/Poppins-Regular.otf')
  });

  const header = 
    <HeaderComponent>
      <ThemedText type='subtitle' style={styles.subtitle}>
        Hi David,
      </ThemedText>
      <ThemedText type='title' style={styles.title1}>
        Let's Pay
      </ThemedText>
      <ThemedText type='title' style={styles.title2}>
        your Bills
      </ThemedText>
    </HeaderComponent>

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: true,
            headerTitle: 'Bayar-Bayar',
            statusBarTranslucent: true,
            header: () => header
          }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#fff',
    textAlign: 'left',
  },
  title1: {
    color: '#fff',
    textAlign: 'left',
    lineHeight: 50,
    marginStart: 20,
    fontSize: 35,
  },
  title2: {
    color: '#fff',
    textAlign: 'left',
    marginStart: 40,
    lineHeight: 40,
    fontSize: 40,
  } 
})
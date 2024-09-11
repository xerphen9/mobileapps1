import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './store';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { BannerComponent } from '@/components/BannerComponent';
import { ThemedText } from '@/components/ThemedText';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Quicksand': require('../assets/fonts/Quicksand.ttf'),
  });

  const header = 
    <BannerComponent>
      <ThemedText style={styles.subtitle}>
        Hi David,
      </ThemedText>
      <ThemedText style={styles.title1}>
        Let's Pay
      </ThemedText>
      <ThemedText style={styles.title2}>
        your Bills
      </ThemedText>
    </BannerComponent>

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
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{
              headerShown: true,
              statusBarTranslucent: true,
              navigationBarHidden: true,
              header: () => header
            }}/>
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: ''
  },
  subtitle: {
    color: '#fff',
    textAlign: 'left',
    marginStart: 10,
    fontSize: 25,
  },
  title1: {
    color: '#fff',
    textAlign: 'left',
    lineHeight: 50,
    marginStart: 20,
    fontSize: 40,
  },
  title2: {
    color: '#fff',
    textAlign: 'left',
    marginStart: 40,
    lineHeight: 50,
    fontSize: 45,
  } 
})
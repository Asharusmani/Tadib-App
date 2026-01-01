import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ✅ Import AuthProvider
import { AuthProvider } from '../context/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ✅ Wrap everything with AuthProvider */}
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="index">
            {/* ✅ Add index screen for auth check */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="notification" options={{ headerShown: false }} />
            <Stack.Screen name="focus" options={{ headerShown: false }} />
            <Stack.Screen name="analytics" options={{ headerShown: false }} />
            <Stack.Screen name="forgot" options={{ headerShown: false }} />
            <Stack.Screen name="editprofile" options={{ headerShown: false }} />
            <Stack.Screen name="groups" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BlinkProvider, createTamagui, tamaguiDefaultConfig, Theme, BlinkToastProvider } from '@blinkdotnew/mobile-ui';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const config = createTamagui({ ...tamaguiDefaultConfig });

function WebStyleReset() {
  if (Platform.OS !== 'web') return null;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          input:focus,textarea:focus{outline:none!important}
          *::-webkit-scrollbar{width:6px;height:6px}
          *::-webkit-scrollbar-track{background:transparent}
          *::-webkit-scrollbar-thumb{background:#1B4332;border-radius:99px;opacity:0.7}
          *::-webkit-scrollbar-thumb:hover{background:#2D6A4F}
          *{scrollbar-width:thin;scrollbar-color:#1B4332 transparent}
        `,
      }}
    />
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <BlinkProvider config={config} defaultTheme="light">
      <Theme name="light">
        <QueryClientProvider client={queryClient}>
          <BlinkToastProvider>
            <WebStyleReset />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" />
          </BlinkToastProvider>
        </QueryClientProvider>
      </Theme>
    </BlinkProvider>
  );
}

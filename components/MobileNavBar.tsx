import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MobileNavBar() {
  // Only render on mobile web (not desktop/tablet)
  // The parent page handles the isDesktop/isTablet check — this component
  // receives no props and always renders when called.

  return (
    <>
      {/* Spacer to prevent content from going under the fixed nav */}
      {Platform.OS === 'web' && <View style={styles.navSpacer} />}
      <View style={styles.navbar}>
        <SafeAreaView edges={['top']} style={styles.safeInner}>
          <Text style={styles.navLogo}>Mindful Horizons</Text>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navSpacer: {
    height: 56,
  },
  navbar: {
    backgroundColor: '#FDFCF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 100,
    ...(Platform.OS === 'web'
      ? {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
        }
      : {}),
  },
  safeInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: '#1B4332',
    letterSpacing: -0.5,
  },
});

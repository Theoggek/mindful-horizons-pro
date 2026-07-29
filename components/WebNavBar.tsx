import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';

const NAV_LINKS = [
  { label: 'Home', href: '/(tabs)/' },
  { label: 'About', href: '/(tabs)/about' },
  { label: 'Coaching', href: '/(tabs)/coaching' },
  { label: '12 Rules', href: '/(tabs)/twelve-rules' },
  { label: 'Find Your Type', href: '/(tabs)/quiz' },
  { label: 'Contact', href: '/(tabs)/contact' },
];

export function WebNavBar() {
  const { isDesktop, isTablet } = useResponsive();
  const router = useRouter();
  const pathname = usePathname();

  // Only render on tablet/desktop web
  if (!isDesktop && !isTablet) return null;

  const isActive = (href: string) => {
    if (href === '/(tabs)/') return pathname === '/' || pathname === '/index' || pathname === '/(tabs)';
    return pathname.includes(href.replace('/(tabs)', ''));
  };

  return (
    <>
      {/* Spacer to prevent content from going under the fixed nav */}
      {Platform.OS === 'web' && <View style={styles.navSpacer} />}
      <View style={styles.navbar}>
        <View style={styles.inner}>
          {/* Logo */}
          <TouchableOpacity onPress={() => router.push('/(tabs)/' as any)} activeOpacity={0.8}>
            <Text style={styles.logo}>Mindful Horizons</Text>
          </TouchableOpacity>

          {/* Nav Links */}
          <View style={styles.links}>
            {NAV_LINKS.map((link) => (
              <TouchableOpacity
                key={link.href}
                onPress={() => router.push(link.href as any)}
                activeOpacity={0.75}
                style={styles.linkWrapper}
              >
                <Text style={[styles.link, isActive(link.href) && styles.linkActive]}>
                  {link.label}
                </Text>
                {isActive(link.href) && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}

            {/* CTA */}
            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={() => Linking.openURL('https://calendly.com/h-mengoli/30min')}
              activeOpacity={0.85}
            >
              <Text style={styles.ctaBtnText}>Book Free Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navSpacer: {
    height: 64,
  },
  navbar: {
    backgroundColor: '#FDFCF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    zIndex: 100,
    // Sticky positioning for web
    ...(Platform.OS === 'web'
      ? {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
        }
      : {}),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 0,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    height: 64,
  },
  logo: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: '#1B4332',
    letterSpacing: -0.5,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkWrapper: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'relative',
  },
  link: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: '#4B5563',
  },
  linkActive: {
    color: '#1B4332',
    fontWeight: '700' as const,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#1B4332',
    borderRadius: 1,
  },
  ctaBtn: {
    backgroundColor: '#1B4332',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontWeight: '700' as const,
    fontSize: 14,
  },
});

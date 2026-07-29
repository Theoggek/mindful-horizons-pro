import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Mail, Phone } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const isWeb = Platform.OS === 'web';
const maxW = 640;

export default function ContactScreen() {
  const { isDesktop, isTablet } = useResponsive();

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:h.mengoli@mindful-horizons.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:2624451273');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {isDesktop || isTablet ? (
        <WebNavBar />
      ) : (
        <MobileNavBar />
      )}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Let's Talk.</Text>
          <Text style={styles.subheadline}>
            Book your free 30-minute Mindful AI Relationship Audit. No commitment, no pressure — just a conversation about where you are and where you want to be.
          </Text>

          {/* Dominant CTA Button */}
          <TouchableOpacity style={styles.ctaButton} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaButtonText}>Book Your Free 30-Minute Session</Text>
            <ArrowRight size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Other ways to reach me */}
        <View style={styles.altSection}>
          <Text style={styles.altTitle}>Other ways to reach me</Text>

          <TouchableOpacity style={styles.altRow} onPress={handleEmail} activeOpacity={0.7}>
            <View style={styles.altIconCircle}>
              <Mail size={18} color="#1B4332" />
            </View>
            <View>
              <Text style={styles.altLabel}>Email</Text>
              <Text style={styles.altValue}>h.mengoli@mindful-horizons.com</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.altRow} onPress={handlePhone} activeOpacity={0.7}>
            <View style={[styles.altIconCircle, { backgroundColor: '#D1FAE5' }]}>
              <Phone size={18} color="#1B4332" />
            </View>
            <View>
              <Text style={styles.altLabel}>Phone</Text>
              <Text style={styles.altValue}>262-445-1273</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Mindful Horizons</Text>
          <Text style={styles.footerText}>© 2018–2026 All Rights Reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDFCF9' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: isWeb ? 60 : 40,
    paddingBottom: isWeb ? 56 : 36,
    alignItems: 'center',
  },
  headline: {
    fontSize: isWeb ? 52 : 38,
    fontWeight: '800' as const,
    color: '#1C1917',
    letterSpacing: -1,
    marginBottom: 16,
    textAlign: 'center',
    maxWidth: maxW,
  },
  subheadline: {
    fontSize: isWeb ? 18 : 16,
    color: '#4B5563',
    lineHeight: isWeb ? 28 : 26,
    textAlign: 'center',
    maxWidth: maxW,
    marginBottom: isWeb ? 40 : 32,
  },

  // Dominant CTA
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#0D9488',
    paddingVertical: isWeb ? 22 : 18,
    paddingHorizontal: isWeb ? 40 : 28,
    borderRadius: 16,
    maxWidth: maxW,
    width: '100%',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  ctaButtonText: {
    fontSize: isWeb ? 21 : 18,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 24,
    marginVertical: isWeb ? 8 : 4,
    maxWidth: maxW,
    alignSelf: 'center',
    width: undefined as any,
  },

  // Alt contact section
  altSection: {
    paddingHorizontal: 24,
    paddingVertical: isWeb ? 36 : 28,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  altTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#9CA3AF',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  altIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  altLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500' as const,
    marginBottom: 2,
  },
  altValue: {
    fontSize: 15,
    color: '#1C1917',
    fontWeight: '600' as const,
  },

  // Footer
  footer: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#1C1917',
    gap: 6,
    marginTop: isWeb ? 16 : 8,
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: '#D4A96A',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

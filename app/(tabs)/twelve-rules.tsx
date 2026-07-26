import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Quote } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const rules = [
  'You always have a choice.',
  'Your life is a gift. Treat it as an adventure.',
  'Experience something new every day.',
  'Learn something new every day.',
  'Fear is something you create.',
  'The line between where you are and where you want to be is a thought away.',
  'You create chaos to look busy, feel important, and avoid your emotions.',
  'Remember to thank your deity and to say thank you for everything that comes your way.',
  'Truth only exists in the moment.',
  'Leadership is given, never taken.',
  'Throw something out every day until all that exists is you and God.',
  "Let it go. It was never yours to begin with.",
];

export default function TwelveRulesScreen() {
  const { isDesktop, isTablet } = useResponsive();

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >
        {isDesktop || isTablet ? (
          <WebNavBar />
        ) : (
          <MobileNavBar />
        )}

        {/* Page Header */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pageHeader}
        >
          <View style={styles.headerInner}>
            <Text style={styles.pageEyebrow}>PERSONAL PHILOSOPHY</Text>
            <Text style={styles.pageTitle}>The Twelve Rules</Text>
            <Text style={styles.pageSubtitle}>
              In 2002, I wrote twelve rules for life. Not to publish — because I needed them.
            </Text>
          </View>
        </LinearGradient>

        {/* Rules List */}
        <View style={styles.rulesSection}>
          <View style={styles.rulesList}>
            {rules.map((rule, i) => (
              <View key={i} style={styles.ruleRow}>
                <View style={styles.ruleNumberCircle}>
                  <Text style={styles.ruleNumber}>{i + 1}</Text>
                </View>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>

          {/* Closing Quote */}
          <View style={styles.closingCard}>
            <View style={styles.closingQuoteIcon}>
              <Quote size={20} color="#D4A96A" />
            </View>
            <Text style={styles.closingText}>
              I didn't invent all of these rules. I watched the men in my life live them.
            </Text>
            <Text style={styles.closingAuthor}>— Henry Mengoli</Text>
          </View>
        </View>

        {/* CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to write your own rules?</Text>
          <Text style={styles.ctaBody}>
            Let's start a conversation about where you are, where you want to be, and how to get there.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Book Your Free Session</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Mindful Horizons</Text>
          <Text style={styles.footerText}>© 2018–2026 All Rights Reserved</Text>
          <Text style={styles.footerText}>h.mengoli@outlook.com · 262-445-1273</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const isWeb = Platform.OS === 'web';
const maxW = 800;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDFCF9' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Navbar (mobile)
  navbar: {
    backgroundColor: '#FDFCF9',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.5,
  },

  // Page Header
  pageHeader: {
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  headerInner: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  pageEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: isWeb ? 44 : 30,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 52 : 38,
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 600,
  },

  // Rules Section
  rulesSection: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  rulesList: {
    gap: 0,
    marginBottom: 48,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 16,
  },
  ruleNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  ruleNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ruleText: {
    flex: 1,
    fontSize: 17,
    color: '#1C1917',
    lineHeight: 28,
    fontWeight: '500',
  },

  // Closing Quote Card
  closingCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignItems: 'center',
  },
  closingQuoteIcon: {
    marginBottom: 16,
  },
  closingText: {
    fontSize: 18,
    color: '#1C1917',
    lineHeight: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  closingAuthor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B4332',
  },

  // CTA
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isWeb ? 34 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 42 : 34,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  ctaBody: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 480,
  },
  ctaBtn: {
    backgroundColor: '#D4A96A',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  ctaBtnText: {
    color: '#1B4332',
    fontWeight: '700',
    fontSize: 16,
  },

  // Footer
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#1C1917',
    gap: 6,
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D4A96A',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

const businessCoaching = {
  eyebrow: 'FOR ORGANIZATIONS',
  title: 'Business Coaching',
  emoji: '🏢',
  color: '#F0FDF4',
  border: '#A7F3D0',
  description:
    'Whether you\'re launching a new venture, scaling a growing team, or steering a turnaround, I bring 30+ years of senior management experience to help you lead with clarity and confidence.',
  items: [
    'Business startup guidance',
    'Growth management strategies',
    'Business turnarounds',
    'Leadership development',
    'Team dynamics & culture',
    'Strategic planning',
  ],
  ctaLabel: 'Book a Business Consultation',
};

const businessTestimonial = {
  quote: "I found the confidence to pursue my dream of owning my own business. Henry's guidance was transformational.",
  author: 'James T., Business Owner',
};

export default function BusinessCoachingScreen() {
  const { isDesktop, isTablet } = useResponsive();

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
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

        {/* Page Header */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pageHeader}
        >
          <View style={styles.headerInner}>
            <Text style={styles.pageEyebrow}>{businessCoaching.eyebrow}</Text>
            <Text style={styles.pageTitle}>{businessCoaching.title}</Text>
            <Text style={styles.pageSubtitle}>{businessCoaching.description}</Text>
          </View>
        </LinearGradient>

        {/* Business Coaching content */}
        <View style={styles.serviceSection}>
          <View
            style={[
              styles.serviceSectionCard,
              { backgroundColor: businessCoaching.color, borderColor: businessCoaching.border },
            ]}
          >
            <Text style={styles.serviceEmoji}>{businessCoaching.emoji}</Text>
            <Text style={styles.serviceSectionTitle}>What we'll work on together.</Text>
            {businessCoaching.items.map((item, j) => (
              <View key={j} style={styles.serviceItem}>
                <View style={styles.serviceDot} />
                <Text style={styles.serviceItemText}>{item}</Text>
              </View>
            ))}
            <View style={styles.testimonialQuote}>
              <Text style={styles.testimonialQuoteText}>&ldquo;{businessTestimonial.quote}&rdquo;</Text>
              <Text style={styles.testimonialQuoteAuthor}>— {businessTestimonial.author}</Text>
            </View>
            <TouchableOpacity style={styles.serviceSectionCtaBtn} onPress={handleBook} activeOpacity={0.85}>
              <Text style={styles.serviceSectionCtaBtnText}>{businessCoaching.ctaLabel}</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to take your business{'\n'}to the next level?</Text>
          <Text style={styles.ctaBody}>
            Get in touch today and receive a complimentary session.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Book Free Session</Text>
            <ArrowRight size={18} color="#1B4332" />
          </TouchableOpacity>
        </LinearGradient>

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

  pageHeader: { paddingVertical: 48, paddingHorizontal: 24 },
  headerInner: { maxWidth: maxW, alignSelf: 'center', width: '100%' },
  pageEyebrow: { fontSize: 11, fontWeight: '700', color: '#D4A96A', letterSpacing: 2, marginBottom: 10 },
  pageTitle: {
    fontSize: isWeb ? 44 : 32, fontWeight: '800', color: '#FFFFFF',
    letterSpacing: -0.5, marginBottom: 12,
  },
  pageSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 26 },

  // Business Coaching section
  serviceSection: {
    paddingHorizontal: 24, paddingVertical: 40,
  },
  serviceSectionCard: {
    maxWidth: maxW, alignSelf: 'center', width: '100%',
    borderRadius: 16, padding: 28, borderWidth: 1,
  },
  serviceEmoji: { fontSize: 32, marginBottom: 12 },
  serviceSectionTitle: { fontSize: isWeb ? 26 : 22, fontWeight: '800', color: '#1C1917', marginBottom: 18 },
  serviceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  serviceDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#1B4332',
    marginTop: 8, flexShrink: 0,
  },
  serviceItemText: { fontSize: 14, color: '#4B5563', lineHeight: 22, flex: 1 },
  testimonialQuote: {
    borderLeftWidth: 3,
    borderLeftColor: '#D4A96A',
    paddingLeft: 16,
    marginTop: 20,
  },
  testimonialQuoteText: {
    fontSize: 15, color: '#4B5563', lineHeight: 24,
    fontStyle: 'italic', marginBottom: 8,
  },
  testimonialQuoteAuthor: { fontSize: 13, color: '#9CA3AF', fontWeight: '600' },
  serviceSectionCtaBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 8,
    backgroundColor: '#1B4332', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 12, marginTop: 24,
  },
  serviceSectionCtaBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  // CTA
  ctaSection: { paddingHorizontal: 24, paddingVertical: 52, alignItems: 'center' },
  ctaTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', lineHeight: isWeb ? 44 : 34, marginBottom: 14, letterSpacing: -0.5,
  },
  ctaBody: {
    fontSize: 16, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', marginBottom: 28, lineHeight: 26,
  },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#D4A96A', paddingHorizontal: 32,
    paddingVertical: 16, borderRadius: 12,
  },
  ctaBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 16 },

  footer: {
    paddingVertical: 28, paddingHorizontal: 24,
    alignItems: 'center', backgroundColor: '#1C1917', gap: 6,
  },
  footerLogo: { fontSize: 16, fontWeight: '800', color: '#D4A96A', marginBottom: 4 },
  footerText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});

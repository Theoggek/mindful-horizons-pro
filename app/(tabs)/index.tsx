import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, ArrowRight, ChevronRight, Star, Quote } from '@blinkdotnew/mobile-ui';
import { useRouter } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';

const { width } = Dimensions.get('window');
const maxW = 800;

const VIDEO_ID = '5VXBjs2hrSg';

const painPoints = [
  'Feeling stuck or lost despite outward success?',
  'Struggling with ADHD, a disability or health challenge affecting your work?',
  'Tried therapy but felt it wasn\'t enough?',
  'Running a business but losing the personal side of life?',
  'Ready for real change but unsure where to start?',
];

const stats = [
  { value: '24+', label: 'Years Experience' },
  { value: '100+', label: 'Lives Changed' },
  { value: '100%', label: 'Committed to You' },
];

const testimonials = [
  {
    quote: 'You helped me change my life by giving me the tools to overcome my fear of public speaking and finally pursue my dream career.',
    author: 'Sarah M.',
    role: 'Marketing Executive',
  },
  {
    quote: 'I found the confidence to pursue my dream of owning my own business. Henry\'s guidance was transformational.',
    author: 'James T.',
    role: 'Entrepreneur',
  },
  {
    quote: 'Henry believed in me from day one. His coaching style is honest, supportive, and results-driven.',
    author: 'Lisa R.',
    role: 'Career Transition Client',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDesktop, isTablet, isWeb } = useResponsive();

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Web NavBar (desktop/tablet) or simple mobile logo bar */}
        {isDesktop || isTablet ? (
          <WebNavBar />
        ) : (
          <View style={styles.navbar}>
            <Text style={styles.navLogo}>Mindful Horizons</Text>
          </View>
        )}

        {/* Hero Section */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F', '#40916C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroInner}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Professional Coaching · 24+ Years</Text>
            </View>
            <Text style={styles.heroTitle}>
              Are you stuck despite everything you've achieved?
            </Text>
            <Text style={styles.heroSubtitle}>
              You've worked hard. Built something real. But something feels off — in your business, your health, your life.
            </Text>
            <Text style={styles.heroTagline}>
              I help mid-career professionals and small business owners break through what's holding them back.
            </Text>

            {/* Video Player */}
            <View style={styles.videoWrapper}>
              {Platform.OS === 'web' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=0&rel=0&modestbranding=1`}
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: 12 } as any}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <TouchableOpacity
                  style={styles.videoNativeFallback}
                  onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${VIDEO_ID}`)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.videoPlayIcon}>{'▶'}</Text>
                  <Text style={styles.videoFallbackText}>Watch Introduction Video</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          {stats.map((s, i) => (
            <View key={i} style={[styles.statItem, i < stats.length - 1 && styles.statBorder]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Pain Points Section */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>DO ANY OF THESE SOUND FAMILIAR?</Text>
          <Text style={styles.sectionTitle}>You're not alone.</Text>
          <Text style={styles.sectionBody}>
            Many high-achievers reach a point where outward success no longer feels fulfilling. If you answered yes to any of the following, I can help.
          </Text>
          <View style={styles.painList}>
            {painPoints.map((p, i) => (
              <View key={i} style={styles.painItem}>
                <View style={styles.checkCircle}>
                  <Check size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.painText}>{p}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Get Your Free Consultation</Text>
            <ChevronRight size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* What I Offer */}
        <View style={styles.offerSection}>
          <Text style={styles.sectionEyebrow}>MY APPROACH</Text>
          <Text style={styles.sectionTitleLight}>Real change. Real results.</Text>
          <Text style={styles.sectionBodyLight}>
            Lasting change doesn't come from following someone else's rules. It comes from finding your own. After 24 years, I've developed proven techniques that create genuine transformation.
          </Text>
          <View style={styles.offerGrid}>
            <View style={styles.offerCard}>
              <Text style={styles.offerEmoji}>🎯</Text>
              <Text style={styles.offerCardTitle}>Career Transitions</Text>
              <Text style={styles.offerCardText}>Navigate pivotal career shifts with clarity and confidence.</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerEmoji}>💼</Text>
              <Text style={styles.offerCardTitle}>Business Growth</Text>
              <Text style={styles.offerCardText}>Scale your business while preserving what matters most.</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerEmoji}>🌱</Text>
              <Text style={styles.offerCardTitle}>Personal Growth</Text>
              <Text style={styles.offerCardText}>Rediscover purpose, joy, and your authentic self.</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerEmoji}>♿</Text>
              <Text style={styles.offerCardTitle}>Self-Advocacy</Text>
              <Text style={styles.offerCardText}>Navigate ADHD and disability challenges in the workplace.</Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>CLIENT STORIES</Text>
          <Text style={styles.sectionTitle}>Highly rated & recommended</Text>
          {testimonials.map((t, i) => (
            <View key={i} style={styles.testimonialCard}>
              <View style={styles.testimonialQuoteIcon}>
                <Quote size={16} color="#D4A96A" />
              </View>
              <Text style={styles.testimonialText}>{t.quote}</Text>
              <View style={styles.testimonialStars}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={14} color="#D4A96A" fill="#D4A96A" />
                ))}
              </View>
              <Text style={styles.testimonialAuthor}>{t.author}</Text>
              <Text style={styles.testimonialRole}>{t.role}</Text>
            </View>
          ))}
        </View>

        {/* Final CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.finalCta}
        >
          <Text style={styles.finalCtaTitle}>Ready to create a life{'\n'}with more purpose and joy?</Text>
          <Text style={styles.finalCtaBody}>Schedule a free consultation today and take the first step toward the life you deserve.</Text>
          <TouchableOpacity style={styles.finalCtaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.finalCtaBtnText}>Book Your Free Session</Text>
            <ArrowRight size={18} color="#1B4332" />
          </TouchableOpacity>
          <Text style={styles.finalCtaNote}>No commitment required · 30 minutes · 100% confidential</Text>
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDFCF9' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Navbar
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

  // Hero
  hero: {
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  heroInner: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  heroTitle: {
    fontSize: isWeb ? 44 : 30,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 52 : 38,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
    marginBottom: 12,
  },
  heroTagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 24,
    marginBottom: 24,
    fontStyle: 'italic',
  },

  // Video
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoNativeFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D1F18',
    gap: 10,
  },
  videoPlayIcon: {
    fontSize: 36,
    color: '#D4A96A',
  },
  videoFallbackText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: isWeb ? 36 : 28,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: isWeb ? 44 : 36,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  sectionBody: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
    marginBottom: 28,
  },

  // Pain Points
  painList: { gap: 14, marginBottom: 32 },
  painItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  painText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },

  // CTA Button
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1B4332',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  ctaBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },

  // Offer Section
  offerSection: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: '#F0FDF4',
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
  },
  sectionTitleLight: {
    fontSize: isWeb ? 36 : 28,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: isWeb ? 44 : 36,
    marginBottom: 14,
    letterSpacing: -0.5,
    maxWidth: maxW,
    alignSelf: 'center',
  },
  sectionBodyLight: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
    marginBottom: 28,
    maxWidth: maxW,
    alignSelf: 'center',
  },
  offerGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: isWeb ? 'wrap' : undefined,
    gap: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: isWeb ? '47%' : '100%',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  offerEmoji: { fontSize: 28, marginBottom: 10 },
  offerCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 8,
  },
  offerCardText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },

  // Testimonials
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testimonialQuoteIcon: {
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  testimonialStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1917',
  },
  testimonialRole: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },

  // Final CTA
  finalCta: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    alignItems: 'center',
  },
  finalCtaTitle: {
    fontSize: isWeb ? 38 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 48 : 36,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  finalCtaBody: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 480,
  },
  finalCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D4A96A',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  finalCtaBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 16 },
  finalCtaNote: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
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

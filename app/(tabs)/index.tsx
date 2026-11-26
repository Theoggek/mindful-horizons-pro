//import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Dimensions } from 'react-native';

import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Dimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, ArrowRight, ChevronRight, Star, Quote } from '@blinkdotnew/mobile-ui';
import { useRouter } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { trackEvent } from '@/utils/analytics';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';
import { TwelveRulesModal } from '@/components/TwelveRulesModal';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

//const VIDEO_ID = '5VXBjs2hrSg';

const painPoints = [
  "You tried AI and got answers that could have been written for anyone",
  "You're watching competitors use AI and feeling left behind",
  "You built something with AI and it broke, and you don't know why",
  "You know AI should be helping your business but you don't know where to start",
  "You're ready to stop guessing and start building something real",
];

const stats = [
  { value: '30 Years', label: 'Business Experience' },
  { value: '100,000+', label: 'Words in Active AI Partnership' },
];

const testimonials = [
  {
    quote: "I've been using AI for months and kept getting the same generic responses. In one session with Henry, I finally understood what I was missing. The output started sounding like my business, not like everyone else's. This is well beyond what I thought it could do.",
    author: 'Commercial Racking Consultant',
    role: '10 years industry experience',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDesktop, isTablet, isWeb, isMobile, windowWidth } = useResponsive();
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  const handleBook = () => {
    trackEvent('book_call_click', { location: 'home' });
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Web NavBar (desktop/tablet) or sticky mobile nav */}
        {isDesktop || isTablet ? (
          <WebNavBar />
        ) : (
          <MobileNavBar />
        )}
      <ScrollView style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >

        {/* 12 Rules Modal Trigger — floats just below the nav bar */}
        <View style={styles.rulesTriggerSection}>
          <TouchableOpacity
            style={styles.rulesTriggerBtn}
            onPress={() => setRulesModalOpen(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.rulesTriggerBtnText}>Henry's 12 Rules for Life</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F', '#40916C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroInner}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>30 years of business experience</Text>
            </View>
            <Text style={styles.heroTitle}>
              You've built something real. Now let's make AI work for it.
            </Text>
            <Text style={styles.heroSubtitle}>
              Most experienced business owners who've tried AI and walked away didn't fail because they weren't smart enough. They failed because nobody showed them the right relationship to have with it. That's what I do.
            </Text>
            <Text style={styles.heroTagline}>
              I teach experienced business owners how to be the senior partner in the most powerful business relationship available to them right now.
            </Text>

            {/* Do any of these sound familiar? */}
            <View style={styles.familiarBlock}>
              <Text style={styles.familiarEyebrow}>DO ANY OF THESE SOUND FAMILIAR?</Text>
              <Text style={styles.familiarTitle}>You're not alone.</Text>
              <Text style={styles.familiarBody}>
                Most experienced business owners have tried AI at least once. Many walked away frustrated. If any of these sound like you, I can help.
              </Text>
              <View style={styles.familiarList}>
                {painPoints.map((p, i) => (
                  <View key={i} style={styles.familiarItem}>
                    <View style={styles.familiarCheck}>
                      <Check size={14} color="#1B4332" />
                    </View>
                    <Text style={styles.familiarText}>{p}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Main booking CTA */}
            <TouchableOpacity
              style={[styles.quizCta, isMobile && { paddingHorizontal: 16, gap: 8 }]}
              onPress={handleBook}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.quizCtaText, isMobile && { fontSize: windowWidth < 350 ? 13 : 15, letterSpacing: -0.2 }]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Book Your Free 30-Minute Call
              </Text>
              <ArrowRight size={isMobile ? 18 : 22} color="#1B4332" />
            </TouchableOpacity>
            <Text style={styles.heroNote}>
              We start with your business. AI comes second. No commitment, and 100% confidential.
            </Text>

            {/* Video Player — temporarily hidden until personal video is recorded */}
            {/* <View style={styles.videoWrapper}>
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
            </View> */}

            {/* Featured Testimonial — placeholder until personal video is ready */}
            <View style={styles.heroTestimonial}>
              <View style={styles.heroTestimonialQuoteRow}>
                <Quote size={18} color="#D4A96A" />
              </View>
              <Text style={styles.heroTestimonialText}>
                {testimonials[0].quote}
              </Text>
              <View style={styles.heroTestimonialStars}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={13} color="#D4A96A" fill="#D4A96A" />
                ))}
              </View>
              <Text style={styles.heroTestimonialAuthor}>{testimonials[0].author}</Text>
              <Text style={styles.heroTestimonialRole}>{testimonials[0].role}</Text>
            </View>

            {/* Two quiet links */}
            <View style={styles.quietLinks}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/ai-partnership' as any)} activeOpacity={0.7}>
                <Text style={styles.quietLinkText}>See how AI partnership works →</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(tabs)/quiz' as any)} activeOpacity={0.7}>
                <Text style={styles.quietLinkText}>Not sure where you stand? Take the free quiz →</Text>
              </TouchableOpacity>
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Mindful Horizons</Text>
          <Text style={styles.footerText}>© 2018–2026 All Rights Reserved</Text>
          <Text style={styles.footerText}>contact@mindful-horizons.com · 262-445-1273</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    <TwelveRulesModal visible={rulesModalOpen} onClose={() => setRulesModalOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  familiarBlock: { marginTop: 28, marginBottom: 8 },
  familiarEyebrow: { fontSize: 11, fontWeight: '700', color: '#D4A96A', letterSpacing: 2, marginBottom: 8 },
  familiarTitle: { fontSize: isWeb ? 28 : 24, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5, marginBottom: 10 },
  familiarBody: { fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 24, marginBottom: 16 },
  familiarList: { gap: 12, marginBottom: 20 },
  familiarItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  familiarCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#D4A96A', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  familiarText: { fontSize: 15, color: '#FFFFFF', lineHeight: 24, flex: 1 },
  heroNote: { color: 'rgba(255,255,255,0.85)', fontSize: 14, textAlign: 'center', marginTop: 12, marginBottom: 8, lineHeight: 20 },
  quietLinks: { alignItems: 'center', gap: 14, marginTop: 24 },
  quietLinkText: { color: '#D4E9DC', fontSize: 15, textDecorationLine: 'underline', textAlign: 'center' },
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

  // Quiz CTA — large, teal, visually dominant
  quizCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#D4A96A',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#D4A96A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  quizCtaText: {
    fontSize: isWeb ? 20 : 17,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.3,
  },

  // Video (kept for when personal video is recorded)
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

  // Hero Testimonial
  heroTestimonial: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroTestimonialQuoteRow: {
    marginBottom: 12,
  },
  heroTestimonialText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  heroTestimonialStars: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 10,
  },
  heroTestimonialAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroTestimonialRole: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
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

  // 12 Rules modal trigger — floats just below the nav bar, overlapping the hero
  rulesTriggerSection: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: -22,
    zIndex: 10,
    position: 'relative',
  },
  rulesTriggerBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
  },
  rulesTriggerBtnText: {
    color: '#1B4332',
    fontWeight: '700',
    fontSize: 13,
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
  offerSectionHeader: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
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

  // AI Partnership Session Block
  aiSessionCard: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    gap: 0,
  },
  aiSessionHeadline: {
    fontSize: isWeb ? 22 : 19,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 30 : 26,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  aiSessionBody: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
    marginBottom: 14,
  },
  aiSessionMeta: {
    marginTop: 4,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
  },
  aiSessionMetaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 0.2,
  },
  aiSessionBullets: {
    gap: 10,
    marginBottom: 24,
  },
  aiSessionBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  aiSessionBulletDot: {
    fontSize: 16,
    color: '#D4A96A',
    fontWeight: '700',
    lineHeight: 26,
    flexShrink: 0,
  },
  aiSessionBulletText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
    flex: 1,
  },
  aiSessionBtn: {
    backgroundColor: '#D4A96A',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  aiSessionBtnText: {
    color: '#1B4332',
    fontWeight: '700',
    fontSize: 16,
  },

  // AI User Types Section
  typesSection: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  typesHeader: {
    marginBottom: 28,
  },
  typesTitle: {
    fontSize: isWeb ? 36 : 28,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: isWeb ? 44 : 36,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  typesBody: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
  },
  typesGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: isWeb ? 'wrap' : undefined,
    gap: 14,
    marginBottom: 32,
  },
  typeCard: {
    width: isWeb ? '48%' : '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  typeCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  typeEmoji: {
    fontSize: 28,
  },
  typeLabel: {
    flex: 1,
  },
  typeNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  typeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1917',
  },
  typeDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  typeCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1B4332',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  typeCtaBtnText: {
    color: '#FFFFFF',
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




























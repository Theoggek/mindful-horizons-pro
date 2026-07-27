import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ChevronDown, ChevronUp, Quote, Star } from '@blinkdotnew/mobile-ui';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

// REMOVED — The Twelve Rules now live on their own dedicated page at /twelve-rules

const approachPillars = [
  {
    title: 'I Listen',
    emoji: '👂',
    body: 'Every session starts with listening — not to respond, but to understand. Your story, your context, your goals. No two people are the same, so no two coaching plans should be either.',
  },
  {
    title: 'I Challenge',
    emoji: '💪',
    body: 'Growth happens at the edge of comfort. I\'ll ask the questions no one else will. I\'ll hold up the mirror when it\'s easier to look away. But I\'ll never push you somewhere you\'re not ready to go.',
  },
  {
    title: 'I Champion',
    emoji: '🏆',
    body: 'No one will believe in you more than I do. I\'ve spent 24 years being the person in the corner who refuses to give up on someone — even when they\'ve given up on themselves.',
  },
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

const services = [
  {
    title: 'Individual Coaching',
    emoji: '👤',
    color: '#EFF6FF',
    border: '#BFDBFE',
    items: [
      'Career transitions & growth',
      'Overcoming personal obstacles',
      'Work-life balance restoration',
      'Self-advocacy & confidence building',
      'ADHD & disability navigation',
      'Finding purpose and joy',
    ],
  },
  {
    title: 'Business Coaching',
    emoji: '🏢',
    color: '#F0FDF4',
    border: '#A7F3D0',
    items: [
      'Business startup guidance',
      'Growth management strategies',
      'Business turnarounds',
      'Leadership development',
      'Team dynamics & culture',
      'Strategic planning',
    ],
  },
];

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'I coach business owners and individuals. For business owners: coaching in growth management, turnarounds, and business startups. For individuals: working through career transitions, career growth, and those seeking greater peace and happiness in their lives.',
  },
  {
    q: 'How much do the services cost?',
    a: 'Coaching is available per session or in monthly packages with a discount for 1 or 3 month commitments. Pricing is discussed during your free 30-minute consultation — no pressure, just a conversation.',
  },
  {
    q: 'What industries do you serve?',
    a: 'I work with individuals from all backgrounds and industries. As I have a technical background, I especially understand the demands of technical professions.',
  },
  {
    q: 'What is your experience level?',
    a: "I've been coaching for 24 years. My background is in building successful companies and working at several different companies in senior management and project management positions. I've been helping individuals all my life. I am your champion — no one will believe in you more.",
  },
  {
    q: 'How do I get started?',
    a: 'Simply book a free 30-minute consultation through Calendly. We\'ll discuss your goals, challenges, and how coaching can help. There\'s no commitment required.',
  },
];

function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.faqItem, open && styles.faqItemOpen]}
      onPress={() => setOpen(!open)}
      activeOpacity={0.8}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQ}>{item.q}</Text>
        {open ? <ChevronUp size={18} color="#1B4332" /> : <ChevronDown size={18} color="#9CA3AF" />}
      </View>
      {open && <Text style={styles.faqA}>{item.a}</Text>}
    </TouchableOpacity>
  );
}

export default function CoachingScreen() {
  const { isDesktop, isTablet, isWeb } = useResponsive();
  const router = useRouter();

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
            <Text style={styles.pageEyebrow}>COACHING SERVICES</Text>
            <Text style={styles.pageTitle}>My Approach</Text>
            <Text style={styles.pageSubtitle}>
              After 24 years of coaching I've learned one thing above everything else — lasting change doesn't come from following someone else's rules. It comes from finding your own!
            </Text>
          </View>
        </LinearGradient>

        {/* Twelve Rules redirect notice */}
        <View style={styles.rulesNotice}>
          <Text style={styles.rulesNoticeText}>
            Looking for Henry's Twelve Rules for Life?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/twelve-rules' as any)} activeOpacity={0.7}>
            <Text style={styles.rulesNoticeLink}>Find them here.</Text>
          </TouchableOpacity>
        </View>

        {/* My Approach */}
        <View style={styles.approachSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>MY APPROACH</Text>
            <Text style={styles.approachTitle}>I don't follow a script. I follow you.</Text>
            <Text style={styles.approachBody}>
              After 24 years of coaching, I've learned that the best results come from one thing: meeting people where they are. Not where I think they should be. Not where a textbook says they ought to be. Where they actually are — right now, in this moment.
            </Text>
            <Text style={styles.approachBody}>
              Every client I work with gets a unique partnership built on three principles that have never let me down.
            </Text>
          </View>
          <View style={styles.approachGrid}>
            {approachPillars.map((p, i) => (
              <View key={i} style={styles.approachCard}>
                <Text style={styles.approachEmoji}>{p.emoji}</Text>
                <Text style={styles.approachCardTitle}>{p.title}</Text>
                <Text style={styles.approachCardBody}>{p.body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.testimonialsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>CLIENT STORIES</Text>
            <Text style={styles.testimonialsTitle}>What clients say about working with me</Text>
          </View>
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

        {/* Services */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>WHAT I OFFER</Text>
            <Text style={styles.sectionTitle3}>Services designed for real change.</Text>
          </View>
          <View style={styles.serviceGrid}>
            {services.map((svc, i) => (
              <View key={i} style={[styles.serviceCard, { backgroundColor: svc.color, borderColor: svc.border }]}>
                <Text style={styles.serviceEmoji}>{svc.emoji}</Text>
                <Text style={styles.serviceTitle}>{svc.title}</Text>
                {svc.items.map((item, j) => (
                  <View key={j} style={styles.serviceItem}>
                    <View style={styles.serviceDot} />
                    <Text style={styles.serviceItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>INVESTMENT</Text>
            <Text style={styles.sectionTitle4}>Flexible pricing for every journey.</Text>
          </View>
          <View style={styles.pricingCards}>
            <View style={styles.pricingCard}>
              <Text style={styles.pricingEmoji}>💬</Text>
              <Text style={styles.pricingTitle}>Per Session</Text>
              <Text style={styles.pricingDesc}>Flexible, pay-as-you-go coaching sessions. Perfect for exploring if coaching is right for you.</Text>
            </View>
            <View style={[styles.pricingCard, styles.pricingCardFeatured]}>
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
              <Text style={styles.pricingEmoji}>📦</Text>
              <Text style={[styles.pricingTitle, { color: '#FFFFFF' }]}>Monthly Package</Text>
              <Text style={[styles.pricingDesc, { color: 'rgba(255,255,255,0.8)' }]}>
                1 or 3 month commitments with discounted rates. Maximum value and consistent progress.
              </Text>
            </View>
          </View>
          <Text style={styles.pricingNote}>
            Pricing discussed during your free 30-minute consultation. No commitment required.
          </Text>
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionEyebrow}>COMMON QUESTIONS</Text>
          <Text style={styles.sectionTitle5}>Frequently asked questions</Text>
          {faqs.map((f, i) => <FaqItem key={i} item={f} />)}
        </View>

        {/* CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to take your business{'\n'}to the next level?</Text>
          <Text style={styles.ctaBody}>
            Get in touch today and receive a complimentary consultation.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Request a Consultation</Text>
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
  pageSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 26, fontStyle: 'italic' },

  // Rules redirect notice
  rulesNotice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#F0FDF4',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
    flexWrap: 'wrap',
  },
  rulesNoticeText: { fontSize: 14, color: '#374151', textAlign: 'center' },
  rulesNoticeLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B4332',
    textDecorationLine: 'underline' as const,
  },

  sectionHeader: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  sectionEyebrow: {
    fontSize: 11, fontWeight: '700', color: '#D4A96A',
    letterSpacing: 2, marginBottom: 10,
  },

  // Approach
  approachSection: {
    paddingHorizontal: 24, paddingVertical: 40,
  },
  approachTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 16,
    maxWidth: maxW, alignSelf: 'center',
  },
  approachBody: {
    fontSize: 15, color: '#4B5563', lineHeight: 26, marginBottom: 12,
    maxWidth: maxW, alignSelf: 'center',
  },
  approachGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
    marginTop: 12,
  },
  approachCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  approachEmoji: { fontSize: 28, marginBottom: 12 },
  approachCardTitle: { fontSize: 17, fontWeight: '700', color: '#1B4332', marginBottom: 8 },
  approachCardBody: { fontSize: 14, color: '#6B7280', lineHeight: 22 },

  // Testimonials
  testimonialsSection: {
    paddingHorizontal: 24, paddingVertical: 40,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  testimonialsTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 24,
    maxWidth: maxW, alignSelf: 'center',
  },
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testimonialQuoteIcon: { marginBottom: 12 },
  testimonialText: {
    fontSize: 15, color: '#374151', lineHeight: 24,
    fontStyle: 'italic', marginBottom: 14,
  },
  testimonialStars: { flexDirection: 'row', gap: 2, marginBottom: 10 },
  testimonialAuthor: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
  testimonialRole: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },

  // Services
  servicesSection: {
    paddingHorizontal: 24, paddingVertical: 40,
  },
  sectionTitle3: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 20,
    maxWidth: maxW, alignSelf: 'center',
  },
  serviceGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  serviceCard: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
  },
  serviceEmoji: { fontSize: 32, marginBottom: 12 },
  serviceTitle: { fontSize: 18, fontWeight: '700', color: '#1C1917', marginBottom: 16 },
  serviceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  serviceDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#1B4332',
    marginTop: 8, flexShrink: 0,
  },
  serviceItemText: { fontSize: 14, color: '#4B5563', lineHeight: 22, flex: 1 },

  // Pricing
  pricingSection: {
    paddingHorizontal: 24, paddingVertical: 40,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  sectionTitle4: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 20,
    maxWidth: maxW, alignSelf: 'center',
  },
  pricingCards: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 16,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pricingCardFeatured: {
    backgroundColor: '#1B4332',
    borderColor: '#1B4332',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#D4A96A',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 100,
    left: '50%',
    transform: [{ translateX: -60 }],
  },
  popularBadgeText: { fontSize: 10, fontWeight: '800', color: '#1B4332', letterSpacing: 1 },
  pricingEmoji: { fontSize: 28, marginBottom: 10, marginTop: 8 },
  pricingTitle: { fontSize: 18, fontWeight: '700', color: '#1C1917', marginBottom: 8 },
  pricingDesc: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
  pricingNote: {
    fontSize: 13, color: '#9CA3AF', textAlign: 'center',
    maxWidth: maxW, alignSelf: 'center',
  },

  // FAQ
  faqSection: {
    paddingHorizontal: 24, paddingVertical: 40,
    maxWidth: maxW, alignSelf: 'center', width: '100%',
  },
  sectionTitle5: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 20,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqItemOpen: {
    borderColor: '#1B4332',
    backgroundColor: '#F0FDF4',
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  faqQ: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1C1917', lineHeight: 22 },
  faqA: { fontSize: 14, color: '#4B5563', lineHeight: 24, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#D1FAE5' },

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

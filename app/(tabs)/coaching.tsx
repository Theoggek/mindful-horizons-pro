import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ChevronDown, ChevronUp } from '@blinkdotnew/mobile-ui';
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

const aiPartnershipTestimonials = [
  {
    quote: "I've been using AI for months and kept getting the same generic responses. In one session with Henry, I finally understood what I was missing. The output started sounding like my business — not like everyone else's. This is well beyond what I thought it could do.",
    author: 'Commercial Racking Consultant, 10 years industry experience',
  },
  {
    quote: "I'd tried AI and written it off. Henry showed me something different in about twenty minutes. When I read what came back I said: that actually sounds like us. I haven't looked at AI the same way since.",
    author: 'Ted, Co-founder, TheoStar Media',
  },
];

const businessTestimonial = {
  quote: "I found the confidence to pursue my dream of owning my own business. Henry's guidance was transformational.",
  author: 'James T., Business Owner',
};

const aiPartnershipCoaching = {
  eyebrow: 'THE FLAGSHIP PROGRAM',
  title: 'AI Partnership Coaching',
  emoji: '🤖',
  description:
    'My newest and most powerful offering — a hybrid model that pairs 30 years of human coaching wisdom with AI-powered tools that keep your momentum alive between sessions. You get the depth of real coaching plus daily reinforcement: reflection prompts, progress tracking, and on-demand support shaped around your actual goals.',
  items: [
    'AI-powered progress tracking between sessions',
    'Personalized reflection & journaling prompts',
    'On-demand support grounded in your coaching history',
    'Faster goal-setting and stronger accountability',
    'Human coaching + AI reinforcement, combined',
    'Available for individuals and business teams',
  ],
  ctaLabel: 'Book Your AI Partnership Session',
};

const businessCoaching = {
  eyebrow: 'FOR ORGANIZATIONS',
  title: 'Business Coaching',
  emoji: '🏢',
  color: '#F0FDF4',
  border: '#A7F3D0',
  description:
    'Whether you\'re launching a new venture, scaling a growing team, or steering a turnaround, I bring 24+ years of senior management experience to help you lead with clarity and confidence.',
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
    a: "I've been coaching for 30 years. My background is in building successful companies and working at several different companies in senior management and project management positions. I've been helping individuals all my life. I am your champion — no one will believe in you more.",
  },
  {
    q: 'How do I get started?',
    a: 'Simply book a free 30-minute session through Calendly. We\'ll discuss your goals, challenges, and how coaching can help. There\'s no commitment required.',
  },
];

function TestimonialQuote({ quote, author, variant = 'light' }: { quote: string; author: string; variant?: 'light' | 'dark' }) {
  return (
    <View style={styles.testimonialQuote}>
      <Text style={variant === 'dark' ? styles.testimonialQuoteTextDark : styles.testimonialQuoteText}>
        &ldquo;{quote}&rdquo;
      </Text>
      <Text style={variant === 'dark' ? styles.testimonialQuoteAuthorDark : styles.testimonialQuoteAuthor}>
        — {author}
      </Text>
    </View>
  );
}

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
  const { isDesktop, isTablet, isWeb, isMobile } = useResponsive();
  const router = useRouter();

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };

  // DO NOT REMOVE — mobile responsive fix, intentional change, do not revert
  // On mobile, three cards feel cramped — drop "I Challenge" and keep the outer two.
  const visiblePillars = isMobile
    ? approachPillars.filter((p) => p.title !== 'I Challenge')
    : approachPillars;

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
              After 30 years of coaching I've learned one thing above everything else — lasting change doesn't come from following someone else's rules. It comes from finding your own!
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
              After 30 years of coaching, I've learned that the best results come from one thing: meeting people where they are. Not where I think they should be. Not where a textbook says they ought to be. Where they actually are — right now, in this moment.
            </Text>
            <Text style={styles.approachBody}>
              Every client I work with gets a unique partnership built on three principles that have never let me down.
            </Text>
          </View>
          <View style={styles.approachGrid}>
            {visiblePillars.map((p, i) => (
              <View key={i} style={styles.approachCard}>
                <Text style={styles.approachEmoji}>{p.emoji}</Text>
                <Text style={styles.approachCardTitle}>{p.title}</Text>
                <Text style={styles.approachCardBody}>{p.body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Services intro */}
        <View style={styles.servicesIntro}>
          <Text style={styles.sectionEyebrow}>WHAT I OFFER</Text>
          <Text style={styles.sectionTitle3}>Services designed for real change.</Text>
        </View>

        {/* AI Partnership Coaching — flagship */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.flagshipSection}
        >
          <View style={styles.flagshipBadge}>
            <Text style={styles.flagshipBadgeText}>{aiPartnershipCoaching.eyebrow}</Text>
          </View>
          <Text style={styles.flagshipEmoji}>{aiPartnershipCoaching.emoji}</Text>
          <Text style={styles.flagshipTitle}>{aiPartnershipCoaching.title}</Text>
          <Text style={styles.flagshipDescription}>{aiPartnershipCoaching.description}</Text>
          <View style={styles.flagshipItems}>
            {aiPartnershipCoaching.items.map((item, i) => (
              <View key={i} style={styles.flagshipItem}>
                <View style={styles.flagshipDot} />
                <Text style={styles.flagshipItemText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.flagshipTestimonials}>
            {aiPartnershipTestimonials.map((t, i) => (
              <TestimonialQuote key={i} quote={t.quote} author={t.author} variant="dark" />
            ))}
          </View>
          <TouchableOpacity style={styles.flagshipCtaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.flagshipCtaBtnText}>{aiPartnershipCoaching.ctaLabel}</Text>
            <ArrowRight size={18} color="#1B4332" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Business Coaching */}
        <View style={styles.serviceSection}>
          <View
            style={[
              styles.serviceSectionCard,
              { backgroundColor: businessCoaching.color, borderColor: businessCoaching.border },
            ]}
          >
            <Text style={styles.serviceSectionEyebrow}>{businessCoaching.eyebrow}</Text>
            <Text style={styles.serviceEmoji}>{businessCoaching.emoji}</Text>
            <Text style={styles.serviceSectionTitle}>{businessCoaching.title}</Text>
            <Text style={styles.serviceSectionDescription}>{businessCoaching.description}</Text>
            {businessCoaching.items.map((item, j) => (
              <View key={j} style={styles.serviceItem}>
                <View style={styles.serviceDot} />
                <Text style={styles.serviceItemText}>{item}</Text>
              </View>
            ))}
            <TestimonialQuote quote={businessTestimonial.quote} author={businessTestimonial.author} />
            <TouchableOpacity style={styles.serviceSectionCtaBtn} onPress={handleBook} activeOpacity={0.85}>
              <Text style={styles.serviceSectionCtaBtnText}>{businessCoaching.ctaLabel}</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
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
                3 or 6 month commitments with discounted rates. Maximum value and consistent progress.
              </Text>
            </View>
          </View>
          <Text style={styles.pricingNote}>
            Pricing discussed during your free 30-minute session. No commitment required.
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
            Get in touch today and receive a complimentary session.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Request a Session</Text>
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

  // Testimonials (inline quote blocks under each service section)
  flagshipTestimonials: {
    gap: 4,
    marginBottom: 8,
  },
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
  testimonialQuoteTextDark: {
    fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 24,
    fontStyle: 'italic', marginBottom: 8,
  },
  testimonialQuoteAuthorDark: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },

  // Services intro
  servicesIntro: {
    paddingHorizontal: 24, paddingTop: 40, paddingBottom: 8,
    maxWidth: maxW, alignSelf: 'center', width: '100%',
  },
  sectionTitle3: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 4,
  },

  // AI Partnership Coaching — flagship section
  flagshipSection: {
    marginHorizontal: 24, marginVertical: 24,
    borderRadius: 24, padding: isWeb ? 48 : 28,
    maxWidth: maxW + 48, alignSelf: 'center', width: 'auto',
  },
  flagshipBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,169,106,0.2)',
    borderWidth: 1, borderColor: '#D4A96A',
    borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6,
    marginBottom: 16,
  },
  flagshipBadgeText: { fontSize: 11, fontWeight: '800', color: '#D4A96A', letterSpacing: 1.5 },
  flagshipEmoji: { fontSize: 44, marginBottom: 12 },
  flagshipTitle: {
    fontSize: isWeb ? 40 : 30, fontWeight: '800', color: '#FFFFFF',
    letterSpacing: -0.5, marginBottom: 16,
  },
  flagshipDescription: {
    fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 26, marginBottom: 24,
    maxWidth: 640,
  },
  flagshipItems: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    columnGap: 24, rowGap: 10,
    marginBottom: 32,
  },
  flagshipItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, width: isWeb ? '46%' : '100%' },
  flagshipDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#D4A96A',
    marginTop: 8, flexShrink: 0,
  },
  flagshipItemText: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 22, flex: 1 },
  flagshipCtaBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 8,
    backgroundColor: '#D4A96A', paddingHorizontal: 28,
    paddingVertical: 16, borderRadius: 12,
  },
  flagshipCtaBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 16 },

  // Business Coaching section
  serviceSection: {
    paddingHorizontal: 24, paddingVertical: 24,
  },
  serviceSectionCard: {
    maxWidth: maxW, alignSelf: 'center', width: '100%',
    borderRadius: 16, padding: 28, borderWidth: 1,
  },
  serviceSectionEyebrow: {
    fontSize: 11, fontWeight: '700', color: '#1B4332',
    letterSpacing: 2, marginBottom: 10,
  },
  serviceEmoji: { fontSize: 32, marginBottom: 12 },
  serviceSectionTitle: { fontSize: isWeb ? 26 : 22, fontWeight: '800', color: '#1C1917', marginBottom: 12 },
  serviceSectionDescription: { fontSize: 15, color: '#4B5563', lineHeight: 24, marginBottom: 18 },
  serviceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  serviceDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#1B4332',
    marginTop: 8, flexShrink: 0,
  },
  serviceItemText: { fontSize: 14, color: '#4B5563', lineHeight: 22, flex: 1 },
  serviceSectionCtaBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 8,
    backgroundColor: '#1B4332', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 12, marginTop: 20,
  },
  serviceSectionCtaBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

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

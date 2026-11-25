import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ChevronDown, ChevronUp } from '@blinkdotnew/mobile-ui';
import { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { trackEvent } from '@/utils/analytics';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

const approachPillars = [
  {
    title: 'I Listen',
    emoji: '👂',
    body: 'Every conversation starts with listening. Not to respond, but to understand. Your story, your context, your goals. No two people are the same, so no two coaching plans should be either.',
  },
  {
    title: 'I Challenge',
    emoji: '💪',
    body: 'Growth happens at the edge of comfort. I\'ll ask the questions no one else will. I\'ll hold up the mirror when it\'s easier to look away. But I\'ll never push you somewhere you\'re not ready to go.',
  },
  {
    title: 'I Champion',
    emoji: '🏆',
    body: 'No one will believe in you more than I do. I\'ve spent 30 years being the person in the corner who refuses to give up on someone, even when they\'ve given up on themselves.',
  },
];

const aiPartnershipTestimonials = [
  {
    quote: "I'd tried AI and written it off. Henry showed me something different in about twenty minutes. When I read what came back I said: that actually sounds like us. I haven't looked at AI the same way since.",
    author: 'Ted, Co-founder, TheoStar Media',
  },
];

const aiPartnershipCoaching = {
  eyebrow: 'THE FLAGSHIP PROGRAM',
  title: 'AI Partnership Coaching',
  emoji: '🤖',
  description:
    'My newest and most powerful offering, a hybrid model that pairs 30 years of human coaching wisdom with AI-powered tools that keep your momentum alive between sessions. You get the depth of real coaching plus daily reinforcement: reflection prompts shaped around your actual goals.',
  items: [
    'Personalized reflection & journaling prompts',
    'Faster goal-setting and stronger accountability',
    'Human coaching + AI reinforcement, combined',
    'Available for individuals and business teams',
  ],
  ctaLabel: 'Book Your Free 30-Minute Call',
};

const walkAwayCards = [
  { emoji: '⚙️', title: 'A Working AI Setup', text: 'Built specifically around your business, not a generic template. Your language, your industry, your judgment baked in from the start.' },
  { emoji: '🎯', title: 'A Real Problem Solved', text: "Not a demo of what's possible someday. An actual business challenge worked through, with you in the driver's seat." },
  { emoji: '🔗', title: 'A Relationship That Compounds', text: 'The more context your AI partnership carries, the more useful it becomes. You leave with a foundation that keeps getting stronger every time you use it.' },
  { emoji: '🚀', title: 'The Confidence to Keep Going', text: "Most people leave genuinely surprised. Not by the technology, but by themselves. You'll walk away knowing you can do this, with a workflow in your own voice that makes it easy to keep building." },
];

const faqs = [
  {
    q: 'What happens on the free 30-minute call?',
    a: "We talk about you first: your business, what's working, and where you're stuck. Then we talk about AI, if it makes sense. If it fits, I'll tell you how we could work together and what it costs. Either way, you'll know where you stand, with no pressure.",
  },
  {
    q: 'Do I need any technical experience or AI background?',
    a: "None. If you've been running a business for any length of time, you already have everything you need. The problem was never your intelligence. It was that nobody showed you the right relationship to have with AI before handing you the tool.",
  },
  {
    q: 'What do I walk away with?',
    a: "Three things. A working AI setup built around your business. A real problem worked through, not theoretically but actually. And a different understanding of what AI can do when you govern the relationship instead of chasing it.",
  },
  {
    q: 'How is this different from just using AI on my own?',
    a: "When you use AI on your own, you're guessing. You get generic answers because AI doesn't know your business, your industry, or your judgment. Working together, we fix that foundation, and then you see what's actually possible. It's like giving a child a chainsaw and telling them to go collect wood, versus showing them how to use it safely and watching them build something remarkable.",
  },
  {
    q: 'Can a business partner or key employee join?',
    a: "This is designed for one person: you. Occasionally a partner or key employee joins, and that works well when both people are involved in the problem we're working on. If you're thinking about bringing someone, mention it when you book and we'll talk it through.",
  },
  {
    q: 'Do I have to sign up for a package?',
    a: 'No. You can work together one session at a time. Some people want to keep building, and a monthly package makes that easier, with discounted rates. Either way, the free call comes first.',
  },
  {
    q: 'What happens after the free call?',
    a: "That's up to you. If it feels right, we set up a time to work together on a real business problem. If it doesn't, you've spent thirty minutes and you'll still walk away with value.",
  },
];

function TestimonialQuote({ quote, author }: { quote: string; author: string }) {
  return (
    <View style={styles.testimonialQuote}>
      <Text style={styles.testimonialQuoteText}>&ldquo;{quote}&rdquo;</Text>
      <Text style={styles.testimonialQuoteAuthor}>— {author}</Text>
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

export default function AiPartnershipScreen() {
  const { isDesktop, isTablet, isWeb, isMobile } = useResponsive();

  const handleBook = () => {
    trackEvent('book_call_click', { location: 'ai_partnership' });
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

        {/* 1. Top: photo, headline, button */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pageHeader}
        >
          <View style={styles.headerInner}>
            <View style={styles.headerPhotoRow}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: 'https://storage.googleapis.com/blink-core-storage/projects/mindful-horizons-app-er6kbt7g/profile/henry-bio-pic-1777433838206_png/9874e260-0c37-4593-83f0-0cd9a5799f4f.png' }}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text style={styles.pageEyebrow}>AI PARTNERSHIP COACHING</Text>
            <Text style={styles.pageTitle}>Be the senior partner, not the confused student.</Text>
            <Text style={styles.pageSubtitle}>
              After 30 years of business experience, I've learned one thing above everything else: the right relationship changes everything. That's as true with AI as it is with people. I don't teach you prompts. I teach you how to show up as the senior partner in the most powerful business relationship available to you right now.
            </Text>
            <TouchableOpacity style={styles.headerCtaBtn} onPress={handleBook} activeOpacity={0.85}>
              <Text style={styles.headerCtaBtnText}>Book Your Free 30-Minute Call</Text>
              <ArrowRight size={18} color="#1B4332" />
            </TouchableOpacity>
            <Text style={styles.headerNote}>We start with your business. AI comes second.</Text>
          </View>
        </LinearGradient>

        {/* 3. What I offer */}
        <View style={styles.servicesIntro}>
          <Text style={styles.sectionEyebrow}>WHAT I OFFER</Text>
          <Text style={styles.sectionTitle3}>Work with me one-on-one.</Text>
        </View>

        {/* AI Partnership Coaching, flagship */}
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
              <TestimonialQuote key={i} quote={t.quote} author={t.author} />
            ))}
          </View>
          <TouchableOpacity style={styles.flagshipCtaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.flagshipCtaBtnText}>{aiPartnershipCoaching.ctaLabel}</Text>
            <ArrowRight size={18} color="#1B4332" />
          </TouchableOpacity>
        </LinearGradient>

        {/* 4. What you walk away with */}
        <View style={styles.walkAwaySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>WHAT YOU WALK AWAY WITH</Text>
            <Text style={styles.approachTitle}>Not a tutorial. A partnership.</Text>
            <Text style={styles.approachBody}>
              Everything we build is shaped around your business, your goals, and your biggest challenge right now. Here's what you take with you.
            </Text>
          </View>
          <View style={styles.walkAwayGrid}>
            {walkAwayCards.map((c, i) => (
              <View key={i} style={styles.walkAwayCard}>
                <Text style={styles.walkAwayEmoji}>{c.emoji}</Text>
                <Text style={styles.walkAwayCardTitle}>{c.title}</Text>
                <Text style={styles.walkAwayCardText}>{c.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 5. Pricing */}
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
              <Text style={styles.pricingEmoji}>📦</Text>
              <Text style={[styles.pricingTitle, { color: '#FFFFFF' }]}>Monthly Package</Text>
              <Text style={[styles.pricingDesc, { color: 'rgba(255,255,255,0.8)' }]}>
                3 or 6 month commitments with discounted rates. Maximum value and consistent progress.
              </Text>
            </View>
          </View>
          <Text style={styles.pricingNote}>
            Pricing is discussed on your free 30-minute call. No commitment required.
          </Text>
        </View>

        {/* 6. FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionEyebrow}>COMMON QUESTIONS</Text>
          <Text style={styles.sectionTitle5}>Frequently asked questions</Text>
          {faqs.map((f, i) => <FaqItem key={i} item={f} />)}
        </View>

        {/* 7. How I work with you */}
        <View style={styles.approachSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>MY APPROACH</Text>
            <Text style={styles.approachTitle}>The approach that changes everything.</Text>
            <Text style={styles.approachBody}>
              After 30 years of business experience, I've learned that the best results come from one thing: meeting people where they are. Not where I think they should be. Not where a textbook says they ought to be. Where they actually are, right now, in this moment.
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

        {/* 8. Closing CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to stop guessing{'\n'}and start leading?</Text>
          <Text style={styles.ctaBody}>
            Start with a free 30-minute conversation about your business. If AI belongs in it, we'll figure out how. Not a demo. Not a pitch. A real conversation.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Book Your Free 30-Minute Call</Text>
            <ArrowRight size={18} color="#1B4332" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Mindful Horizons</Text>
          <Text style={styles.footerText}>© 2018–2026 All Rights Reserved</Text>
          <Text style={styles.footerText}>contact@mindful-horizons.com · 262-445-1273</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerPhotoRow: { alignItems: 'center', marginBottom: 24 },
  headerCtaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#D4A96A', paddingHorizontal: 32, paddingVertical: 16,
    borderRadius: 12, marginTop: 24, alignSelf: 'flex-start',
  },
  headerCtaBtnText: { color: '#1B4332', fontWeight: '800', fontSize: 16 },
  headerNote: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 10 },
  notAloneSection: { paddingHorizontal: 24, paddingVertical: 40, maxWidth: maxW, alignSelf: 'center', width: '100%' },
  notAloneTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 16,
  },
  painList: { gap: 14, marginTop: 8 },
  painItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkCircle: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#1B4332',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
  },
  painText: { fontSize: 15, color: '#374151', lineHeight: 24, flex: 1 },
  walkAwaySection: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#F0FDF4' },
  walkAwayGrid: {
    flexDirection: isWeb ? 'row' : 'column', flexWrap: isWeb ? 'wrap' : undefined,
    gap: 16, maxWidth: maxW, alignSelf: 'center', width: '100%', marginTop: 12,
  },
  walkAwayCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24,
    width: isWeb ? '47%' : '100%', borderWidth: 1, borderColor: '#D1FAE5',
  },
  walkAwayEmoji: { fontSize: 28, marginBottom: 10 },
  walkAwayCardTitle: { fontSize: 17, fontWeight: '700', color: '#1B4332', marginBottom: 8 },
  walkAwayCardText: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
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

  // Testimonials (inline quote blocks, dark background)
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
    fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 24,
    fontStyle: 'italic', marginBottom: 8,
  },
  testimonialQuoteAuthor: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },

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

  // Photo
  photoSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  photoWrapper: {
    borderRadius: 120,
    overflow: 'hidden',
    width: 160,
    height: 160,
    borderWidth: 4,
    borderColor: '#D4A96A',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  photoImage: { width: 160, height: 160 },

  // CTA
  ctaSection: { paddingHorizontal: 24, paddingVertical: 52, alignItems: 'center' },
  ctaTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', lineHeight: isWeb ? 44 : 34, marginBottom: 14, letterSpacing: -0.5,
  },
  ctaBody: {
    fontSize: 16, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', marginBottom: 28, lineHeight: 26,
    maxWidth: 560,
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

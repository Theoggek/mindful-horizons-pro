import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, ChevronDown, ChevronUp, Lock } from '@blinkdotnew/mobile-ui';
import { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

const rules = [
  { num: '01', rule: 'You always have a choice' },
  { num: '02', rule: 'Your life is a gift. Treat it as an adventure' },
  { num: '03', rule: 'Experience something new every day' },
  { num: '04', rule: 'Learn something new every day' },
  { num: '05', rule: 'Fear is something you create' },
  { num: '06', rule: 'The line between where you are and where you want to be is a thought away' },
  { num: '07–12', rule: 'Unlock the remaining 6 rules in your free consultation', locked: true },
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
          <View style={styles.navbar}>
            <Text style={styles.navLogo}>Mindful Horizons</Text>
          </View>
        )}

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

        {/* Origin Story */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>ORIGIN OF THE 12 RULES</Text>
          <Text style={styles.sectionTitle}>How it all began</Text>
          <View style={styles.storyBlock}>
            <Text style={styles.storyText}>
              I remember the day like it was yesterday. I was sitting in my therapist's office, frustrated with my life... I kept saying I didn't understand the game, never mind the rules by which the game of life was played.
            </Text>
            <Text style={styles.storyText}>
              I blurted out, "Why did I have to even play the game, since I didn't get to make the rules or at least participate in making them?" My therapist looked at me with a deadpan face and asked, "What are these rules you keep talking about?"
            </Text>
            <Text style={styles.storyText}>
              I left with a homework assignment: identify the rules by which I believed I was living my life. Eventually, I came up with a set of rules that made sense — but as I looked over them, I realized these were not my rules, but someone else's.
            </Text>
            <Text style={styles.storyText}>
              So I sat in my backyard, paper and pen in hand, and my inner voice said "Enough!" — and I wrote these rules in one sitting. I have used them to coach businesses and individuals alike with great success.
            </Text>
          </View>
          <View style={styles.storyNote}>
            <Text style={styles.storyNoteText}>
              💡 Created 24 years ago — long before the age of AI. By Henry Mengoli, 2002.
            </Text>
          </View>
        </View>

        {/* 12 Rules */}
        <View style={styles.rulesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>FRAMEWORK</Text>
            <Text style={styles.sectionTitle2}>My Twelve Rules for Life</Text>
            <Text style={styles.sectionBody}>
            These are my rules. I share them as an example of the kind of growth you can have in life when you write your own rules.
          </Text>
          </View>
          {rules.map((r, i) => (
            <View key={i} style={[styles.ruleCard, r.locked && styles.ruleCardLocked]}>
              <Text style={[styles.ruleNum, r.locked && styles.ruleNumLocked]}>{r.num}</Text>
              <Text style={[styles.ruleText, r.locked && styles.ruleTextLocked]}>{r.rule}</Text>
              {r.locked && <Lock size={16} color="#9CA3AF" />}
            </View>
          ))}
          <TouchableOpacity style={styles.unlockBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.unlockBtnText}>Unlock Rules 7–12 in Your Free Session</Text>
            <ArrowRight size={16} color="#1B4332" />
          </TouchableOpacity>
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

  navbar: {
    backgroundColor: '#FDFCF9',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  navLogo: { fontSize: 20, fontWeight: '800', color: '#1B4332', letterSpacing: -0.5 },

  pageHeader: { paddingVertical: 48, paddingHorizontal: 24 },
  headerInner: { maxWidth: maxW, alignSelf: 'center', width: '100%' },
  pageEyebrow: { fontSize: 11, fontWeight: '700', color: '#D4A96A', letterSpacing: 2, marginBottom: 10 },
  pageTitle: {
    fontSize: isWeb ? 44 : 32, fontWeight: '800', color: '#FFFFFF',
    letterSpacing: -0.5, marginBottom: 12,
  },
  pageSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 26, fontStyle: 'italic' },

  // Story section
  section: {
    paddingHorizontal: 24, paddingVertical: 40,
    maxWidth: maxW, alignSelf: 'center', width: '100%',
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
  sectionTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 20,
  },
  storyBlock: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1B4332',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 14,
    marginBottom: 16,
  },
  storyText: { fontSize: 15, color: '#374151', lineHeight: 26, fontStyle: 'italic' },
  storyNote: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  storyNoteText: { fontSize: 14, color: '#92400E', lineHeight: 22 },

  // Rules
  rulesSection: {
    paddingHorizontal: 24, paddingVertical: 40,
    backgroundColor: '#F0FDF4',
    borderTopWidth: 1, borderTopColor: '#D1FAE5',
    borderBottomWidth: 1, borderBottomColor: '#D1FAE5',
  },
  sectionTitle2: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 12,
  },
  sectionBody: {
    fontSize: 15, color: '#4B5563', lineHeight: 26, marginBottom: 24,
  },
  ruleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  ruleCardLocked: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  ruleNum: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1B4332',
    width: 36,
    flexShrink: 0,
    letterSpacing: 0.5,
  },
  ruleNumLocked: { color: '#D1D5DB' },
  ruleText: {
    flex: 1,
    fontSize: 15,
    color: '#1C1917',
    fontWeight: '600',
    lineHeight: 22,
  },
  ruleTextLocked: { color: '#9CA3AF', fontStyle: 'italic' },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D4A96A',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 8,
  },
  unlockBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 14 },

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

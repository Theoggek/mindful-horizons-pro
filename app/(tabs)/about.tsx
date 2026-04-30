import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Award, Users, Heart, Star, Quote, CheckCircle } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 800;

const credentials = [
  { icon: '🎓', title: '24+ Years Coaching', desc: 'Proven experience transforming lives and businesses' },
  { icon: '🏢', title: 'Senior Management', desc: 'Background in building successful companies' },
  { icon: '🛠', title: 'Technical Background', desc: 'Deep understanding of technical professional demands' },
  { icon: '♿', title: 'Lived Experience', desc: 'Personal journey with disability informs empathetic coaching' },
];

const values = [
  {
    title: 'Honesty',
    desc: 'Honesty really is the best policy. You won\'t make the most necessary amount of progress if I couch my answers to your questions.',
    icon: '🤝',
    color: '#DBEAFE',
    borderColor: '#BFDBFE',
  },
  {
    title: 'Your Personal Champion',
    desc: "You won't find a stronger, more supportive personal coach. When I get behind you, you can accomplish or work through any situation. \"I believe in you from day one.\"",
    icon: '🏆',
    color: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  {
    title: 'Results',
    desc: "I believe in results. It's how we measure progress. Every session is focused on moving you forward.",
    icon: '📈',
    color: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
];

export default function AboutScreen() {
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
            <Text style={styles.pageEyebrow}>ABOUT YOUR COACH</Text>
            <Text style={styles.pageTitle}>Henry Mengoli</Text>
            <Text style={styles.pageSubtitle}>
              Professional coach with over 24 years of experience supporting individuals seeking lasting change through personal growth.
            </Text>
          </View>
        </LinearGradient>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          {/* Profile Image Placeholder */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/blink-core-storage/projects/mindful-horizons-app-er6kbt7g/profile/henry-bio-pic-1777433838206_png/9874e260-0c37-4593-83f0-0cd9a5799f4f.png' }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.sectionEyebrow}>MY STORY</Text>
          <Text style={styles.sectionTitle}>Hello, I'm Henry.</Text>
          <Text style={styles.bioText}>
            I am a professional coach with over 20 years of experience, supporting individuals seeking change in their lives through personal growth techniques. My coaching focuses on career transitions, developing self-advocacy skills, and realizing business potential.
          </Text>
          <Text style={styles.bioText}>
            Living with a disability has taught me valuable lessons in navigating change and advocating for my needs. I bring this wealth of lived experience to my practice, empowering clients to overcome obstacles, discover their strengths, and achieve their career goals.
          </Text>
        </View>

        {/* Credentials */}
        <View style={styles.credSection}>
          <View style={styles.credSectionHeader}>
            <Text style={styles.sectionEyebrow}>CREDENTIALS & EXPERIENCE</Text>
            <Text style={styles.sectionTitle2}>Built on real-world expertise.</Text>
          </View>
          <View style={styles.credGrid}>
            {credentials.map((c, i) => (
              <View key={i} style={styles.credCard}>
                <Text style={styles.credIcon}>{c.icon}</Text>
                <Text style={styles.credTitle}>{c.title}</Text>
                <Text style={styles.credDesc}>{c.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Story - Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>THE EXPERIENCE DIFFERENCE</Text>
          <Text style={styles.sectionTitle}>I've been there too.</Text>

          <View style={styles.storyCard}>
            <Text style={styles.storyText}>
              Has work become a stress-filled battleground? Is the joy in your life gone? Ready for change but unsure how to begin?
            </Text>
            <Text style={styles.storyText}>
              I understand because I've been there. Through my own journey and 24 years of coaching others, I've developed proven techniques that create real results. Let me help you overcome your obstacles and rediscover joy in your life and career.
            </Text>
          </View>

          <Text style={styles.sectionEyebrow2}>CREATING SAFE SPACES</Text>
          <Text style={styles.storyBody}>
            I have been creating safe spaces for people to dare to believe in themselves for quite some time. Unbiased and non-judgmental, I provide an environment where dreams can flourish and where you can freely share the things that give you hope and joy. Together, we'll transform these dreams into reality.
          </Text>
        </View>

        {/* Values */}
        <View style={styles.valuesSection}>
          <Text style={styles.sectionEyebrow}>THE VALUES I COACH BY</Text>
          <Text style={styles.sectionTitle}>What you can expect from me.</Text>
          {values.map((v, i) => (
            <View key={i} style={[styles.valueCard, { backgroundColor: v.color, borderColor: v.borderColor }]}>
              <Text style={styles.valueIcon}>{v.icon}</Text>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>{v.title}</Text>
                <Text style={styles.valueDesc}>{v.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Highly Rated */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>CLIENT TESTIMONIALS</Text>
          <Text style={styles.sectionTitle}>Highly rated & recommended</Text>
          <Text style={styles.sectionBody}>
            I have experience helping people overcome life and work challenges. Here's what clients say:
          </Text>

          <View style={styles.testimonialCard}>
            <Quote size={20} color="#D4A96A" />
            <Text style={styles.testimonialText}>
              "You helped me change my life by giving me the tools to overcome my fear of public speaking and finally pursue my dream career."
            </Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} color="#D4A96A" fill="#D4A96A" />)}
            </View>
          </View>

          <View style={styles.testimonialCard}>
            <Quote size={20} color="#D4A96A" />
            <Text style={styles.testimonialText}>
              "I found the confidence to pursue my dream of owning my own business."
            </Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} color="#D4A96A" fill="#D4A96A" />)}
            </View>
          </View>
        </View>

        {/* CTA */}
        <LinearGradient
          colors={['#1B4332', '#0D1F18']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to create a life with{'\n'}more purpose and joy?</Text>
          <Text style={styles.ctaBody}>Get in touch today and receive a complimentary consultation.</Text>
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
  navLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: -0.5,
  },

  pageHeader: {
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  headerInner: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  pageEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: isWeb ? 44 : 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 26,
  },

  // Bio
  bioSection: {
    padding: 24,
    paddingTop: 40,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  profileImageWrapper: {
    marginBottom: 28,
    alignSelf: 'center',
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
  profileImage: {
    width: 160,
    height: 160,
  },

  sectionEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionEyebrow2: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: isWeb ? 34 : 26,
    fontWeight: '800',
    color: '#1C1917',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  credSectionHeader: {
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle2: {
    fontSize: isWeb ? 34 : 26,
    fontWeight: '800',
    color: '#1C1917',
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 28,
    marginBottom: 14,
  },
  sectionBody: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
    marginBottom: 20,
  },

  // Credentials
  credSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#F0FDF4',
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
  },
  credGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  credCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    width: isWeb ? '47%' : '100%',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  credIcon: { fontSize: 28, marginBottom: 10 },
  credTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 6,
  },
  credDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Section
  section: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  storyCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1B4332',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  storyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  storyBody: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 26,
  },

  // Values
  valuesSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FAFAF9',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  valueCard: {
    flexDirection: 'row',
    gap: 16,
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  valueIcon: { fontSize: 28, flexShrink: 0 },
  valueContent: { flex: 1 },
  valueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 6,
  },
  valueDesc: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },

  // Testimonials
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
    marginVertical: 12,
  },
  stars: { flexDirection: 'row', gap: 2 },

  // CTA
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 52,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isWeb ? 34 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: isWeb ? 44 : 34,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  ctaBody: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 26,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D4A96A',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  ctaBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 16 },

  footer: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#1C1917',
    gap: 6,
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D4A96A',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

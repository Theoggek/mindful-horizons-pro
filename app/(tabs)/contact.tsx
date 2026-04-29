import {
  ScrollView, View, Text, TextInput, TouchableOpacity,
  StyleSheet, Linking, Platform, KeyboardAvoidingView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Mail, Phone } from '@blinkdotnew/mobile-ui';
import { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';

const isWeb = Platform.OS === 'web'; // used in StyleSheet.create (module-level, static is fine)
const maxW = 640;

interface FormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export default function ContactScreen() {
  const { isDesktop, isTablet, isWeb } = useResponsive();

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:h.mengoli@outlook.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:2624451273');
  };

  const BACKEND_URL = 'https://er6kbt7g.backend.blink.new';

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.message) {
      Alert.alert('Required Fields', 'Please fill in your name, email, and message.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Error', data.error || 'Failed to send message. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
    Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {},
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
              <Text style={styles.pageEyebrow}>GET IN TOUCH</Text>
              <Text style={styles.pageTitle}>Let's work together</Text>
              <Text style={styles.pageSubtitle}>
                Get in touch today and receive a complimentary consultation. No commitment, just a conversation.
              </Text>
            </View>
          </LinearGradient>

          {/* Contact Info Cards */}
          <View style={styles.contactInfoSection}>
            <TouchableOpacity style={styles.contactCard} onPress={handleEmail} activeOpacity={0.8}>
              <View style={styles.contactCardIcon}>
                <Mail size={20} color="#1B4332" />
              </View>
              <View style={styles.contactCardContent}>
                <Text style={styles.contactCardLabel}>Email</Text>
                <Text style={styles.contactCardValue}>h.mengoli@outlook.com</Text>
              </View>
              <ArrowRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handlePhone} activeOpacity={0.8}>
              <View style={styles.contactCardIcon}>
                <Phone size={20} color="#1B4332" />
              </View>
              <View style={styles.contactCardContent}>
                <Text style={styles.contactCardLabel}>Phone</Text>
                <Text style={styles.contactCardValue}>262-445-1273</Text>
              </View>
              <ArrowRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleBook} activeOpacity={0.8}>
              <View style={[styles.contactCardIcon, { backgroundColor: '#FEF3C7' }]}>
                <Text style={{ fontSize: 18 }}>📅</Text>
              </View>
              <View style={styles.contactCardContent}>
                <Text style={styles.contactCardLabel}>Free 30-Min Session</Text>
                <Text style={styles.contactCardValue}>Book via Calendly</Text>
              </View>
              <ArrowRight size={16} color="#D4A96A" />
            </TouchableOpacity>
          </View>

          {/* Contact Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionEyebrow}>SEND A MESSAGE</Text>
            <Text style={styles.sectionTitle}>We'd love to hear from you.</Text>
            <Text style={styles.sectionBody}>
              Fill out the form below and Henry will personally respond within 24 hours.
            </Text>

            {submitted ? (
              <View style={styles.successBox}>
                <Text style={styles.successEmoji}>✅</Text>
                <Text style={styles.successTitle}>Message Sent!</Text>
                <Text style={styles.successBody}>
                  Thank you for reaching out. Henry will be in touch within 24 hours. In the meantime, why not book your free 30-min session?
                </Text>
                <TouchableOpacity style={styles.successBtn} onPress={handleBook} activeOpacity={0.85}>
                  <Text style={styles.successBtnText}>Book Free Session</Text>
                  <ArrowRight size={16} color="#1B4332" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Full Name *</Text>
                  <TextInput
                    style={inputStyle('fullName')}
                    placeholder="Your full name"
                    placeholderTextColor="#9CA3AF"
                    value={form.fullName}
                    onChangeText={v => setForm({ ...form, fullName: v })}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Email Address *</Text>
                  <TextInput
                    style={inputStyle('email')}
                    placeholder="your@email.com"
                    placeholderTextColor="#9CA3AF"
                    value={form.email}
                    onChangeText={v => setForm({ ...form, email: v })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.fieldGroup, { flex: 1 }]}>
                    <Text style={styles.fieldLabel}>Company Name</Text>
                    <TextInput
                      style={inputStyle('company')}
                      placeholder="Optional"
                      placeholderTextColor="#9CA3AF"
                      value={form.company}
                      onChangeText={v => setForm({ ...form, company: v })}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                  <View style={[styles.fieldGroup, { flex: 1 }]}>
                    <Text style={styles.fieldLabel}>Phone Number</Text>
                    <TextInput
                      style={inputStyle('phone')}
                      placeholder="Optional"
                      placeholderTextColor="#9CA3AF"
                      value={form.phone}
                      onChangeText={v => setForm({ ...form, phone: v })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Message *</Text>
                  <TextInput
                    style={[inputStyle('message'), styles.textarea]}
                    placeholder="Tell me a bit about yourself and what you'd like help with..."
                    placeholderTextColor="#9CA3AF"
                    value={form.message}
                    onChangeText={v => setForm({ ...form, message: v })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity
                  style={[styles.submitBtn, loading && styles.submitBtnLoading]}
                  onPress={handleSubmit}
                  activeOpacity={0.85}
                  disabled={loading}
                >
                  <Text style={styles.submitBtnText}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Text>
                  {!loading && <ArrowRight size={18} color="#FFFFFF" />}
                </TouchableOpacity>

                <Text style={styles.formNote}>
                  * Required fields. Your information is kept strictly confidential.
                </Text>
              </View>
            )}
          </View>

          {/* Book CTA */}
          <LinearGradient
            colors={['#D4A96A', '#B8864E']}
            style={styles.bookBanner}
          >
            <Text style={styles.bookBannerTitle}>Prefer to talk directly?</Text>
            <Text style={styles.bookBannerBody}>
              Skip the form and book your free 30-minute session directly through Calendly.
            </Text>
            <TouchableOpacity style={styles.bookBannerBtn} onPress={handleBook} activeOpacity={0.85}>
              <Text style={styles.bookBannerBtnText}>Book Free 30-Min Session</Text>
              <ArrowRight size={16} color="#D4A96A" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerLogo}>Mindful Horizons</Text>
            <Text style={styles.footerText}>© 2018–2026 All Rights Reserved</Text>
            <Text style={styles.footerText}>h.mengoli@outlook.com · 262-445-1273</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDFCF9' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  navbar: {
    backgroundColor: '#FDFCF9',
    paddingHorizontal: 24, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
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
  pageSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 26 },

  // Contact Info
  contactInfoSection: {
    paddingHorizontal: 24, paddingVertical: 32,
    gap: 12, maxWidth: maxW, alignSelf: 'center', width: '100%',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  contactCardIcon: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactCardContent: { flex: 1 },
  contactCardLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2, fontWeight: '500' },
  contactCardValue: { fontSize: 15, color: '#1C1917', fontWeight: '600' },

  // Social
  socialSection: {
    paddingHorizontal: 24, paddingBottom: 24,
    maxWidth: maxW, alignSelf: 'center', width: '100%',
  },
  socialLabel: { fontSize: 13, color: '#9CA3AF', marginBottom: 10, fontWeight: '500' },
  socialRow: { flexDirection: 'row', gap: 10 },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB',
  },
  socialBtnText: { fontSize: 13, fontWeight: '600', color: '#374151' },

  // Form
  formSection: {
    paddingHorizontal: 24, paddingVertical: 40,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  sectionEyebrow: { fontSize: 11, fontWeight: '700', color: '#D4A96A', letterSpacing: 2, marginBottom: 10 },
  sectionTitle: {
    fontSize: isWeb ? 34 : 26, fontWeight: '800', color: '#1C1917',
    letterSpacing: -0.5, marginBottom: 12,
    maxWidth: maxW, alignSelf: 'center',
  },
  sectionBody: {
    fontSize: 15, color: '#6B7280', lineHeight: 26, marginBottom: 24,
    maxWidth: maxW, alignSelf: 'center',
  },
  form: { maxWidth: maxW, alignSelf: 'center', width: '100%', gap: 4 },
  row: { flexDirection: isWeb ? 'row' : 'column', gap: 12 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#1C1917',
  },
  inputFocused: {
    borderColor: '#1B4332',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  textarea: { height: 120, paddingTop: 13 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#1B4332',
    paddingVertical: 16, borderRadius: 12, marginTop: 8,
  },
  submitBtnLoading: { opacity: 0.7 },
  submitBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  formNote: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 12 },

  // Success
  successBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 32,
    borderWidth: 1, borderColor: '#D1FAE5',
    maxWidth: maxW, alignSelf: 'center', width: '100%',
  },
  successEmoji: { fontSize: 48, marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: '800', color: '#1C1917', marginBottom: 12 },
  successBody: {
    fontSize: 15, color: '#4B5563', textAlign: 'center',
    lineHeight: 24, marginBottom: 24,
  },
  successBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#D4A96A', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 12,
  },
  successBtnText: { color: '#1B4332', fontWeight: '700', fontSize: 15 },

  // Book Banner
  bookBanner: {
    paddingHorizontal: 24, paddingVertical: 40,
    alignItems: 'center',
  },
  bookBannerTitle: {
    fontSize: isWeb ? 28 : 22, fontWeight: '800', color: '#FFFFFF',
    marginBottom: 10, textAlign: 'center', letterSpacing: -0.3,
  },
  bookBannerBody: {
    fontSize: 15, color: 'rgba(255,255,255,0.85)',
    textAlign: 'center', lineHeight: 24, marginBottom: 24, maxWidth: 400,
  },
  bookBannerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1B4332', paddingHorizontal: 28,
    paddingVertical: 14, borderRadius: 12,
  },
  bookBannerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  footer: {
    paddingVertical: 28, paddingHorizontal: 24,
    alignItems: 'center', backgroundColor: '#1C1917', gap: 6,
  },
  footerLogo: { fontSize: 16, fontWeight: '800', color: '#D4A96A', marginBottom: 4 },
  footerText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});

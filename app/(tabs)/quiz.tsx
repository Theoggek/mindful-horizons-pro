import { useState, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, RotateCcw, Check } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';
import { WebNavBar } from '@/components/WebNavBar';
import { MobileNavBar } from '@/components/MobileNavBar';

const isWeb = Platform.OS === 'web';
const maxW = 720;

// ─── Type definitions ───────────────────────────────────────────────
type TypeKey = 1 | 2 | 3 | 4 | 5 | 6;

interface Option {
  label: string;
  weights: Record<TypeKey, number>;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface TypeInfo {
  key: TypeKey;
  title: string;
  emoji: string;
  color: string;
  border: string;
  description: string;
}

// ─── Types ──────────────────────────────────────────────────────────
const TYPES: Record<TypeKey, TypeInfo> = {
  1: {
    key: 1,
    title: 'The Shy One',
    emoji: '🌱',
    color: '#F0FDF4',
    border: '#BBF7D0',
    description: "You're curious about AI but haven't taken the first step yet. The good news? Your curiosity is the most important ingredient — everything else is just a conversation away.",
  },
  2: {
    key: 2,
    title: 'The Frustrated One',
    emoji: '😤',
    color: '#FEF2F2',
    border: '#FECACA',
    description: "You've tried AI and it let you down — generic responses, wrong tone, wasted time. The problem wasn't you. It was the relationship you were told to have with it.",
  },
  3: {
    key: 3,
    title: 'The Gone One',
    emoji: '🚶',
    color: '#F5F3FF',
    border: '#DDD6FE',
    description: "You walked away, but something keeps pulling you back. That instinct is right — there is more to this than what you experienced. You just need the right guide.",
  },
  4: {
    key: 4,
    title: 'The Plateau One',
    emoji: '📊',
    color: '#FFFBEB',
    border: '#FDE68A',
    description: "You're using AI and getting some results, but you know there's a ceiling you can't break through. The missing piece isn't another prompt — it's a different kind of partnership.",
  },
  5: {
    key: 5,
    title: 'The Content Master',
    emoji: '🏆',
    color: '#ECFDF5',
    border: '#A7F3D0',
    description: "You're comfortable with AI and getting solid results. But you sense you're only scratching the surface. You're right — and the next level changes everything.",
  },
  6: {
    key: 6,
    title: 'The True Partner',
    emoji: '🤝',
    color: '#FDF2F8',
    border: '#FBCFE8',
    description: "This is where it all comes together — you and AI as equal, trust-based partners. You bring the judgment; it brings the speed. Together, you're unstoppable.",
  },
};

// ─── Questions ──────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Have you ever tried using AI for your business?',
    options: [
      { label: 'Yes, and it worked well',              weights: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 2, 6: 1 } },
      { label: 'Yes, but it didn\'t work the way I expected', weights: { 1: 0, 2: 2, 3: 1, 4: 1, 5: 0, 6: 0 } },
      { label: 'Yes, and I walked away',               weights: { 1: 0, 2: 1, 3: 2, 4: 0, 5: 0, 6: 0 } },
      { label: 'No, but I\'m curious',                  weights: { 1: 2, 2: 0, 3: 1, 4: 0, 5: 0, 6: 0 } },
      { label: 'No, and I\'m not sure it\'s for me',     weights: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
    ],
  },
  {
    id: 2,
    text: 'When you think about AI right now, what\'s your gut feeling?',
    options: [
      { label: 'Excited and ready',                    weights: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 1, 6: 2 } },
      { label: 'Curious but unsure where to start',    weights: { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'Frustrated — I\'ve been burned',         weights: { 1: 0, 2: 2, 3: 1, 4: 0, 5: 0, 6: 0 } },
      { label: 'Skeptical — too many bad stories',      weights: { 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'Comfortable — I use it and it works',   weights: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 2, 6: 1 } },
    ],
  },
  {
    id: 3,
    text: 'Which best describes your AI experience?',
    options: [
      { label: 'Never tried it',                       weights: { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'Tried it, but got frustrated or gave up', weights: { 1: 0, 2: 2, 3: 2, 4: 0, 5: 0, 6: 0 } },
      { label: 'Use it regularly but not getting everything out of it', weights: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 1, 6: 0 } },
      { label: 'I\'ve got it figured out',               weights: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 2 } },
    ],
  },
  {
    id: 4,
    text: 'How long have you been in business?',
    options: [
      { label: 'Less than 2 years',                    weights: { 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: '2–5 years',                            weights: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 0, 6: 0 } },
      { label: '5–10 years',                           weights: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 0 } },
      { label: 'More than 10 years',                   weights: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 2 } },
    ],
  },
  {
    id: 5,
    text: 'When AI gives you a response that feels wrong, what do you do?',
    options: [
      { label: 'Trust it anyway',                      weights: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'Try a different prompt',               weights: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 1, 6: 0 } },
      { label: 'Push back and ask it to reconsider',   weights: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 2 } },
      { label: 'Not sure how to tell if it\'s wrong',    weights: { 1: 2, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'I\'ve stopped using it because of this',  weights: { 1: 0, 2: 2, 3: 2, 4: 0, 5: 0, 6: 0 } },
    ],
  },
  {
    id: 6,
    text: 'What would it mean if AI actually worked the way you hoped?',
    options: [
      { label: 'More time',                            weights: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 0, 6: 0 } },
      { label: 'Better decisions',                     weights: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1 } },
      { label: 'Faster growth',                        weights: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 1, 6: 0 } },
      { label: 'More confidence',                      weights: { 1: 2, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0 } },
      { label: 'All of the above',                     weights: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 2 } },
    ],
  },
];

// ─── Scoring ────────────────────────────────────────────────────────
// Q3 ("Which best describes your AI experience?") is the primary gate:
// it hard-constrains the result to a type range, so no combination of
// answers on the other questions can contradict it.
const GATE_QUESTION_ID = 3;

const GATE_RANGES: TypeKey[][] = [
  [1],       // Never tried it
  [2, 3],    // Tried it, but got frustrated or gave up
  [4, 5],    // Use it regularly but not getting everything out of it
  [5, 6],    // I've got it figured out
];

function scoreQuiz(answers: number[]): TypeKey {
  const gateOptIdx = answers[GATE_QUESTION_ID - 1];
  const allowed = GATE_RANGES[gateOptIdx];

  if (allowed.length === 1) return allowed[0];

  // Tiebreak within the allowed range using the other questions' weights.
  const totals: Record<TypeKey, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  answers.forEach((optIdx, qIdx) => {
    if (qIdx === GATE_QUESTION_ID - 1) return;
    const weights = QUESTIONS[qIdx].options[optIdx].weights;
    (Object.keys(weights) as unknown as TypeKey[]).forEach((k) => {
      const key = k as TypeKey;
      if (allowed.includes(key)) totals[key] += weights[key];
    });
  });

  // Find the highest-scoring allowed type; on tie, prefer the lower (more beginner) type.
  let best = allowed[0];
  let bestScore = -1;
  allowed.forEach((key) => {
    if (totals[key] > bestScore) {
      bestScore = totals[key];
      best = key;
    }
  });
  return best;
}

// ─── Component ──────────────────────────────────────────────────────
export default function QuizScreen() {
  const { isDesktop, isTablet } = useResponsive();
  const [step, setStep] = useState(0); // 0 = question 1, 5 = question 6
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<TypeKey | null>(null);

  const handleSelect = useCallback((optIdx: number) => {
    setSelectedOption(optIdx);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(scoreQuiz(newAnswers));
    }
  }, [selectedOption, answers, step]);

  const handleBack = useCallback(() => {
    if (step === 0) return;
    const newAnswers = answers.slice(0, -1);
    setAnswers(newAnswers);
    setSelectedOption(null);
    setStep(step - 1);
  }, [step, answers]);

  const handleRetake = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  }, []);

  const handleBook = useCallback(() => {
    Linking.openURL('https://calendly.com/h-mengoli/30min');
  }, []);

  const currentQ = QUESTIONS[step];
  const progress = result ? 1 : (step + (selectedOption !== null ? 1 : 0)) / QUESTIONS.length;

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {isDesktop || isTablet ? (
        <WebNavBar />
      ) : (
        <MobileNavBar />
      )}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >

        {/* Header */}
        <LinearGradient
          colors={['#1B4332', '#2D6A4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.header}
        >
          <View style={s.headerInner}>
            <Text style={s.eyebrow}>FIND YOUR AI TYPE</Text>
            <Text style={s.title}>Which Type of AI User Are You?</Text>
            <Text style={s.subtitle}>
              Answer six honest questions. In under two minutes, you'll know exactly where you stand — and what's possible next.
            </Text>
          </View>
        </LinearGradient>

        {/* Progress bar */}
        <View style={s.progressOuter}>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
          <Text style={s.progressLabel}>
            {result ? 'Complete' : `Question ${step + 1} of ${QUESTIONS.length}`}
          </Text>
        </View>

        {/* Questions or Result */}
        {!result ? (
          <View style={s.card}>
            <Text style={s.questionText}>{currentQ.text}</Text>
            <View style={s.optionsWrap}>
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[s.optionCard, isSelected && s.optionCardSelected]}
                    onPress={() => handleSelect(i)}
                    activeOpacity={0.8}
                  >
                    <View style={[s.radio, isSelected && s.radioSelected]}>
                      {isSelected && <View style={s.radioDot} />}
                    </View>
                    <Text style={[s.optionText, isSelected && s.optionTextSelected]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={s.navRow}>
              {step > 0 ? (
                <TouchableOpacity style={s.backBtn} onPress={handleBack} activeOpacity={0.7}>
                  <Text style={s.backBtnText}>Back</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              <TouchableOpacity
                style={[s.nextBtn, selectedOption === null && s.nextBtnDisabled]}
                onPress={handleNext}
                activeOpacity={selectedOption === null ? 1 : 0.85}
                disabled={selectedOption === null}
              >
                <Text style={s.nextBtnText}>
                  {step === QUESTIONS.length - 1 ? 'See My Result' : 'Next'}
                </Text>
                <ArrowRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ── Result Card ─────────────────────────── */
          <View style={s.resultSection}>
            <View style={[s.resultCard, { backgroundColor: TYPES[result].color, borderColor: TYPES[result].border }]}>
              <Text style={s.resultEmoji}>{TYPES[result].emoji}</Text>
              <Text style={s.resultTypeLabel}>You are</Text>
              <Text style={s.resultTypeTitle}>Type {result} — {TYPES[result].title}</Text>
              <View style={s.resultDivider} />
              <Text style={s.resultDesc}>{TYPES[result].description}</Text>
              <Text style={s.resultNote}>
                Your result is a starting point — your free 30-minute Mindful AI Relationship Audit will confirm your actual type and map your next steps.
              </Text>
            </View>

            <TouchableOpacity style={s.bookBtn} onPress={handleBook} activeOpacity={0.85}>
              <Text style={s.bookBtnText}>Book Your Free 30-Minute Session</Text>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style={s.retakeBtn} onPress={handleRetake} activeOpacity={0.7}>
              <RotateCcw size={14} color="#6B7280" />
              <Text style={s.retakeBtnText}>Retake the Quiz</Text>
            </TouchableOpacity>

            {/* Show all types summary */}
            <Text style={s.allTypesHeading}>All Six Types at a Glance</Text>
            <View style={s.allTypesGrid}>
              {(Object.keys(TYPES) as unknown as TypeKey[]).map((k) => {
                const t = TYPES[k as TypeKey];
                const isYou = k === result;
                return (
                  <View
                    key={k}
                    style={[
                      s.miniCard,
                      { backgroundColor: t.color, borderColor: isYou ? '#1B4332' : t.border },
                      isYou && s.miniCardActive,
                    ]}
                  >
                    <View style={s.miniCardTop}>
                      <Text style={s.miniEmoji}>{t.emoji}</Text>
                      <Text style={s.miniTitle}>Type {k} — {t.title}</Text>
                      {isYou && (
                        <View style={s.youBadge}>
                          <Check size={10} color="#FFFFFF" />
                          <Text style={s.youBadgeText}>You</Text>
                        </View>
                      )}
                    </View>
                    <Text style={s.miniDesc} numberOfLines={2}>
                      {t.description}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerLogo}>Mindful Horizons</Text>
          <Text style={s.footerText}>© 2018–2026 All Rights Reserved</Text>
          <Text style={s.footerText}>contact@mindful-horizons.com · 262-445-1273</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
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
  navLogo: { fontSize: 20, fontWeight: '800', color: '#1B4332', letterSpacing: -0.5 },

  // Header
  header: { paddingVertical: 48, paddingHorizontal: 24 },
  headerInner: { maxWidth: maxW, alignSelf: 'center', width: '100%', alignItems: 'center' },
  eyebrow: { fontSize: 11, fontWeight: '700', color: '#D4A96A', letterSpacing: 2, marginBottom: 12 },
  title: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: isWeb ? 48 : 36,
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 560,
  },

  // Progress
  progressOuter: {
    paddingHorizontal: 24,
    paddingTop: 24,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1B4332',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  // Question card
  card: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  questionText: {
    fontSize: isWeb ? 24 : 20,
    fontWeight: '700',
    color: '#1C1917',
    lineHeight: isWeb ? 32 : 28,
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  optionsWrap: { gap: 12, marginBottom: 32 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
  },
  optionCardSelected: {
    borderColor: '#1B4332',
    backgroundColor: '#F0FDF4',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioSelected: { borderColor: '#1B4332' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1B4332' },
  optionText: { flex: 1, fontSize: 15, color: '#374151', lineHeight: 22 },
  optionTextSelected: { color: '#1B4332', fontWeight: '600' },

  // Navigation row
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtnText: { fontSize: 15, color: '#6B7280', fontWeight: '600' },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1B4332',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  // Result
  resultSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    maxWidth: maxW,
    alignSelf: 'center',
    width: '100%',
  },
  resultCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  resultEmoji: { fontSize: 56, marginBottom: 12 },
  resultTypeLabel: { fontSize: 13, color: '#9CA3AF', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  resultTypeTitle: {
    fontSize: isWeb ? 30 : 24,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: isWeb ? 38 : 32,
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  resultDivider: { width: 48, height: 2, backgroundColor: '#D4A96A', borderRadius: 1, marginBottom: 16 },
  resultDesc: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 520,
  },
  resultNote: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 480,
    marginTop: 16,
    fontStyle: 'italic',
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1B4332',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 16,
  },
  bookBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    marginBottom: 40,
  },
  retakeBtnText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },

  // All types
  allTypesHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 16,
  },
  allTypesGrid: { gap: 10 },
  miniCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  miniCardActive: { borderWidth: 2 },
  miniCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  miniEmoji: { fontSize: 20 },
  miniTitle: { fontSize: 14, fontWeight: '700', color: '#1C1917', flex: 1 },
  youBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#1B4332',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  youBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  miniDesc: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  // Footer
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#1C1917',
    gap: 6,
    marginTop: 16,
  },
  footerLogo: { fontSize: 16, fontWeight: '800', color: '#D4A96A', letterSpacing: -0.3, marginBottom: 4 },
  footerText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});

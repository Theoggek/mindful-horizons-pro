import { Modal, ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { X, Quote } from '@blinkdotnew/mobile-ui';

const isWeb = Platform.OS === 'web';

const rules = [
  'You always have a choice.',
  'Your life is a gift. Treat it as an adventure.',
  'Experience something new every day.',
  'Learn something new every day.',
  'Fear is something you create.',
  'The line between where you are and where you want to be is a thought away.',
  'You create chaos to look busy, feel important, and avoid your emotions.',
  'Remember to thank your deity and to say thank you for everything that comes your way.',
  'Truth only exists in the moment.',
  'Leadership is given, never taken.',
  'Throw something out every day until all that exists is you and God.',
  "Let it go. It was never yours to begin with.",
];

interface TwelveRulesModalProps {
  visible: boolean;
  onClose: () => void;
}

export function TwelveRulesModal({ visible, onClose }: TwelveRulesModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={isWeb}
          >
            <Text style={styles.eyebrow}>PERSONAL PHILOSOPHY</Text>
            <Text style={styles.title}>Henry's Twelve Rules for Life</Text>
            <Text style={styles.subtitle}>
              In 2002, I wrote twelve rules for life. Not to publish — because I needed them.
            </Text>

            <View style={styles.rulesList}>
              {rules.map((rule, i) => (
                <View key={i} style={styles.ruleRow}>
                  <View style={styles.ruleNumberCircle}>
                    <Text style={styles.ruleNumber}>{i + 1}</Text>
                  </View>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>

            <View style={styles.closingCard}>
              <Quote size={18} color="#D4A96A" />
              <Text style={styles.closingText}>
                I didn't invent all of these rules. I watched the men in my life live them.
              </Text>
              <Text style={styles.closingAuthor}>— Henry Mengoli</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13,31,24,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isWeb ? 24 : 0,
  },
  card: {
    backgroundColor: '#FDFCF9',
    borderRadius: isWeb ? 20 : 0,
    width: '100%',
    maxWidth: 640,
    maxHeight: isWeb ? '85%' : '100%',
    height: isWeb ? undefined : '100%',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 32, paddingTop: 48 },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A96A',
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: isWeb ? 30 : 24,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: isWeb ? 38 : 30,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 28,
  },

  rulesList: { gap: 0, marginBottom: 32 },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 14,
  },
  ruleNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  ruleNumber: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  ruleText: { flex: 1, fontSize: 15, color: '#1C1917', lineHeight: 24, fontWeight: '500' },

  closingCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignItems: 'center',
    gap: 12,
  },
  closingText: {
    fontSize: 16,
    color: '#1C1917',
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '500',
  },
  closingAuthor: { fontSize: 14, fontWeight: '700', color: '#1B4332' },
});

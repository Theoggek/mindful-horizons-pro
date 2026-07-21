import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, User, BookOpen, Mail, Hash, HelpCircle } from '@blinkdotnew/mobile-ui';
import { useResponsive } from '@/hooks/useResponsive';

export default function TabLayout() {
  const { isDesktop, isTablet } = useResponsive();
  const hideTabBar = isDesktop || isTablet;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1B4332',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: hideTabBar ? { display: 'none' } : {
          backgroundColor: '#FDFCF9',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        } as any,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="coaching"
        options={{
          title: 'Coaching',
          tabBarIcon: ({ color, size }) => <BookOpen size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => <Mail size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="twelve-rules"
        options={{
          title: '12 Rules',
          tabBarIcon: ({ color, size }) => <Hash size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Find Your Type',
          href: null, // Hidden from tab bar — accessible via navigation links only
        }}
      />
    </Tabs>
  );
}

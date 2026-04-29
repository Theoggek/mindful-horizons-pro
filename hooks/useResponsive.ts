import { useWindowDimensions } from 'react-native';
import { Platform } from 'react-native';
import { breakpoints } from '@/constants/platform';

/**
 * Reactive responsive hook — re-renders on window resize.
 * Use this instead of the static `const isWeb = Platform.OS === 'web'`
 * so layouts update when the browser is resized.
 */
export function useResponsive() {
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  const isDesktop = isWeb && width >= breakpoints.desktop;
  const isTablet = isWeb && width >= breakpoints.tablet && width < breakpoints.desktop;
  const isMobile = !isWeb || width < breakpoints.mobile;

  return { isWeb, isDesktop, isTablet, isMobile, windowWidth: width };
}

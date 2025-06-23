import { Platform } from 'react-native';

/**
 * Returns an object with the appropriate test ID property for each platform
 * - Web: uses 'data-testid' attribute
 * - Native (iOS/Android): uses 'testID' property
 *
 * @param id The test identifier
 * @returns An object containing the test ID with appropriate key for the platform
 */
export const getTestID = (id: string) => {
  return Platform.OS === 'web' ? { 'data-testid': id } : { testID: id };
};

/**
 * Returns an object with appropriate accessibility properties for each platform
 * Useful for accessibility concerns
 *
 * @param label The accessibility label
 * @returns An object with platform-specific accessibility properties
 */
export const getAccessibilityLabel = (label: string) => {
  return Platform.OS === 'web'
    ? { 'aria-label': label }
    : { accessibilityLabel: label };
};

/**
 * Combines both testID and accessibilityLabel in a single function
 *
 * @param id The test identifier
 * @param label The accessibility label (defaults to the same as id)
 * @returns An object containing both test ID and accessibility props
 */
export const getTestProps = (id: string, label?: string) => {
  return {
    // Testing props - both web and native
    'data-testid': id,
    testID: id,

    // Accessibility props - both web and native
    'aria-label': label || id,
    accessibilityLabel: label || id,
  };
};

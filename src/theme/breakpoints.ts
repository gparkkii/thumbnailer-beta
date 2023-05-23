export const breakpoints = {
  lg: 1200,
  md: 960,
  sm: 768,
  xs: 360,
} as const;

/**
 * @description mediaQuery
 * @param lg `1200px`
 * @param md `960px`
 * @param sm `600px`
 * @param xs `360px`
 */
export const mediaQuery = {
  lg: `@media (max-width: ${breakpoints.lg}px)`,
  md: `@media (max-width: ${breakpoints.md}px)`,
  sm: `@media (max-width: ${breakpoints.sm}px)`,
  xs: `@media (max-width: ${breakpoints.xs}px)`,
};

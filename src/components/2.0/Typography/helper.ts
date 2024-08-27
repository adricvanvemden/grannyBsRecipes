/**
 * Generates a fluid typography CSS value using the clamp function.
 *
 * @param {number} minFontSize - The minimum font size in pixels.
 * @param {number} maxFontSize - The maximum font size in pixels.
 * @param {number} minViewportWidth - The minimum viewport width in pixels.
 * @param {number} maxViewportWidth - The maximum viewport width in pixels.
 * @returns {string} The CSS clamp value for fluid typography.
 */
export const fluidTypography = (
  minFontSize: number,
  maxFontSize: number,
  minViewportWidth: number,
  maxViewportWidth: number
) => {
  const slope = (maxFontSize - minFontSize) / (maxViewportWidth - minViewportWidth);
  const base = minFontSize - slope * minViewportWidth;
  return `clamp(${minFontSize}px, ${base}px + ${slope * 100}vw, ${maxFontSize}px)`;
};

/**
 * Rounds a non-negative amount of cents with a fractional part to whole cents.
 * SPEC 3.2: ties round to the even neighbour (banker's rounding).
 */
export function roundCents(x) {
  const floor = Math.floor(x);
  const frac = x - floor;
  if (Math.abs(frac - 0.5) < 1e-9) return floor + 1;
  return Math.round(x);
}

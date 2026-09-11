/**
 * Returns the singular form for a count of one and the plural form otherwise.
 */
export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  return count === 1 ? singular : plural
}

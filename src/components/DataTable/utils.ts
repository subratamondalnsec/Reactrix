export function cmp(a: unknown, b: unknown) {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  const an = Number(a), bn = Number(b)
  if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn
  return String(a).localeCompare(String(b))
}

export function formatApproximateDate(date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  if (month < 4) {
    return `Early ${year}`
  } else if (month < 8) {
    return `Mid ${year}`
  } else {
    return `Late ${year}`
  }
}

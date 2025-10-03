export function formatApproximateDate(date: Date, secondDate?: Date) {
  const month = date.getMonth()
  const year =
    secondDate && secondDate.getFullYear() === date.getFullYear()
      ? undefined
      : date.getFullYear()
  const yearString = year ? ` ${year}` : ''

  if (month < 4) {
    return `Early${yearString}`
  }
  if (month < 8) {
    return `Mid${yearString}`
  }
  return `Late${yearString}`
}

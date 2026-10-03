const arrowPaths: Record<string, string> = {
  '←': 'M19 12H5 M12 19l-7-7 7-7',
  '↓': 'M12 5v14 M5 12l7 7 7-7',
  '↑': 'M12 19V5 M5 12l7-7 7 7',
  '→': 'M5 12h14 M12 5l7 7-7 7',
}

export const getKeyArrowPath = (key: string) => arrowPaths[key]

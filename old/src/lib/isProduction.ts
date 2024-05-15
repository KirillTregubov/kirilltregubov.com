let isProduction = false

if (process && process.env.NODE_ENV === 'production') {
  isProduction = true
}

export { isProduction }

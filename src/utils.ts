export const { random: randomDefault, round, min, max } = Math

export function random(): number { return randomDefault() || random() }
export function randomTo(min: number, max: number): number {
  return round(random() * (max - min) + min)
}

export function assess(total: number, right: number): string {
  let res = ''
  const div = right / total
  
  if (div === 1) res = '5+'
  else if (div > 0.95) res = '5'
  else if (div > 0.9) res = '5-'
  else if (div > 0.85) res = '4+'
  else if (div > 0.8) res = '4'
  else if (div > 0.75) res = '4-'
  else if (div > 0.7) res = '3+'
  else if (div > 0.65) res = '3'
  else if (div > 0.6) res = '3-'
  else if (div > 0.55) res = '2+'
  else if (div > 0.5) res = '2'
  else if (div > 0.45) res = '2-'
  else if (div > 0.4) res = '1+'
  else if (div > 0.35) res = '1'
  else res = '1-'
  
  // console.log(total, right, div, res)
  return res
}

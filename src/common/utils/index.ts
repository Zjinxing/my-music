export const formatSeconds = (val: number): string => {
  const min = ~~(val / 60)
  const sec = ~~(val % 60)
  return `${min}:${sec}`.replace(/\b\d\b/g, '0$&')
}

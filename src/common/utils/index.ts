export const formatSeconds = (val: number): string => {
  const min = ~~(val / 60)
  const sec = ~~(val % 60)
  return `${min}:${sec}`.replace(/\b\d\b/g, '0$&')
}

/**
 * 生成接口所需要的 sign，参考：https://blog.csdn.net/weixin_44159306/article/details/106292092
 */
export const generateSign = (data: any) => {
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let count = Math.floor(Math.random() * 7 + 10)
  let sign = 'zza'
  for (let i = 0; i < count; i++) {
    sign += str[Math.floor(Math.random() * 36)]
  }
  // eslint-disable-next-line
  sign += (<any>window).__sign_hash_20200305('CJBPACrRuNy7' + JSON.stringify(data))
  return sign
}

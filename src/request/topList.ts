import { uInstance } from './instance'
import { Toplist } from './types/Toplist'

const data = {
  req_0: { module: 'musicToplist.ToplistInfoServer', method: 'GetAll', param: {} },
  comm: { g_tk: 5381, uin: 0, format: 'json', ct: 6, cv: 0, platform: 'wk_v17' },
}

export const getToplist = async (): Promise<Toplist> =>
  uInstance.post('cgi-bin/musics.fcg', data, {
    params: {
      _: Date.now(),
      sign: 'zzasxf8l6vji0e531590f65408e5b254e937535ec63a7',
    },
  })

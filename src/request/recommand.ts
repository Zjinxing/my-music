import { uInstance } from './instance'
import Recommend from './types/Recommend'
import { NewAlbum } from './types/Album'

const data = {
  req_0: {
    module: 'MvService.MvInfoProServer',
    method: 'GetNewMv',
    param: { style: 0, tag: 0, start: 0, size: 8 },
  },
  req_1: { module: 'music.musicHall.MusicHallPlatform', method: 'GetFocus', param: {} },
  req_2: {
    module: 'playlist.HotRecommendServer',
    method: 'get_new_hot_recommend',
    param: { cmd: 0, page: 0, daily_page: 0, size: 12 },
  },
  req_3: { module: 'newsong.NewSongServer', method: 'get_new_song_info', param: { type: 5 } },
  comm: { g_tk: 5381, uin: 0, format: 'json', ct: 6, cv: 0, platform: 'wk_v17' },
}

export const GET_RECOMMEND = (): Promise<Recommend> =>
  uInstance.post('cgi-bin/musics.fcg', data, {
    params: { _: Date.now(), sign: 'zzayp976bs1zyqz5dau302e43c3499a2e80149d2c3e8b07427c' },
  })

export enum Area {
  '内地' = 1,
  '欧美' = 2,
  '日本' = 3,
  '韩国' = 4,
  '最新' = 5,
  '港台' = 6,
}
/**
 * 获取不同地区新专辑
 * @param area 地区代码
 */
export const GET_NEW_LIST = (area: number = Area['最新']): Promise<NewAlbum> => {
  // 不同参数sign不同，暂时不知道怎么获取的
  const sign: { [key: string]: string } = {
    内地: 'zzaj7eie53rqfidc78a477f842033aa636da25d520ab67',
    欧美: 'zzav07pfe66a3pof0cvadad878d3da9f8c4a40b206041d88da9',
    日本: 'zzan67qk44zkfd14af5ab9423c29e9dfccb324859bab45b2',
    韩国: 'zzaan9mjptseq8uadd56eb7022beed1aa33fd2331ec33b89',
    最新: 'zzaia1v8guk505iu9328902d319eb51156c5d99c8c2f3fa8',
    港台: 'zzad3nakb9pno970d31e6e0d326e29342cc9403cbb03c',
  }
  const url = `https://u.y.qq.com/cgi-bin/musics.fcg?-=recom05206536573689857&g_tk=5381&sign=${
    sign[Area[area]]
  }&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"comm":{"ct":24},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":${area}}}}`
  return uInstance.get(url)
}

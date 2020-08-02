import { SongDetailCommon } from './Playlist'

export interface Lan {
  lan: string
  name: string
  tjreport: string
  type: number
}

interface NewSongSinger {
  id: number
  mid: string
  name: string
  title: string
  type: number
  uin: number
}

interface NewSongAlbum {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  pmid: string
  time_public: string
}

export interface NewSongDetail extends SongDetailCommon {
  singer: NewSongSinger[]
  album: NewSongAlbum
}

export interface NewSongData {
  lan: string
  lanlist: Lan[]
  ret_msg: string
  songlist: NewSongDetail[]
  type: number
}
export interface NewSong {
  code: number
  data: NewSongData
}

interface Company {
  ex: {
    company_photo: number
    desc: string
  }
  id: number
  name: string
}

export interface AlbumSinger {
  area: number
  birthday: string
  company: Company
  ex: {
    desc: string
    ex_identity: number
    ex_status: number
    info_name: string
    name_spell: string
    tag: string
    wiki: string
  }
  foreign_name: string
  genre: number
  grade: number
  id: number
  identity: number
  instrument: number
  mid: string
  name: string
  opt_grade: number
  opt_grade_new: number
  origin: number
  photo: {
    big_photo_flag: string
    has_photo: number
    magic_rgb: number
    photo_cnt: number
    pic1_flag: number
    pic2_flag: number
    pic_mid: string
  }
  status: number
  type: number
}

export interface AlbumDetail {
  area: number
  company: Company
  companyshow: Company
  ex: {
    album_tag3: number
    album_tag5: string
    desc: string
    playable_track_num: number
    singer_tag: string
    track_nums: number
  }
  ex_status: number
  genre: number
  id: number
  index: string
  language: number
  mid: string
  modify_time: string
  movie: string
  name: string
  pay: {
    payment_album_type: number
    payment_beg: string
    payment_discount: number
    payment_discount_beg: number
    payment_discount_end: number
    payment_end: string
    payment_total: number
    pre_sale_beg: string
  }
  photo: {
    gaus_pic: string
    has_photo: number
    pay_flag: number
    pic_mid: string
    version: number
    vip_flag: number
  }
  release_time: string
  show_cow_new: number
  singers: AlbumSinger[]
  status: number
  tag: string
  tmetags: string
  trans_name: string
  type: number
}

export interface AlbumTag {
  id: number
  name: string
  tjreport: string
}

/**
 * 首页推荐视频内歌手 interface
 */
interface VideoSinger {
  id: number
  mid: string
  name: string
  picurl: string
}

/**
 * 首页推荐视频数据 interface
 */
export interface VideoData {
  comment_cnt: number
  diff: number
  duration: number
  has_fav: number
  has_star: number
  mv_switch: number
  mvid: number
  picurl: string
  playcnt: number
  pubdate: number
  score: number
  singers: VideoSinger[]
  star_cnt: number
  subtitle: string
  title: string
  uploader: { enc_uin: string; headurl: string; nick: string }
  vid: string
}

/**
 * 首页焦点图具体内容
 */
export interface V_card {
  type: number
  subtype: number
  jumptype: number
  id: string
  subid: string
  title: string
  subtitle: string
  cover: string
  cnt: number
  time: number
  v_user: null
  tjreport: string
  trace: string
  abt: string
  miscellany: { CfgID: string }
  pingpong: string
  extra_info: null
  scheme: string
  style: number
}

/**
 * 首页推荐焦点图
 */
interface V_niche {
  id: number
  title_template: string
  title_content: string
  style: number
  more: {
    jumptype: number
    id: string
    tjreport: string
    trace: string
    abt: string
    pingpong: string
    extra_info: null
    scheme: string
    title: string
  }
  v_card: V_card[]
  bgpic: string
  tjreport: string
  trace: string
  abt: string
  miscellany: null
  pingpong: string
  extra_info: null
}

/**
 * 官方歌单 modules 内部 grids interface
 */
export interface Grid {
  abt: string
  author: string
  badgeurl: string
  clickurl: string
  creator: {
    avatar: string
    badge: string
    identity: number
    nick: string
    uin: string
  }
  exposeurl: string
  id: number
  jmpurl: string
  listeners: number
  magic: string
  picurl: string
  rcmdcontent: string
  rcmdtemplate: string
  readtime: number
  recomm_type: number
  source: number
  source_type: number
  subtitle: string
  title: string
  tjreport: string
  type: number
  updatetime: number
  vid: string
  view_type: number
}
/**
 * 首页官方歌单 modules interface
 */
export interface Module {
  color: string
  display_format: number
  grids: Grid[]
  more: {
    jmpurl: string
    title: string
    tjreport: string
    type: number
  }
  name: string
  title: string
}

interface Album1 {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  pmid: string
  time_public: string
}

interface SingerHome {
  id: number
  mid: string
  name: string
  title: string
  type: number
  uin: number
}

/**
 * 首页最新发行歌曲 interface
 */
export interface SongHome {
  action: {
    alert: number
    icons: number
    msgdown: number
    msgfav: number
    msgid: number
    msgpay: number
    msgshare: number
    switch: number
  }
  aid: number
  album: Album1
  bpm: number
  data_type: number
  es: string
  file: {
    b_30s: number
    e_30s: number
    hires_bitdepth: number
    hires_sample: number
    media_mid: string
    size_128mp3: number
    size_192aac: number
    size_192ogg: number
    size_24aac: number
    size_320mp3: number
    size_48aac: number
    size_96aac: number
    size_96ogg: number
    size_ape: number
    size_dts: number
    size_flac: number
    size_hires: number
    size_try: number
    try_begin: number
    try_end: number
    url: string
  }
  fnote: number
  genre: number
  id: number
  index_album: number
  index_cd: number
  interval: number
  isonly: number
  ksong: { id: number; mid: string }
  label: '0'
  language: number
  mid: string
  modify_stamp: number
  mv: { id: number; name: string; title: string; vid: string; vt: number }
  name: string
  ov: number
  pay: {
    pay_down: number
    pay_month: number
    pay_play: number
    pay_status: number
    price_album: number
    price_track: number
    time_free: number
  }
  pingpong: string
  ppurl: string
  sa: number
  singer: SingerHome[]
  status: number
  subtitle: string
  tid: number
  time_public: string
  title: string
  trace: string
  type: number
  url: string
  version: number
  volume: { gain: number; lra: number; peak: number }
}

/**
 * 首页数据
 */
export default interface Recommend {
  code: number
  //推荐视频
  req_0: {
    code: number
    data: {
      list: VideoData[]
      total: number
    }
  }
  // 焦点图
  req_1: {
    code: number
    data: {
      shelf: {
        id: number
        title_template: string
        title_content: string
        style: number
        more: {
          jumptype: number
          id: string
          tjreport: string
          trace: string
          abt: string
          pingpong: string
          extra_info: null
          scheme: string
          title: string
        }
        feedback_opt: number
        v_niche: V_niche[]
        expire: number
        tjreport: string
        trace: string
        abt: string
        miscellany: null
        pingpong: string
        extra_info: null
        replaceOpt: number
        group: number
        group_top: number
      }
    }
  }
  // 官方歌单和达人歌单 modules[0] 官方歌单 modules[1] 达人歌单
  req_2: {
    code: number
    data: {
      color: string
      grids: []
      id: number
      intervalInSeconds: number
      modules: Module[]
      more: { jmpurl: string; title: string; tjreport: string; type: number }
      name: string
      re_page: number
      title: string
    }
  }
  // 首页最新发行
  req_3: {
    code: number
    data: {
      lan: string
      lanlist: { lan: string; name: string; tjreport: string; type: number }[]
      ret_msg: string
      songlist: SongHome[]
      type: number
    }
  }
  start_ts: number
  ts: number
}

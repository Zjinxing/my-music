import { SongHome } from './Recommend'

export interface SongDetailCommon {
  id: number
  type: number
  songtype: number
  mid: string
  name: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: string
  mv: {
    id: number
    vid: string
  }
  ksong: {
    id: number
    mid: string
  }
  file: {
    media_mid: string
    size_try: number
    b_30s: number
    e_30s: number
    try_begin: number
    try_end: number
    size_24aac: number
    size_48aac: number
    size_96aac: number
    size_192aac: number
    size_192ogg: number
    size_128mp3: number
    size_320mp3: number
    size_aac: number
    size_ogg: number
    size_128: number
    size_320: number
    size_ape: number
    size_flac: number
    size_dts: number
  }
  volume: {
    gain: number
    peak: number
    lra: number
  }
  pay: {
    pay_month: number
    price_track: number
    price_album: number
    pay_play: number
    pay_down: number
    pay_status: number
    time_free: number
  }
  action: {
    switch: number
    msgid: number
    msgpay: number
    alert: number
    icons: number
  }
}

export interface PlaylistSong {
  id: number
  type: number
  songtype: number
  mid: string
  name: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: string
  tid: number
  sa: number
  ov: number
  singer: { id: number; mid: string; name: string; title: string }[]
  album: {
    id: number
    mid: string
    pmid: string
    name: string
    title: string
    subtitle: string
  }
  mv: {
    id: number
    vid: string
  }
  ksong: {
    id: number
    mid: string
  }
  file: {
    media_mid: string
    size_try: number
    b_30s: number
    e_30s: number
    try_begin: number
    try_end: number
    size_24aac: number
    size_48aac: number
    size_96aac: number
    size_192aac: number
    size_192ogg: number
    size_128mp3: number
    size_320mp3: number
    size_aac: number
    size_ogg: number
    size_128: number
    size_320: number
    size_ape: number
    size_flac: number
    size_dts: number
  }
  volume: {
    gain: number
    peak: number
    lra: number
  }
  pay: {
    pay_month: number
    price_track: number
    price_album: number
    pay_play: number
    pay_down: number
    pay_status: number
    time_free: number
  }
  action: {
    switch: number
    msgid: number
    msgpay: number
    alert: number
    icons: number
  }
}

export interface Cdlist {
  disstid: string
  dir_show: number
  owndir: number
  dirid: number
  coveradurl: string
  dissid: number
  login: string
  uin: string
  encrypt_uin: string
  dissname: string
  logo: string
  pic_mid: string
  album_pic_mid: string
  pic_dpi: number
  isAd: number
  desc: string
  ctime: number
  mtime: number
  headurl: string
  ifpicurl: string
  nick: string
  nickname: string
  type: number
  singerid: number
  singermid: string
  isvip: number
  isdj: number
  tags: { id: number; name: string; pid: number }[]
  songnum: number
  songids: string
  songtypes: string
  disstype: number
  dir_pic_url2: string
  song_update_time: number
  song_update_num: number
  total_song_num: number
  song_begin: number
  cur_song_num: number
  songlist: PlaylistSong[]
  realcdnum: number
}

export interface Playlist {
  response: {
    code: number
    subcode: number
    accessed_plaza_cache: number
    accessed_favbase: number
    login: string
    cdnum: number
    cdlist: Cdlist[]
    realcdnum: number
  }
}

/* 排行榜 begin */
export interface GetPlaylistDetail {
  code: number
  req_0: {
    code: number
    data: {
      accessed_byfav: number
      accessed_plaza_cache: number
      adTitle: string
      adUrl: string
      ad_list: []
      cmtURL_bykey: { url_key: string; url_params: string }
      code: number
      ct: number
      cv: number
      dirinfo: {
        ai_uin: number
        creator: {
          ai_uin: number
          encrypt_ai_uin: string
          encrypt_uin: string
          headurl: string
          ifpicurl: string
          isVip: number
          musicid: number
          nick: string
          singerid: number
          type: number
        }
        ctime: number
        desc: string
        dir_show: number
        dirid: number
        dirtype: number
        disstype: number
        dv2: number
        edge_mark: string
        encrypt_ai_uin: string
        encrypt_uin: string
        headurl: string
        host_nick: string
        host_uin: number
        id: number
        listennum: number
        mtime: number
        ordernum: number
        ordertime: number
        owndir: number
        picid: number
        picmid: string
        picurl: string
        picurl2: string
        show: number
        song_update_num: number
        song_update_time: number
        songnum: number
        status: number
        tag: { id: number; name: string }[]
        title: string
        vec_tagid: number[]
        vec_tagname: []
      }
      encrypt_login: string
      filter_song_num: number
      filtered_song: []
      from_gedan_plaza: number
      invalid_song: []
      ip: string
      isAd: number
      login_uin: number
      msg: string
      namedflag: number
      optype: number
      orderlist: []
      referer: string
      songlist: SongHome[]
      songlist_size: number
      srf_ip: string
      subcode: number
      total_song_num: number
    }
  }
  start_ts: number
  ts: number
}
/* 排行榜 end */

export interface Vplaylist {
  access_num: number
  album_pic_mid: string
  censor_remark: []
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: number
  creator_info: {
    avatar: string
    is_dj: number
    nick: string
    taoge_avatar: string
    taoge_nick: string
    uin: number
    vip_type: number
  }
  creator_uin: number
  desc: string
  dirid: number
  fav_num: number
  modify_time: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  score: number
  song_ids: number[]
  song_types: number[]
  tag_ids: number[]
  tag_names: []
  tid: number
  title: string
  tjreport: string
}

export interface Vitem {
  cover: string
  id: number
  name: string
  tjreport: string
  type: number
}

export interface GetPlaylistByTab {
  code: number
  ts: number
  start_ts: number
  req_0: {
    code: number
    data: {
      total: number
      v_playlist: Vplaylist[]
    }
  }
  req_1: {
    code: number
    data: {
      retcode: number
      v_item: Vitem[]
    }
  }
}

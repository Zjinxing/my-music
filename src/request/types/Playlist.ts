export interface PlaylistItem {
  access_num: number
  album_pic_mid: string
  censor_remark: Array<any>
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: string
  creator_info: {
    avatar: string
    is_dj: number
    nick_name: string
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
  tag_names: string[]
  tid: number
  title: string
  tjreport: string
}

export interface Playlist {
  code: number
  ts: number
  playlist: {
    data: {
      total: number
      v_playlist: Array<PlaylistItem>
    }
    code: number
  }
}

export interface Singer {
  id: number
  mid: string
  name: string
  title: string
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
}

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

export interface SongDetail extends SongDetailCommon {
  singer: Singer[]
  album: Album
}

export interface ListContent {
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
  songlist: SongDetail[]
  visitnum: number
  cmtnum: number
  buynum: number
  scoreavage: string
  scoreusercount: number
}

export interface SonglistDetail {
  response: {
    code: number
    subcode: number
    accessed_plaza_cache: number
    accessed_favbase: number
    login: string
    cdnumber: number
    cdlist: ListContent[]
    realcdnum: number
  }
}

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
    id: 0
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
    realcdnum: 1
  }
}

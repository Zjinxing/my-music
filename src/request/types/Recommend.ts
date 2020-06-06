import { Singer, Album, SongDetailCommon } from './Playlist'

export interface FocusContent {
  cover: string
  id: number
  jump_info: {
    id: number
    mid: string
    url: string
  }
  pic_info: {
    mid: string
    url: string
    urlex1: string
    urlex2: string
  }
  report: string
  title: string
  type: number
}

// 达人歌单列表
export interface HotPlaylistItem {
  album_pic_mid: string
  content_id: number
  cover: string
  creator: number
  edge_mark: string
  id: number
  is_dj: boolean
  is_vip: boolean
  jump_url: string
  listen_num: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  rcmdtype: number
  title: string
  tjreport: string
  type: number
  username: string
}

export interface Lan {
  lan: string
  name: string
  tjreport: string
  type: number
}

interface NewSongSinger extends Singer {
  type: number
  uin: number
}

interface NewSongAlbum extends Album {
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
    album_tag3: 0
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
export default interface Recommend {
  category: any
  focus: {
    code: number
    data: {
      content: Array<FocusContent>
      id: number
      sub_cube: []
      title: string
    }
  }
  new_album: {
    code: number
    data: {
      total: number
      ret_msg: string
      albums: AlbumDetail[]
    }
  }
  new_album_tag: {
    code: number
    data: {
      area: AlbumTag[]
    }
  }
  new_song: NewSong
  playlist: any
  recomPlaylist: {
    code: number
    data: {
      page: number
      v_hot: HotPlaylistItem[]
    }
  }
  toplist: any
  code: number
  ts: number
}

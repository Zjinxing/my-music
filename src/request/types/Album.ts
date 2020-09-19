import { SongHome } from './Recommend'
import SingerAlbum from 'components/Container/Music/components/SingerSong/components/Album'

export interface SingerBase {
  id: number
  mid: string
  name: string
}

export interface AlbumSongDetail {
  albumdesc: string
  albumid: number
  albummid: string
  albumname: string
  alertid: number
  belongCD: number
  cdInx: number
  interval: number
  isonly: number
  label: string
  msgid: number
  pay: {
    payalbum: number
    payalbumprice: number
    paydownload: number
    payinfo: number
    payplay: number
    paytrackmouth: number
    paytrackprice: number
    timefree: number
  }
  preview: {
    trybegin: number
    tryend: number
    trysize: number
  }
  rate: number
  singer: SingerBase[]
  size128: number
  size320: number
  size5_1: number
  sizeape: number
  sizeflac: number
  sizeogg: number
  songid: number
  songmid: string
  songname: string
  songorig: string
  songtype: number
  strMediaMid: string
  stream: number
  switch: number
  type: number
  vid: string
}

export interface NewAlbum {
  code: number
  ts: number
  start_ts: number
  new_song: {
    code: number
    data: {
      lan: string
      lanlist: {
        lan: string
        name: string
        tjreport: string
        type: number
      }[]
      ret_msg: string
      songlist: SongHome[]
      type: number
    }
  }
}

export interface SingerAlbum {
  Fattribute_5: string
  Ftype: string
  albumID: string
  albumMID: string
  albumName: string
  albumtype: string
  company: string
  desc: string
  lan: string
  latest_song: {
    song_count: number
    songid: number
    track_name: string
  }
  listen_count: string
  pubTime: string
  score: string
  shoufa: number
  singerID: string
  singerMID: string
  singerName: string
  singers: { singer_id: string; singer_mid: string; singer_name: string }[]
  type: number
}

export interface SingerAlbumList {
  code: number
  data: {
    list: SingerAlbum[]
    singer_id: number
    singer_mid: string
    singer_name: string
    total: number
  }
  message: string
  subcode: number
}

/* start new interface */

export interface AlbumInfo {
  albumID: number
  albumMid: string
  albumName: string
  albumTranName: string
  pmid: string
  publishDate: string
  singerName: string
}

export interface AlbumSinger {
  instrument: string
  mid: string
  name: string
  pmid: string
  role: string
  singerID: number
  singerType: number
  transName: string
  type: number
}

export interface AlbumSong {
  listenCount: number
  songInfo: SongHome
  uploadTime: string
}
export interface GetAlbumDetail {
  code: number
  req_0: {
    code: number
    data: {
      title: string
      albumList: AlbumInfo[]
    }
  }
  req_1: {
    code: number
    data: {
      basicInfo: {
        albumID: number
        albumMid: string
        albumName: string
        albumTag3: number
        albumType: string
        color: number
        desc: string
        genre: string
        genreURL: string
        lanURL: string
        language: string
        modifyTime: number
        pmid: string
        publishDate: string
        recordNum: string
        tranName: string
        type: number
      }
      company: {
        ID: number
        brief: string
        headPic: string
        isShow: number
        name: string
      }
      singer: {
        singerList: AlbumSinger[]
      }
    }
  }
  req_2: {
    code: number
    data: {
      albumMid: string
      albumTips: string
      classicList: []
      songList: AlbumSong[]
      sort: number
      totalNum: number
    }
  }
  req_3: {
    code: number
    [key: string]: any
  }
  req_4: {
    code: number
    data: {
      albumShelf: string
      banner: {
        title: string
        buyPage: string
        buytips: string
        buyurl: string
        id: number
        price: number
        buyJumpType: number
        type: number
        urlKey: string
      }
      bannerTitle: string
      bannerType: number
      buy: number
      buyTips: string
      buypage: string
      buyurl: string
      cdCnt: number
      certificateFrame: number
      certificateJumpURL: string
      certificateLevelURL: string
      orderid: number
      ordertype: number
      price: number
    }
  }
}

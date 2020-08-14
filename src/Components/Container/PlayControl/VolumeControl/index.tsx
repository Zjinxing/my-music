import React, { useState, useRef } from 'react'
import Progress, { TargetInfo, MousePos } from 'components/Common/Progress'
import './index.scss'

interface Props {
  onVolumeChange: (volumePercent: number) => void
}

// TODO: 缓存音量
const VolumeControl: React.FC<Props> = props => {
  const [volumePercent, setVolumePercent] = useState<number>(100)
  const [bounce, setBounce] = useState('')
  const [fade, setFade] = useState('')
  const volumeEl = useRef<HTMLDivElement>(null)

  const onvolumechange = (targetInfo: TargetInfo, pos: MousePos) => {
    const { top, height } = targetInfo
    const { pageY } = pos
    const compute = (1 - (pageY - top) / height) * 100
    const volumePercent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
    setVolumePercent(volumePercent)
    props.onVolumeChange(volumePercent)
  }

  const showVolume = () => {
    console.log({ bounce })
    if (!bounce) {
      console.log('test')
      setBounce('show-volume')
      document.addEventListener('click', hideVolume)
    }
  }

  const hideVolume = (e: MouseEvent) => {
    const path = e.composedPath()
    console.log('hide')
    if (volumeEl.current && !path.includes(volumeEl.current)) {
      document.removeEventListener('click', hideVolume)
      setFade('volume-fade')
      setTimeout(() => {
        setFade('')
        setBounce('')
      }, 200)
    }
  }

  return (
    <div className="volume-control">
      <div ref={volumeEl} className={`volume-control-bar ${bounce} ${fade}`}>
        <Progress onProgressChange={onvolumechange} width={volumePercent} />
      </div>
      <span className="volume-icon" style={{ overflow: 'hidden' }} onClick={showVolume}>
        <img src={require('common/Enum').imgList.volume} alt="" />
      </span>
    </div>
  )
}

export default VolumeControl

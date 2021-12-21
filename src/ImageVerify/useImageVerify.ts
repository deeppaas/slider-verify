import React from 'react'
import { calcMoveLeft, divide, loadImage } from '../utils'
import {
  ImageVerifyHooksProps,
  SliderStyle,
  VerifyType,
} from './ImageVerifyType'

const INIT_VERIFY: VerifyType = {
  type: 'slider',
  result: undefined,
  message: undefined,
}

function useImageVerify({
  width,
  sliderImage,
  backgroundImage,
  pointY,
  onMoveEnd,
  onRefresh,
}: ImageVerifyHooksProps) {
  const sliderBtnRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const [ratio, setRatio] = React.useState<number>()
  const [sliderStyle, setSliderStyle] = React.useState<SliderStyle>()
  const [sliderLeft, setSliderLeft] = React.useState(0)

  const [verify, setVerify] = React.useState<VerifyType>(INIT_VERIFY)

  React.useEffect(() => {
    // 同一批图片，应该比例是相同的
    if (backgroundImage && !ratio) {
      loadImage(backgroundImage).then(image =>
        setRatio(divide(image.width, width))
      )
    }
  }, [backgroundImage, ratio, width])

  React.useEffect(() => {
    if (backgroundImage) {
      setVerify(INIT_VERIFY)
      setSliderLeft(0)
      // 重置top，保留width/heigth
      setSliderStyle(p => ({ ...p, top: 0 }))
    }
  }, [backgroundImage])

  React.useEffect(() => {
    if (ratio && sliderImage) {
      loadImage(sliderImage).then(image => {
        setSliderStyle({
          width: divide(image.width, ratio),
          height: divide(image.height, ratio),
          top: divide(pointY, ratio),
        })
      })
    }
  }, [pointY, ratio, sliderImage])

  const sliderBtnLeft = React.useMemo(() => {
    const sliderBtn = sliderBtnRef.current
    if (!sliderStyle?.width || !sliderBtn) return 0
    const sliderImageWidth = sliderStyle.width as number
    return (sliderImageWidth - sliderBtn.offsetWidth) / 2 + sliderLeft
  }, [sliderBtnRef, sliderLeft, sliderStyle?.width])

  function sliderEnd(moveLeft: number) {
    if (ratio) {
      setVerify({ type: 'verifying', result: undefined, message: undefined })
      onMoveEnd({ left: moveLeft, ratio }, ({ result, message }) => {
        setVerify({ type: 'end', result, message })
        if (result === 'error') {
          onRefresh()
        } else {
          setVerify(INIT_VERIFY)
          setSliderLeft(0)
        }
      })
    }
  }

  function onMouseDown(downEvent: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (verify.type !== 'slider') return
    const contentDom = contentRef.current
    const sliderBtn = sliderBtnRef.current
    if (!sliderBtn || !contentDom) return
    const { x: sliderBtnX, width: sliderBtnWidth } =
      sliderBtn.getBoundingClientRect()
    const excursion = downEvent.clientX - sliderBtnX
    let moveLeft = sliderLeft
    document.onmousemove = (moveEvent: MouseEvent) => {
      const { clientX } = moveEvent
      moveLeft = calcMoveLeft({
        clientX,
        sliderWidth: sliderStyle?.width || 0,
        excursion,
        contentDom,
        sliderBtnWidth,
      })
      setSliderLeft(moveLeft)
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        sliderEnd(moveLeft)
      }
    }
  }

  function onTouchStart(startEvent: React.TouchEvent<HTMLElement>) {
    if (verify.type !== 'slider') return
    const contentDom = contentRef.current
    const sliderDom = sliderBtnRef.current
    if (!contentDom || !sliderDom) return
    const { x: sliderBtnX, width: sliderBtnWidth } =
      sliderDom.getBoundingClientRect()
    const excursion = startEvent.touches[0].clientX - sliderBtnX
    let moveLeft = sliderLeft
    document.ontouchmove = (moveEvent: TouchEvent) => {
      const { clientX } = moveEvent.touches[0]
      moveLeft = calcMoveLeft({
        clientX,
        sliderWidth: sliderStyle?.width || 0,
        excursion,
        contentDom,
        sliderBtnWidth,
      })
      setSliderLeft(moveLeft)
      document.ontouchend = () => {
        document.ontouchmove = null
        document.ontouchend = null
        sliderEnd(moveLeft)
      }
    }
  }

  return {
    ratio,
    sliderStyle,
    sliderLeft,
    sliderBtnRef,
    contentRef,
    onMouseDown,
    onTouchStart,
    sliderBtnLeft,
    verify,
  }
}

export default useImageVerify

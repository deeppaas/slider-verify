import React from 'react'
import { calcMoveLeft, divide, loadImage } from '../utils'
import { ImageVerifyHooksProps } from './ImageVerifyType'

interface SliderStyle extends Omit<React.CSSProperties, 'width' | 'height'> {
  width?: number
  height?: number
}

function useImageVerify({
  width,
  sliderImage,
  backgroundImage,
  pointY,
}: ImageVerifyHooksProps) {
  const sliderBtnRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const [ratio, setRatio] = React.useState<number>()
  const [sliderStyle, setSliderStyle] = React.useState<SliderStyle>()
  const [sliderLeft, setSliderLeft] = React.useState(0)

  React.useEffect(() => {
    if (backgroundImage) {
      loadImage(backgroundImage).then(image =>
        setRatio(divide(image.width, width))
      )
    }
  }, [backgroundImage, width])

  React.useEffect(() => {
    if (ratio) {
      loadImage(sliderImage).then(image => {
        setSliderStyle({
          width: divide(image.width, ratio),
          height: divide(image.height, ratio),
          top: divide(pointY, ratio),
        })
        setSliderLeft(0)
      })
    }
  }, [pointY, ratio, sliderImage])

  const sliderBtnLeft = React.useMemo(() => {
    const sliderBtn = sliderBtnRef.current
    if (!sliderStyle?.width || !sliderBtn) return 0
    const sliderImageWidth = sliderStyle.width as number
    return (sliderImageWidth - sliderBtn.offsetWidth) / 2 + sliderLeft
  }, [sliderBtnRef, sliderLeft, sliderStyle?.width])

  function onMouseDown(
    downEvent: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
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
        setSliderLeft(0)
      }
    }
  }

  function onTouchStart(startEvent: React.TouchEvent<HTMLSpanElement>) {
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
        setSliderLeft(0)
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
  }
}

export default useImageVerify

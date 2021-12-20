export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject()
      throw new Error('image error')
    }
    image.src = src
    image.crossOrigin = 'anonymous'
  })
}

export function divide(prev: number, next: number, fixed: number = 2) {
  const value = (prev * 1000) / (next * 1000)
  if (fixed) {
    return Number(value.toFixed(fixed))
  }
  return value
}

export function calcMoveLeft({
  clientX,
  sliderWidth,
  excursion,
  sliderBtnWidth,
  contentDom,
}: {
  clientX: number
  sliderWidth: number
  excursion: number
  sliderBtnWidth: number
  contentDom: HTMLElement
}) {
  const { x: domX, width: domWidth } = contentDom.getBoundingClientRect()
  let moveLeft =
    clientX - excursion + sliderBtnWidth / 2 - sliderWidth / 2 - domX
  if (moveLeft < 0) {
    moveLeft = 0
  } else if (moveLeft > domWidth - sliderWidth) {
    moveLeft = domWidth - sliderWidth
  }

  return moveLeft
}

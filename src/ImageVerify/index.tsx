// lib
import React from 'react'
import Icons from '../components/Icons'

// components

import './ImageVerify.scss'
import { ImageVerifyProps } from './ImageVerifyType'
import useImageVerify from './useImageVerify'

const CLASS_PREFIX = 'image-slider'

export default function ImageVerify({
  width,
  height,
  backgroundImage,
  sliderImage,
  pointY,
}: ImageVerifyProps) {
  const {
    sliderStyle,
    sliderLeft,
    sliderBtnRef,
    contentRef,
    onMouseDown,
    onTouchStart,
    sliderBtnLeft,
  } = useImageVerify({
    width,
    height,
    backgroundImage,
    sliderImage,
    pointY,
  })

  return (
    <div className={CLASS_PREFIX}>
      <div
        ref={contentRef}
        className={`${CLASS_PREFIX}-content`}
        style={{ height, width }}
      >
        <img
          className={`${CLASS_PREFIX}-slider-image`}
          src={sliderImage}
          style={{ ...sliderStyle, left: sliderLeft }}
          alt=""
        />
        <img
          className={`${CLASS_PREFIX}-background-image`}
          src={backgroundImage}
          alt=""
        />
      </div>
      <div className={`${CLASS_PREFIX}-line`}>
        <div
          style={{ left: sliderBtnLeft }}
          ref={sliderBtnRef}
          className={`${CLASS_PREFIX}-slider-btn`}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {Icons.star()}
        </div>
      </div>
    </div>
  )
}

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
  onMoveEnd,
  onRefresh,
}: ImageVerifyProps) {
  const {
    verify,
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
    onMoveEnd,
    onRefresh,
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
        <button
          onClick={onRefresh}
          type="button"
          className={`${CLASS_PREFIX}-refresh-btn`}
        >
          refresh
        </button>
      </div>
      <div className={`${CLASS_PREFIX}-line`}>
        <div
          style={{ width: sliderBtnLeft }}
          className={`${CLASS_PREFIX}-line-active`}
        />
        <button
          disabled={verify.type !== 'slider'}
          type="button"
          style={{ left: sliderBtnLeft }}
          ref={sliderBtnRef}
          className={`${CLASS_PREFIX}-slider-btn`}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {verify.type === 'verifying' ? Icons.loading() : Icons.star()}
        </button>
      </div>
    </div>
  )
}

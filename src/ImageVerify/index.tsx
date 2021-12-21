// lib
import classnames from 'classnames'
import React from 'react'
import Icons from '../components/Icons'

// components

import './ImageVerify.scss'
import { ImageVerifyProps } from './ImageVerifyType'
import useImageVerify from './useImageVerify'

const CLASS_PREFIX = 'image-slider'

const MOVE_CLASS = `${CLASS_PREFIX}-result-message-move`

export default function ImageVerify({
  width,
  height,
  backgroundImage,
  sliderImage,
  pointY,
  onMoveEnd,
  onRefresh,
  sliderTips = '向右滑动滑块填充拼图',
}: ImageVerifyProps) {
  const resultMessageRef = React.useRef<HTMLDivElement>(null)
  const {
    verify,
    sliderStyle,
    sliderLeft,
    sliderBtnRef,
    contentRef,
    onMouseDown,
    onTouchStart,
    sliderBtnLeft,
    reset,
  } = useImageVerify({
    width,
    height,
    backgroundImage,
    sliderImage,
    pointY,
    onMoveEnd,
    onRefresh,
  })

  React.useEffect(() => {
    const resultMessageDom = resultMessageRef.current
    // 校验结果出来之后 给弹框加动画
    if (verify.type === 'end' && resultMessageDom) {
      resultMessageDom.classList.add(MOVE_CLASS)
    }
  }, [verify.result, verify.type])

  React.useEffect(() => {
    const resultMessageDom = resultMessageRef.current
    if (resultMessageDom) {
      resultMessageDom.onanimationend = () => {
        resultMessageDom.classList.remove(MOVE_CLASS)
        if (verify.type === 'end') {
          if (verify.result === 'error') {
            onRefresh()
          } else {
            reset()
          }
        }
      }
    }
  }, [onRefresh, reset, verify.result, verify.type])

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
        <div
          ref={resultMessageRef}
          className={classnames(`${CLASS_PREFIX}-result-message`, {
            [`${CLASS_PREFIX}-result-message-success`]:
              verify.result === 'success',
            [`${CLASS_PREFIX}-result-message-error`]: verify.result === 'error',
          })}
        >
          {verify.message}
        </div>
      </div>
      <div className={`${CLASS_PREFIX}-line`}>
        <div
          style={{ width: sliderBtnLeft }}
          className={`${CLASS_PREFIX}-line-active`}
        />
        <div className={`${CLASS_PREFIX}-line-label`}>{sliderTips}</div>
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

import React, { useEffect, useCallback } from 'react'
import { dispatcher } from '../dispatcher'
import { videoPlayer } from '../videoPlayer'
import { ICreateEffect, IDepsEffect } from '../interface'

export function useAbortEffect(create: ICreateEffect, deps: IDepsEffect | never[]) {
  const callback = useCallback(() => {
    return create()
  }, [create])

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps })
  }, [callback, deps])

  const listenerProps = {
    type: 'abort',
    listener: registerListener
  }

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps)
    return () => {
      videoPlayer.removeEventListener(listenerProps)
    }
  }, [])
}

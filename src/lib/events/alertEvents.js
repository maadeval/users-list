import { ALERT_KINDS } from "../../constants/kindAlerts"

const EVENT_NAME = "alert"

const subscribe = callback => {
  const handler = evt => callback(evt.detail)

  document.addEventListener(EVENT_NAME, handler)

  return handler
}

const unsubscribe = handler => document.removeEventListener(EVENT_NAME, handler)
const emitEvent = ({ kind, message }) => {
  const event = new CustomEvent(EVENT_NAME, {
    detail: {
      kind,
      message,
    },
  })

  document.dispatchEvent(event)
}

const success = message => emitEvent({ kind: ALERT_KINDS.SUCCESS, message })
const error = message => emitEvent({ kind: ALERT_KINDS.ERROR, message })

export const alertBox = {
  success,
  error,
  subscribe,
  unsubscribe,
}

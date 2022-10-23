import { useEffect, useState } from "react"
import { ALERT_KINDS } from "../../constants/kindAlerts"
import { alertBox } from "../../lib/events/alertEvents"
import CheckCircleIcon from "../icons/CheckCircleIcon"
import CrossCircleIcon from "../icons/CrossCircleIcon"

import style from "./AlertBox.module.css"

const AlertBox = () => {
  const { alert } = useAlert()

  if (!alert) return null

  const Icon = ALERT_ICONS[alert.kind]
  const className = style[alert.kind]

  if (!Icon || !className) return null

  return (
    <div className={className}>
      <Icon className={style.icon} />
      <p>{alert.message}</p>
    </div>
  )
}

const useAlert = () => {
  const [alert, setAlert] = useState()

  useEffect(() => {
    if (!alert) return

    const timeoutId = setTimeout(() => {
      setAlert()
    }, 2500)

    return () => clearTimeout(timeoutId)
  }, [alert])

  useEffect(() => {
    const callback = alertData => setAlert(alertData)

    const handler = alertBox.subscribe(callback)

    return () => alertBox.unsubscribe(handler)
  }, [])

  return {
    alert,
  }
}

const ALERT_ICONS = {
  [ALERT_KINDS.SUCCESS]: CheckCircleIcon,
  [ALERT_KINDS.ERROR]: CrossCircleIcon,
}

export default AlertBox

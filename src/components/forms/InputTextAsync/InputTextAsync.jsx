import CheckCircleIcon from "../../icons/CheckCircleIcon"
import CrossCircleIcon from "../../icons/CrossCircleIcon"
import UpdateIcon from "../../icons/UpdateIcon"

import style from "./InputTextAsync.module.css"

const InputTextAsync = ({
  label,
  className,
  success,
  error,
  loading,
  ...props
}) => {
  const icon = getIcon(success, error, loading)

  return (
    <label className={style.wrapper}>
      <span className={style.label}>{label}</span>
      <div className={style.relative}>
        <input
          {...props}
          type="text"
          className={`${style.input} ${error ? style.inputError : ""} ${
            className || ""
          }`}
        />
        {icon}
      </div>
      <span className={style.error}>{error}</span>
    </label>
  )
}

const getIcon = (success, error, loading) => {
  if (success) return <CheckCircleIcon className={style.successIcon} />
  if (error) return <CrossCircleIcon className={style.errorIcon} />
  if (loading) return <UpdateIcon className={style.loadingIcon} />

  return null
}

export default InputTextAsync

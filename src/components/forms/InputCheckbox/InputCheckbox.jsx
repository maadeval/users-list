import CheckTicIcon from "../../icons/CheckTicIcon"
import style from "./InputCheckbox.module.css"

const InputCheckbox = ({ className, ...props }) => {
  return (
    <label className={`${style.label} ${className ?? ""}`}>
      <input {...props} className={style.input} type="checkbox" />
      <CheckTicIcon className={style.checkbox} />
    </label>
  )
}

export default InputCheckbox

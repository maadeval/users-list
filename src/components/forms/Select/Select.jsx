import ArrowDownIcon from "../../icons/ArrowDownIcon"
import style from "./Select.module.css"

const Select = props => {
  return (
    <div className={style.wrapper}>
      <select {...props} className={style.select}></select>
      <ArrowDownIcon className={style.arrow} />
    </div>
  )
}

export default Select

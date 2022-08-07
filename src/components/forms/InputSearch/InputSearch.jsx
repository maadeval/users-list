import SearchIcon from "../../icons/SearchIcon/SearchIcon"
import style from "./InputSearch.module.css"

const InputSearch = ({ value, className, ...props }) => {
  return (
    <div className={`${style.wrapper} ${className ?? ""}`}>
      <SearchIcon className={style.iconSearch} />
      <input {...props} type="text" value={value} className={style.input} />
    </div>
  )
}

export default InputSearch

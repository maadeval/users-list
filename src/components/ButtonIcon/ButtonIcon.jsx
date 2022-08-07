import style from "./ButtonIcon.module.css"

const CLASSNAMES = {
  black: {
    normal: style.black,
    fill: style.blackFill,
  },
  red: {
    normal: style.red,
    fill: style.redFill,
  },
}

const ButtonIcon = ({
  icon: Icon,
  disabled,
  isFill,
  variant = "black",
  className,
  ...props
}) => {
  const { normal, fill } = CLASSNAMES[variant]
  const classNameVariant = isFill ? fill : normal

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${style.button} ${classNameVariant} ${className ?? ""}`}>
      <Icon className={style.icon} />
    </button>
  )
}

export default ButtonIcon

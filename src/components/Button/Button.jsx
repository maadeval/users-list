import style from "./Button.module.css"

const VARIANT_CLASSES = {
  primary: style.primary,
  secondary: style.secondary,
}

const Button = ({ variant = "primary", children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${VARIANT_CLASSES[variant]} ${style.button} ${
        className || ""
      }`}>
      {children}
    </button>
  )
}

export default Button

import { useContext, useRef, useState } from "react"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { alertBox } from "../../../lib/events/alertEvents"
import { updateUserPic } from "../../../lib/services/updateUserPic"
import { fileToURL } from "../../../lib/utils/file-utils"
import Button from "../../Button/Button"
import ButtonIcon from "../../ButtonIcon/ButtonIcon"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"

import style from "./UsersListPicForm.module.css"

const UsersListPicForm = ({ currentUser, closeModal }) => {
  const { onSuccess } = useContext(UserFormsContext)
  const [preview, setPreview] = useState()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const inputRef = useRef(null)

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Editar foto</h3>
      <div className={style.figure}>
        <img
          className={style.picture}
          src={preview?.src || currentUser.picture || "/user-pic.svg"}
        />
        <ButtonIcon
          onClick={() => inputRef.current.click()}
          className={style.edit}
          icon={PencilIcon}
          isFill
        />
      </div>
      {preview && preview.src && (
        <p className={style.filename}>{preview.filename}</p>
      )}
      {preview && preview.error && (
        <p className={style.error}>{preview.error}</p>
      )}
      <input
        ref={inputRef}
        className={style.input}
        accept={ALLOWED_MIME_TYPES.join(",")}
        type="file"
        onChange={ev => handleChange(ev, setPreview)}
      />
      <Button
        disabled={!preview || !preview.src || isSubmiting}
        onClick={() =>
          handleClick(currentUser.id, preview.src, {
            closeModal,
            onSuccess,
            setIsSubmiting,
          })
        }>
        {isSubmiting ? "Actualizando..." : "Actualizar foto"}
      </Button>
    </div>
  )
}

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"]
const MAX_SIZE = 102400

const handleChange = async (ev, setPreview) => {
  const file = ev.target.files[0]

  if (!file) {
    return setPreview()
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    const formatter = new Intl.ListFormat("es", {
      style: "long",
      type: "disjunction",
    })
    const listFormatted = formatter.format(ALLOWED_MIME_TYPES)

    return setPreview({
      error: `El tipo de archivo no es válido. Debe ser ${listFormatted}`,
    })
  }

  if (file.size > MAX_SIZE)
    return setPreview({
      error: `El tamaño del archivo no es válido. Debe ser menor de ${MAX_SIZE} bytes`,
    })

  try {
    const fileURL = await fileToURL(file)
    setPreview({
      src: fileURL,
      filename: file.name,
    })
  } catch (err) {
    setPreview()
  }
}

const handleClick = async (
  userId,
  fileURL,
  { closeModal, onSuccess, setIsSubmiting }
) => {
  setIsSubmiting(true)

  const { success } = await updateUserPic(userId, fileURL)

  if (success) {
    onSuccess()
    alertBox.success("Foto actualizada correctamente")
  } else {
    setIsSubmiting(false)
    alertBox.error("No se pudo actualizar la foto")
  }
  closeModal()
}

export default UsersListPicForm

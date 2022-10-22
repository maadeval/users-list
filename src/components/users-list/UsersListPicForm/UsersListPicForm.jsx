import { useContext, useState } from "react"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { updateUserPic } from "../../../lib/services/updateUserPic"
import { fileToURL } from "../../../lib/utils/file-utils"
import Button from "../../Button/Button"

const UsersListPicForm = ({ currentUser, closeModal }) => {
  const { onSuccess } = useContext(UserFormsContext)
  const [preview, setPreview] = useState()

  return (
    <>
      <img src={preview?.src || currentUser.picture || "/user-pic.svg"} />
      {preview && preview.src && <p>{preview.filename}</p>}
      {preview && preview.error && <p>{preview.error}</p>}
      <input
        accept={ALLOWED_MIME_TYPES.join(",")}
        name="picture"
        type="file"
        onChange={ev => handleChange(ev, setPreview)}
      />
      <Button
        disabled={!preview}
        onClick={() =>
          handleClick(currentUser.id, preview.src, {
            closeModal,
            onSuccess,
          })
        }>
        Guardar cambios
      </Button>
    </>
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

const handleClick = async (userId, fileURL, { closeModal, onSuccess }) => {
  const { success } = await updateUserPic(userId, fileURL)

  if (success) {
    onSuccess()
    closeModal()
  }
}

export default UsersListPicForm

import { useEffect, useRef, useState } from "react"

export const useDropdown = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false)
  const dropdownRef = useRef(null)

  const openDropdown = () => setDropdownOpened(true)
  const closeDropdown = () => setDropdownOpened(false)

  useEffect(() => {
    if (!dropdownOpened) return

    const handleClickOutside = evt => {
      const clickInside = dropdownRef.current.contains(evt.target)

      if (!clickInside) closeDropdown()
    }

    document.addEventListener("click", handleClickOutside, { capture: true })

    return () =>
      document.removeEventListener("click", handleClickOutside, {
        capture: true,
      })
  }, [dropdownOpened])

  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    dropdownRef,
  }
}

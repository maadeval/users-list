import { PAGE_VALUES } from "../../constants/pageSelectors"
import ButtonIcon from "../ButtonIcon"
import ArrowLeft from "../icons/ArrowLeft"
import ArrowRight from "../icons/ArrowRight"

import style from "./PageSelector.module.css"

const PageSelector = ({ currentPage, totalPages, setPage }) => {
  const isFirstPage = currentPage === PAGE_VALUES.PAGE
  const isLastPage = currentPage === totalPages || totalPages === 0

  return (
    <div className={style.wrapper}>
      <ButtonIcon
        disabled={isFirstPage}
        icon={ArrowLeft}
        isFill
        onClick={() => setPage(currentPage - 1)}
      />
      <p>
        Página {currentPage} de {totalPages || 1}
      </p>
      <ButtonIcon
        disabled={isLastPage}
        icon={ArrowRight}
        isFill
        onClick={() => setPage(currentPage + 1)}
      />
    </div>
  )
}

export default PageSelector

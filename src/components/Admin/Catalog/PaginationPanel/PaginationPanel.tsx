import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { adminReqCatalogSlice } from '../../../../store/reducers/reqCatalog/adminReqCatalog.slice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';

import styles from './PaginationPanel.module.css';

type TPaginationPanelProps = {
  countTotalCards: number | undefined;
  countCards: number | undefined;
};

const PaginationPanel = ({ countTotalCards, countCards }: TPaginationPanelProps) => {
  const reqSearchParams = useAppSelector((state) => state.adminReq.reqCatalog);

  // Всего страниц
  const totalPages = countTotalCards
    ? Math.ceil(countTotalCards / reqSearchParams.paginationLimit)
    : 1;
  // Сколько отображено или пролистано
  const countViewCards = countCards
    ? (reqSearchParams.paginationPage - 1) * reqSearchParams.paginationLimit + countCards
    : 0;

  const dispatch = useAppDispatch();
  const handleChangePaginationLimit = (evt: ChangeEvent<HTMLSelectElement>) => {
    dispatch(adminReqCatalogSlice.actions.changePaginationLimit(evt.target.value));
  };
  const handleChangePaginationPage = (pageNumber: string) => {
    dispatch(adminReqCatalogSlice.actions.changePaginationPage(pageNumber));
  };

  const handleUpPage = () => {
    handleChangePaginationPage(`${reqSearchParams.paginationPage + 1}`);
  };

  const handleDownPage = () => {
    handleChangePaginationPage(`${reqSearchParams.paginationPage - 1}`);
  };

  return (
    <div className={styles.paginationPanel}>
      <label htmlFor="paginationLimit-select">
        Товаров на странице:
        <select
          name="paginationLimit"
          id="paginationLimit-select"
          value={reqSearchParams.paginationLimit}
          onChange={handleChangePaginationLimit}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      {countTotalCards && (
        <nav className={styles.pages}>
          <button
            type="button"
            onClick={handleDownPage}
            className={clsx(styles.pagesDown, {
              [styles.notVisible]: reqSearchParams.paginationPage === 1,
            })}></button>
          <p>Товаров</p>
          <p>{countViewCards}</p>
          <p>из</p>
          {/* <p>{totalPages}</p> */}
          <p>{countTotalCards}</p>
          <button
            type="button"
            onClick={handleUpPage}
            className={clsx(styles.pagesUp, {
              [styles.notVisible]: reqSearchParams.paginationPage === totalPages,
            })}></button>
        </nav>
      )}
    </div>
  );
};

export { PaginationPanel };

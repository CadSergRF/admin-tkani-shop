import { ChangeEvent } from 'react';
import { sectionNameConstant } from '../../../../utils/catalog.constants';

import styles from './SearchPanel.module.css';
import { adminReqCatalogSlice } from '../../../../store/reducers/reqCatalog/adminReqCatalog.slice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';

const SearchPanel = () => {
  const reqSearchParams = useAppSelector((state) => state.adminReq.reqCatalog);

  const dispatch = useAppDispatch();
  const handleStoreChangeSection = (section: string) => {
    dispatch(adminReqCatalogSlice.actions.changeSection(section));
  };
  const handleStoreSetSearch = (searchStr: string) => {
    dispatch(adminReqCatalogSlice.actions.changeSearch(searchStr));
  };
  const handleSetSort = (evt: ChangeEvent<HTMLSelectElement>) => {
    dispatch(adminReqCatalogSlice.actions.changeSort(evt.target.value));
  };
  const handleChangePaginationPage = (pageNumber: string) => {
    dispatch(adminReqCatalogSlice.actions.changePaginationPage(pageNumber));
  };

  const handleChangeSection = (evt: ChangeEvent<HTMLSelectElement>) => {
    handleChangePaginationPage('1');
    handleStoreChangeSection(evt.target.value);
  };

  const handleSetSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    handleStoreChangeSection('Все');
    handleChangePaginationPage('1');
    handleStoreSetSearch(evt.target.value);
  };

  return (
    <div className={styles.searchPanel}>
      <label htmlFor="section-select" className={styles.label}>
        По разделам:
        <select
          name="section"
          id="section-select"
          value={reqSearchParams.sectionName}
          onChange={handleChangeSection}
          className={styles.input}>
          <option value="Все">Все</option>
          {sectionNameConstant?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div>
        <label htmlFor="section-search-input" className={styles.label}>
          Поиск:
          <input
            id="section-search-input"
            type="search"
            value={reqSearchParams.searchName}
            onChange={handleSetSearch}
            className={styles.input}
          />
        </label>
        <label htmlFor="section-select" className={styles.label}>
          Сортировать по:
          <select
            name="section"
            id="section-select"
            value={reqSearchParams.sortName}
            onChange={handleSetSort}
            className={styles.input}>
            <option value="articulUp">по возрастанию</option>
            <option value="articulDown">по убыванию</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export { SearchPanel };

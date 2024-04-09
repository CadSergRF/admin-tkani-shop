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
      <label htmlFor="section-select">
        По разделам:
        <select
          name="section"
          id="section-select"
          value={reqSearchParams.sectionName}
          onChange={handleChangeSection}>
          <option value="Все">Все</option>
          {sectionNameConstant?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div>
        <input type="search" value={reqSearchParams.searchName} onChange={handleSetSearch} />
        <label htmlFor="section-select">
          Сортировать по:
          <select
            name="section"
            id="section-select"
            value={reqSearchParams.sortName}
            onChange={handleSetSort}>
            <option value="nameUp">по возрастанию</option>
            <option value="nameDown">по убыванию</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export { SearchPanel };

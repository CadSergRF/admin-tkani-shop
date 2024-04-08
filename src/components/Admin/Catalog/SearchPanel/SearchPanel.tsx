import { ChangeEvent } from 'react';
import { sectionName } from '../../../../utils/catalog.constants';

import styles from './SearchPanel.module.css';
import { adminReqCatalogSlice } from '../../../../store/reducers/reqCatalog/adminReqCatalog.slice';
import { useAppDispatch } from '../../../../hooks/redux.hooks';
// import { productApi } from '../../../../store/api/product.api';

const SearchPanel = () => {
  // const {} = productApi.useGetAllProductsQuery()
  const dispatch = useAppDispatch();
  const handleChangeSection = (evt: ChangeEvent<HTMLSelectElement>) => {
    // dispatch(adminReqCatalogSlice.actions.changeSection(evt.target.value));
    // changeSection(evt.target.value);
    dispatch(adminReqCatalogSlice.actions.changeSection(evt.target.value));
  };

  return (
    <div className={styles.searchPanel}>
      <label htmlFor="section-select">
        По разделам:
        <select name="section" id="section-select" onChange={handleChangeSection}>
          <option value="all">Все</option>
          {sectionName?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div>
        <input type="search" />
        <label htmlFor="section-select">
          Сортировать по:
          <select name="section" id="section-select">
            <option value="up">по возрастанию</option>
            <option value="down">по убыванию</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export { SearchPanel };

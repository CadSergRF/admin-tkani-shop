// import React from 'react';
import React, { ChangeEvent, useState } from 'react';

import clsx from 'clsx';

import styles from './UploadCSV.module.css';
import { productApi } from '../../../../../store/api/product.api';
import { useAppSelector } from '../../../../../hooks/redux.hooks';

const UploadCSV = () => {
  const reqSearchParams = useAppSelector((state) => state.adminReq.reqCatalog);
  const { refetch } = productApi.useGetAllSearchProductsQuery(reqSearchParams);

  const [file, setFile] = useState<File | null>(null);

  // Выбор файла
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
      evt.target.value = '';
    }
  };

  // Удаление из input
  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUploadClick = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!file) {
      return;
    }

    try {
      if (file.type !== 'text/csv') {
        console.log('Может быть загружен только файл с расширением .csv');
        return;
      }

      const fd = new FormData();
      fd.append('filecsv', file);

      const data = await fetch('http://localhost:3003/admin/io-function', {
        method: 'POST',
        body: fd,
      });
      if (data.ok) {
        const resp = await data.json();
        console.log('resp ', resp);
        setFile(null);
        refetch();
      }
    } catch (error) {
      console.log('handleupload error' + error);
    }
  };

  return (
    <form className={styles.formInputFile} onSubmit={handleUploadClick}>
      <div
        className={clsx([styles.formInputFile__fileView], {
          'not-visible': file === null,
        })}>
        <input
          className={clsx(styles.formInputFile__fileViewInput, {
            'not-visible': file === null,
          })}
          type="text"
          defaultValue={file?.name || ''}
        />
        <button
          className={clsx(styles.formInputFile__fileViewBtn, {
            'not-visible': file === null,
          })}
          type="button"
          onClick={handleRemoveFile}
        />
      </div>
      <div
        className={clsx(styles.formInputFile__wrapper, {
          'not-visible': file !== null,
        })}>
        <input
          name="file"
          type="file"
          id="styles.formInputFile__file"
          className={clsx(styles.formInputFile, styles.formInputFile__file)}
          onChange={handleFileChange}
        />
        <label htmlFor="styles.formInputFile__file" className={styles.formInputFile__fileButton}>
          <span className={styles.formInputFile__fileIconWrapper}></span>
          <span className={styles.formInputFile__fileButtonText}>Выберите файл</span>
        </label>
      </div>
      <button
        type="submit"
        className={clsx(styles.formInputFile__btn, {
          'not-visible': file === null,
        })}>
        Загрузить
      </button>
    </form>
  );
};
export default UploadCSV;

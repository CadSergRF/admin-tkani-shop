'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import styles from './AddNewsForm.module.css';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import UploadImage from '../../../Catalog/EditCardForm/UploadImage/UploadImage';
import { useState } from 'react';
import { newsApi } from '../../../../../store/api/news.api';

type TProps = {
  onClose: () => void;
};

type TAddNewsForm = {
  title: string;
  text: string;
  picture?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

const AddNewsForm = ({ onClose }: TProps) => {
  const [isOpenUploadImage, setIsOpenUploadImage] = useState<boolean>(false);
  const [checkImage, setCheckImage] = useState<boolean>(false);

  const [createNews] = newsApi.useCreateNewsMutation();

  const { register, handleSubmit, formState, setValue, getValues, reset } = useForm<TAddNewsForm>();

  const handlePopupUploadImage = () => {
    setIsOpenUploadImage(true);
  };

  const handleClosePopupUploadImage = () => {
    setIsOpenUploadImage(false);
  };

  const handleSetLinkImage = (link: string) => {
    setValue('picture', link);
    setCheckImage(true);
  };

  const onSubmit: SubmitHandler<TAddNewsForm> = async (data) => {
    console.log('form', data);
    await createNews(data);
    reset();
    onClose();
  };

  const onErrors: SubmitErrorHandler<TAddNewsForm> = (data) => {
    console.log('err', data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} className={styles.form}>
        <div className={styles.allInputs}>
          {/* Подгрузка картинки */}
          <div className={styles.leftZone}>
            <button
              type="button"
              className={clsx(styles.btn, styles.btn_small)}
              value="Загрузить изображение"
              onClick={handlePopupUploadImage}>
              {getValues('picture') ? 'Изменить изображение' : 'Загрузить изображение'}
            </button>
            {checkImage ? (
              <div className="edit-card__upload-image-preview">
                <img
                  className="edit-card__upload-image-picture"
                  src={getValues('picture')}
                  alt="Превью изображения товара"
                />
              </div>
            ) : (
              ''
            )}
            {/* SEO Title */}
            <div className={styles.formInput}>
              <label htmlFor="seoTitle" className={styles.inputTitle}>
                <p className={styles.inputTitle_text}>Title</p>
                <ErrorMessage
                  errors={formState.errors}
                  name="seo.title"
                  render={({ message }) => <p className={styles.inputError}>{message}</p>}
                />
              </label>
              <input
                id="seoTitle"
                {...register('seo.title', {
                  required: false,
                })}
                type="text"
                className={clsx(styles.titleInput, 'scroll-bar')}
              />
            </div>
            {/* SEO Description */}
            <div className={styles.formInput}>
              <label htmlFor="seoDescription" className={styles.inputTitle}>
                <p className={styles.inputTitle_text}>Description</p>
                <ErrorMessage
                  errors={formState.errors}
                  name="seo.description"
                  render={({ message }) => <p className={styles.inputError}>{message}</p>}
                />
              </label>
              <input
                id="seoDescription"
                {...register('seo.description', {
                  required: false,
                })}
                type="text"
                className={clsx(styles.titleInput, 'scroll-bar')}
              />
            </div>
            {/* SEO KeyWords */}
            <div className={styles.formInput}>
              <label htmlFor="seoKeyWords" className={styles.inputTitle}>
                <p className={styles.inputTitle_text}>KeyWords</p>
                <ErrorMessage
                  errors={formState.errors}
                  name="seo.keywords"
                  render={({ message }) => <p className={styles.inputError}>{message}</p>}
                />
              </label>
              <input
                id="seoKeyWords"
                {...register('seo.keywords', {
                  required: false,
                })}
                type="text"
                className={clsx(styles.titleInput, 'scroll-bar')}
              />
            </div>
          </div>

          {/* Блок новости */}
          <div className={styles.newsInfo}>
            {/* Заголовок новости */}
            <div className={styles.formInput}>
              <label htmlFor="title" className={styles.inputTitle}>
                <p className={styles.inputTitle_text}>Заголовок</p>
                <ErrorMessage
                  errors={formState.errors}
                  name="title"
                  render={({ message }) => <p className={styles.inputError}>{message}</p>}
                />
              </label>
              <input
                id="title"
                {...register('title', {
                  required: 'Обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимально символов',
                  },
                })}
                type="text"
                className={clsx(styles.titleInput, 'scroll-bar')}
              />
            </div>
            {/* Текст новости */}
            <div className={styles.formInput}>
              <label htmlFor="text" className={styles.inputTitle}>
                <p className={styles.inputTitle_text}>Текст</p>
                <ErrorMessage
                  errors={formState.errors}
                  name="text"
                  render={({ message }) => <p className={styles.inputError}>{message}</p>}
                />
              </label>
              <textarea
                id="text"
                rows={10}
                {...register('text', {
                  required: 'Обязательно к заполнению',
                  minLength: {
                    value: 3,
                    message: 'Минимально символов',
                  },
                })}
                className={styles.textArea}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.btn} disabled={!formState.isValid}>
          Сохранить
        </button>
      </form>

      <UploadImage
        isOpen={isOpenUploadImage}
        onClose={handleClosePopupUploadImage}
        setLinkImage={handleSetLinkImage}
      />
    </>
  );
};

export { AddNewsForm };

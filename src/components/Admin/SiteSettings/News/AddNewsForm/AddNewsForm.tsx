import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './AddNewsForm.module.css';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';

type TProps = {
  onClose: () => void;
};

type TAddNewsForm = {
  picture: string;
  title: string;
  text: string;
};

const AddNewsForm = ({ onClose }: TProps) => {
  const { register, handleSubmit, formState } = useForm<TAddNewsForm>();

  const onSubmit: SubmitHandler<TAddNewsForm> = async (data) => {
    console.log(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.allInputs}>
        {/* Подгрузка картинки */}
        <div className={styles.formInput}>
          <label htmlFor="name" className="pictureTitle">
            Заголовок
          </label>
          <input id="picture" {...register('picture')} type="text" className="pictureInput" />
        </div>
        <div className={styles.newsInfo}>
          {/* Заголовок новости */}
          <div className={styles.formInput}>
            <label htmlFor="name" className={styles.inputTitle}>
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
                  message: 'Минимально  символа',
                },
              })}
              type="text"
              className={clsx(styles.titleInput, 'scroll-bar')}
            />
          </div>
          {/* Текст новости */}
          <div className={styles.formInput}>
            <label htmlFor="name" className={styles.inputTitle}>
              <p className={styles.inputTitle_text}>Текст</p>
              <ErrorMessage
                errors={formState.errors}
                name="title"
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
                  message: 'Минимально  символа',
                },
              })}
              className={styles.textArea}
            />
          </div>
        </div>
      </div>

      <button className={styles.btn} disabled={formState.isValid}>
        Сохранить
      </button>
    </form>
  );
};

export { AddNewsForm };

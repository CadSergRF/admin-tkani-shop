'use client';

import { MouseEvent, useCallback, useEffect, useState } from 'react';
import styles from './News.module.css';
import clsx from 'clsx';
import { AddNewsForm } from './AddNewsForm/AddNewsForm';

const News = () => {
  const [visibleAddNews, setVisibleAddNews] = useState(false);
  // Закрыть модальное окно
  const handleClose = useCallback(() => {
    setVisibleAddNews(false);
  }, []);
  // Слушатель нажатия кнопки Esc
  useEffect(() => {
    if (!visibleAddNews) return;
    function handleESC(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleESC);
    return () => document.removeEventListener('keydown', handleESC);
  }, [visibleAddNews, handleClose]);
  // Закрытие при клике на overflow
  const handleCloseOverflow = (evt: MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      setVisibleAddNews(false);
    }
  };

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.container_btn}>
          <button className={styles.btn} onClick={() => setVisibleAddNews(true)}>
            Добавить новость
          </button>
        </div>
        <div>Список новостей</div>
      </section>
      <div
        className={clsx(styles.addNews, {
          [styles.addNews_visible]: visibleAddNews,
        })}
        onMouseDown={handleCloseOverflow}>
        <div className={clsx(styles.modal_container, 'scroll-bar')}>
          <h3 className={styles.modal_title}>Добавить новость</h3>
          <AddNewsForm onClose={handleClose} />
        </div>
      </div>
    </>
  );
};

export { News };

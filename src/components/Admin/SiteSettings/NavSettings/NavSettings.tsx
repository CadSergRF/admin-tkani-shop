import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './NavSettings.module.css';

const NavSettings = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.container}>
        <NavLink
          to="news"
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
            })
          }>
          Новости
        </NavLink>
        <NavLink
          to="last-product"
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
            })
          }>
          Избранные товары на&nbsp;главной
        </NavLink>
        <NavLink
          to="qa-settings"
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
            })
          }>
          Настройка блока Вопрос&nbsp;-&nbsp;Ответ
        </NavLink>
      </nav>
    </div>
  );
};

export { NavSettings };

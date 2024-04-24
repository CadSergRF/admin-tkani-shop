import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import styles from './TopMenu.module.css';

const TopMenu = () => {
  return (
    <div className={styles.topMenu}>
      <nav className={styles.topMenu__container}>
        <NavLink
          to="company-info"
          className={({ isActive }) =>
            clsx(styles.topMenu__link, {
              [styles.topMenu__link_active]: isActive,
            })
          }>
          Информация о компании
        </NavLink>
        <NavLink
          to="catalog"
          className={({ isActive }) =>
            clsx(styles.topMenu__link, {
              [styles.topMenu__link_active]: isActive,
            })
          }>
          Работа с каталогом
        </NavLink>
        <NavLink
          to="site-settings"
          className={({ isActive }) =>
            clsx(styles.topMenu__link, {
              [styles.topMenu__link_active]: isActive,
            })
          }>
          Общие настройки сайта
        </NavLink>
      </nav>
    </div>
  );
};

export { TopMenu };

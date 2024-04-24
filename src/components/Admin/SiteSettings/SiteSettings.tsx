import { Outlet } from 'react-router-dom';

import { NavSettings } from './NavSettings/NavSettings';

import styles from './SiteSettings.module.css';

const SiteSettings = () => {
  return (
    <section className={styles.wrapper}>
      <NavSettings />
      <Outlet />
    </section>
  );
};

export { SiteSettings };

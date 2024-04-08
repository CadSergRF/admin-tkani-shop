import { Outlet } from 'react-router-dom';

import { TopMenu } from './TopMenu/TopMenu';

import './Admin.css';

const Admin = () => {
  return (
    <div className="admin__main-class">
      <TopMenu />
      <Outlet />
    </div>
  );
};

export { Admin };

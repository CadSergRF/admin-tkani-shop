import { Routes, Route, Navigate } from 'react-router-dom';

import { Admin } from './components/Admin/Admin';
import { CompanyInfo } from './components/Admin/CompanyInfo/CompanyInfo';
import { CatalogPage } from './components/Admin/Catalog/CatalogPage';
import { SiteSettings } from './components/Admin/SiteSettings/SiteSettings';
import { News } from './components/Admin/SiteSettings/News/News';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Admin />}>
          <Route index element={<Navigate to="/catalog" replace />} />
          <Route path="company-info" element={<CompanyInfo />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="site-settings/*" element={<SiteSettings />}>
            <Route index element={<Navigate to="/site-settings/news" replace />} />
            <Route path="news" element={<News />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

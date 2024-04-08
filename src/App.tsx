import { Routes, Route } from 'react-router-dom';

import { Admin } from './components/Admin/Admin';
import { CompanyInfo } from './components/Admin/CompanyInfo/CompanyInfo';
import { CatalogPage } from './components/Admin/Catalog/CatalogPage';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Admin />}>
          <Route path="company-info" element={<CompanyInfo />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

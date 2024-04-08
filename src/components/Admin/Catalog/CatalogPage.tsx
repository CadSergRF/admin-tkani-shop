import DownloadCSV from './FromToCSV/DownloadCSV/DownloadCSV';
import UploadCSV from './FromToCSV/UploadCSV/UploadCSV';
import AddNewCard from './AddNewCard/AddNewCard';
import { ProductViewForm } from './ProductViewForm/ProductViewForm';

import './CatalogPage.css';

const CatalogPage = () => {
  return (
    <section className="admin-catalog">
      <div className="admin-catalog__control-panel">
        <DownloadCSV />
        <UploadCSV />
        <AddNewCard />
      </div>
      <ProductViewForm />
    </section>
  );
};

export { CatalogPage };

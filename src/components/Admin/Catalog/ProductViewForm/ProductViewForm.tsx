import { productApi } from '../../../../store/api/product.api';
import { ProductList } from '../ProductList/ProductList';
import { SearchPanel } from '../SearchPanel/SearchPanel';

const ProductViewForm = () => {
  const {
    data: cards,
    error,
    isLoading,
  } = productApi.useGetAllProductsQuery(' ', { refetchOnMountOrArgChange: true });

  return (
    <section>
      <SearchPanel />
      <ProductList cards={cards} error={error} isLoading={isLoading} />
    </section>
  );
};

export { ProductViewForm };

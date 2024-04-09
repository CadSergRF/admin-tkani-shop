import { useAppSelector } from '../../../../hooks/redux.hooks';
import { productApi } from '../../../../store/api/product.api';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { ProductList } from '../ProductList/ProductList';
import { PaginationPanel } from '../PaginationPanel/PaginationPanel';

const ProductViewForm = () => {
  const reqSearchParams = useAppSelector((state) => state.adminReq.reqCatalog);
  const { data, error, isLoading } = productApi.useGetAllSearchProductsQuery(reqSearchParams, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <section>
      <SearchPanel />
      <ProductList cards={data?.cards} error={error} isLoading={isLoading} />
      <PaginationPanel countCards={data?.countTotalCards} />
    </section>
  );
};

export { ProductViewForm };

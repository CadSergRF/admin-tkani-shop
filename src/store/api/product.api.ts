import { INewProduct } from './../../models/IProduct.model';
import { IProduct } from '../../models/IProduct.model';
import { resFileImageModel } from '../../models/resFileImage.model';
import { instantsApi } from './instants.api';
import { TChangePictureCard, TChangeVisibleCard } from '../../models/common.model';

export const productApi = instantsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], string>({
      query: () => '/admin/products',
      providesTags: () => [
        {
          type: 'Product',
        },
      ],
    }),
    createProduct: builder.mutation<IProduct, INewProduct>({
      query: (product) => ({
        body: product,
        url: '/admin/products',
        method: 'POST',
      }),
      invalidatesTags: () => [
        {
          type: 'Product',
        },
      ],
    }),
    updateProductVisible: builder.mutation<void, TChangeVisibleCard>({
      query: (visibleCard) => ({
        body: visibleCard,
        url: `/admin/products/${visibleCard.id}/visible`,
        method: 'PATCH',
      }),
    }),
    updateProductPicture: builder.mutation<void, TChangePictureCard>({
      query: (pictureCard) => ({
        body: pictureCard,
        url: `/admin/products/${pictureCard.id}/picture`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        body: product,
        url: '/admin/products',
        method: 'PATCH',
      }),
      transformResponse: (res: { data: IProduct }) => res.data,
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    exportBaseToCSV: builder.query<void, void>({
      query: () => '/admin/exporttocsv',
    }),
    uploadImage: builder.mutation<resFileImageModel, FormData>({
      query: (bodyFormData) => ({
        url: '/admin/products/file-image',
        method: 'POST',
        body: bodyFormData,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

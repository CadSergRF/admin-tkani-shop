import { instantsApi } from './instants.api';

import { INews, INewsCreate } from '../../models/news.model';

export const newsApi = instantsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<INews[], string>({
      query: () => '/admin/news',
      providesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
    createNews: builder.mutation<INews, INewsCreate>({
      query: (news) => ({
        body: news,
        url: '/admin/news',
        method: 'POST',
      }),
      invalidatesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
    updateNews: builder.mutation<INews, INews>({
      query: (news) => ({
        body: news,
        url: '/admin/news',
        method: 'PATCH',
      }),
      transformResponse: (res: { data: INews }) => res.data,
      invalidatesTags: ['News'],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/admin/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

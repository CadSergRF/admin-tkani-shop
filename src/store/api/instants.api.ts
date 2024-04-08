import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/main.constants';

export const instantsApi = createApi({
  reducerPath: 'instantsApi',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: () => ({}),
});

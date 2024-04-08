import { IProduct } from './IProduct.model';

export const defaultIProduct: IProduct = {
  _id: '',
  mainData: {
    articul: '',
    name: '',
    price: 0,
    oldPrice: undefined,
    quantity: undefined,
    picture: '',
    description: '',
  },
  characteristic: {
    width: undefined,
    picture: '',
    color: '',
    countryOfOrigin: '',
    composition: '',
    weight: undefined,
  },
  seoTags: {
    header: '',
    description: '',
    keyWords: [''],
  },
  configCard: {
    visible: true,
    promo: false,
  },
};

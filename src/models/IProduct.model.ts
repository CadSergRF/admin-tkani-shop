interface IMainData {
  articul: string; // Артикул
  name: string; // Наименование
  price: number; // Цена за единицу
  oldPrice?: number; // "Старая цена" - для акций
  quantity?: number; // Количество, остаток
  picture?: string; // Изображение товара
  description?: string; // Описание товара
}

interface ICharacteristic {
  width: number | undefined; // Ширина
  picture: string; // Рисунок
  color: string; // Основной цвет
  countryOfOrigin: string; // Страна производитель
  composition: string; // Состав ткани
  weight: number | undefined; // Плотность или вес за единицу измерения
}

interface ISeoTag {
  header: string; // Заголовок
  description: string; // Описание
  keyWords: string[]; // Ключевые слова
}

interface IConfigCard {
  visible: boolean;
  promo?: boolean;
}

export interface IProduct {
  _id: string;
  mainData: IMainData;
  characteristic: ICharacteristic;
  seoTags: ISeoTag;
  configCard: IConfigCard;
}

export interface INewProduct extends Omit<IProduct, '_id'> {}

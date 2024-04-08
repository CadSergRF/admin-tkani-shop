import { useMemo, useEffect, useState } from 'react';
import { IProduct } from '../../../../models/IProduct.model';
import { useForm, SubmitHandler } from 'react-hook-form';

import PopupWithForm from '../../../../ui-kit/PopupWithForm/PopupWithForm';
import './EditCardForm.css';
import UploadImage from './UploadImage/UploadImage';
import { productApi } from '../../../../store/api/product.api';

interface propsEditCard {
  card: IProduct;
  newCard: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const EditCardForm = ({ card, newCard, isOpen, onClose }: propsEditCard) => {
  const [isOpenUploadImage, setIsOpenUploadImage] = useState<boolean>(false);
  const [checkImage, setCheckImage] = useState<boolean>(false);

  const { register, reset, setValue, getValues, handleSubmit } = useForm<IProduct>({
    defaultValues: useMemo(() => {
      return card;
    }, [card]),
  });

  useEffect(() => {
    reset(card);
  }, [card, reset]);

  const [updateProduct] = productApi.useUpdateProductMutation();
  const [createProduct] = productApi.useCreateProductMutation();

  const handleSetLinkImage = (link: string) => {
    setValue('mainData.picture', link);
    setCheckImage(true);
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    if (newCard) {
      await createProduct(data);
      onClose();
    } else {
      await updateProduct(data);
      onClose();
    }
  };

  const handlePopupUploadImage = () => {
    setIsOpenUploadImage(true);
  };

  const handleClosePopupUploadImage = () => {
    setIsOpenUploadImage(false);
  };

  return (
    <>
      <PopupWithForm isOpen={isOpen} onClose={onClose} onPosition="left">
        <form onSubmit={handleSubmit(onSubmit)} className="edit-card">
          <button className="edit-card__submit-btn">Сохранить</button>
          <div className="edit-card__content scroll-bar">
            {/* Название товара */}
            <div className="edit-card__item">
              <label htmlFor="name" className="edit-card__input-title">
                Заголовок
              </label>
              <input
                id="name"
                {...register('mainData.name')}
                type="text"
                className="edit-card__input"
              />
            </div>
            {/* Описание товара */}
            <div className="edit-card__item">
              <label htmlFor="description" className="edit-card__input-title">
                Описание
              </label>
              <textarea
                id="description"
                rows={6}
                {...register('mainData.description')}
                className="edit-card__text-aria scroll-bar"
              />
            </div>
            {/* Загрузка изображения */}
            <div className="edit-card__item">
              <h3 className="edit-card__input-title">Изображение</h3>
              <button
                // className={`edit-card_upload-image-btn`}
                className={`edit-card_upload-image-btn  ${checkImage ? 'not-visible' : ''}`}
                type="button"
                onClick={handlePopupUploadImage}>
                Загрузить изображение
              </button>
              <input
                id="picture"
                {...register('mainData.picture')}
                type="text"
                className={`edit-card__input ${checkImage ? 'not-visible' : ''}`}
                // className="edit-card__input"
              />
              {checkImage ? (
                <div className="edit-card__upload-image-preview">
                  <img
                    className="edit-card__upload-image-picture"
                    src={getValues('mainData.picture')}
                    alt="Превью изображения товара"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            {/* Блок с ценой и количеством */}
            <div className="edit-card__items-block">
              <div className="edit-card__item">
                <label htmlFor="articul" className="edit-card__input-title">
                  Артикул
                </label>
                <input
                  id="articul"
                  {...register('mainData.articul')}
                  type="text"
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="quantity" className="edit-card__input-title">
                  Количество
                </label>
                <input
                  id="quantity"
                  {...register('mainData.quantity')}
                  type="number"
                  min={0}
                  step={0.1}
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="price" className="edit-card__input-title">
                  Цена
                </label>
                <input
                  id="price"
                  {...register('mainData.price')}
                  type="number"
                  min={0}
                  step={0.01}
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="oldPrice" className="edit-card__input-title">
                  Старая цена
                </label>
                <input
                  id="oldPrice"
                  {...register('mainData.oldPrice')}
                  type="number"
                  min={0}
                  step={0.01}
                  className="edit-card__input"
                />
              </div>
            </div>
            {/* Выбор разделов каталога */}
            <div className="edit-card__item">
              <h2>ВЫБОР РАЗДЕЛОВ КАТАЛОГА</h2>
            </div>
            {/* Xарактеристики */}
            <h3>Характеристики</h3>
            <div className="edit-card__items-block">
              <div className="edit-card__item">
                <label htmlFor="characteristic_width" className="edit-card__input-title">
                  Ширина
                </label>
                <input
                  id="characteristic_width"
                  {...register('characteristic.width')}
                  type="number"
                  min={0}
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="characteristic_picture" className="edit-card__input-title">
                  Рисунок
                </label>
                <input
                  id="characteristic_picture"
                  {...register('characteristic.picture')}
                  type="text"
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="characteristic_color" className="edit-card__input-title">
                  Основной цвет
                </label>
                <input
                  id="characteristic_color"
                  {...register('characteristic.color')}
                  type="text"
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="characteristic_countryOfOrigin" className="edit-card__input-title">
                  Страна производства
                </label>
                <input
                  id="characteristic_countryOfOrigin"
                  {...register('characteristic.countryOfOrigin')}
                  type="text"
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="characteristic_composition" className="edit-card__input-title">
                  Состав
                </label>
                <input
                  id="characteristic_composition"
                  {...register('characteristic.composition')}
                  type="text"
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="characteristic_weight" className="edit-card__input-title">
                  Плотность
                </label>
                <input
                  id="characteristic_weight"
                  {...register('characteristic.weight')}
                  type="number"
                  min={0}
                  className="edit-card__input"
                />
              </div>
            </div>
            {/* SEO-параметры */}
            <h3>SEO - параметры</h3>
            <div className="edit-card__items-block">
              <div className="edit-card__item">
                <label htmlFor="seoTags_header" className="edit-card__input-title">
                  Заголовок
                </label>
                <input
                  id="seoTags_header"
                  {...register('seoTags.header')}
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="seoTags_description" className="edit-card__input-title">
                  Описание
                </label>
                <input
                  id="seoTags_description"
                  {...register('seoTags.description')}
                  className="edit-card__input"
                />
              </div>
              <div className="edit-card__item">
                <label htmlFor="seoTags_keyWords" className="edit-card__input-title">
                  Ключевые слова
                </label>
                <input
                  id="seoTags_keyWords"
                  {...register('seoTags.keyWords')}
                  className="edit-card__input"
                />
              </div>
            </div>
          </div>
        </form>
      </PopupWithForm>

      <UploadImage
        isOpen={isOpenUploadImage}
        onClose={handleClosePopupUploadImage}
        setLinkImage={handleSetLinkImage}
      />
    </>
  );
};

export default EditCardForm;

import { useState } from 'react';
import clsx from 'clsx';

import { productApi } from '../../../../store/api/product.api';

import { IProduct } from '../../../../models/IProduct.model';
import { defaultIProduct } from '../../../../models/defaultIProduct';

import { ProductCard } from '../ProductCard/ProductCard';
import EditCardForm from '../EditCardForm/EditCardForm';
import Preloader from '../../../../ui-kit/Preloader/Preloader';

import styles from './ProductList.module.css';
import cardStyles from '../ProductCard/ProductCard.module.css';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

type TProductList = {
  cards: IProduct[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

const ProductList = ({ cards, error, isLoading }: TProductList) => {
  // const {
  //   data: cards,
  //   error,
  //   isLoading,
  // } = productApi.useGetAllProductsQuery(' ', { refetchOnMountOrArgChange: true });

  console.log('вызван');

  const [deleteCard] = productApi.useDeleteProductMutation();
  const [updateVisible] = productApi.useUpdateProductVisibleMutation();

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [editCard, setEditCard] = useState<IProduct>(defaultIProduct);

  const handleDeleteCard = (id: string) => {
    deleteCard(id);
  };

  const handleEditCard = (card: IProduct) => {
    setIsOpenPopup(true);
    setEditCard(card);
  };

  const handleVisibleCard = (id: string, visible: boolean) => {
    updateVisible({ id: id, visible: visible });
  };

  const handleCloseAllPopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={cardStyles.card}>
          <p className={clsx(cardStyles.card_item, 'text__align_center')}>Фото</p>
          <p className={cardStyles.card_item}>Наименование</p>
          <p className={cardStyles.card_item}>Артикул</p>
          <p className={cardStyles.card_item}>Цена</p>
          <p className={cardStyles.card_item}>Количество</p>
          <p className={cardStyles.card_item}>Видимость</p>
          <p className={cardStyles.card_item}>Удалить</p>
        </div>
        {isLoading && <Preloader />}
        {error && <h2>Ошибка загрузки данных с сервера</h2>}
        {!isLoading &&
          !error &&
          cards?.map((card) => (
            <ProductCard
              key={card._id}
              card={card}
              handleDeleteCard={handleDeleteCard}
              handleEditCard={handleEditCard}
              handleVisibleCard={handleVisibleCard}
            />
          ))}
      </section>

      <EditCardForm
        card={editCard}
        newCard={false}
        isOpen={isOpenPopup}
        onClose={handleCloseAllPopup}
      />
    </>
  );
};

export { ProductList };

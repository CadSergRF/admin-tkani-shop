import { useState } from 'react';
import clsx from 'clsx';

import { IProduct } from '../../../../models/IProduct.model';

import styles from './ProductCard.module.css';

interface propsProductCard {
  card: IProduct;
  handleDeleteCard: (_id: string) => void;
  handleEditCard: (c: IProduct) => void;
  handleVisibleCard: (_id: string, isVisible: boolean) => void;
}

const ProductCard = ({
  card,
  handleDeleteCard,
  handleEditCard,
  handleVisibleCard,
}: propsProductCard) => {
  const { mainData, configCard, _id } = card;
  const { articul, name, price, picture, quantity } = mainData;
  const { visible } = configCard;

  const [isVisible, setIsVisible] = useState(visible);

  const handleChangeVisibleCard = () => {
    setIsVisible(!isVisible);
    handleVisibleCard(_id, !isVisible);
  };

  return (
    <>
      <article className={styles.card}>
        <img className={clsx(styles.photo, 'cursor__pointer')} src={picture} alt="Фото" />
        <h2
          className={clsx(styles.card_item, 'cursor__pointer')}
          onClick={() => handleEditCard(card)}>
          {name}
        </h2>
        <p className={styles.card_item}>{articul}</p>
        <p className={styles.card_item}>{price}</p>
        <p className={styles.card_item}>{quantity}</p>
        <button
          className={clsx(styles.btn_visible, {
            [styles.btn_visible__on]: isVisible,
          })}
          onClick={handleChangeVisibleCard}>
          <div
            className={clsx(styles.btn_visible__span, {
              [styles.btn_visible__span_on]: isVisible,
            })}></div>
        </button>
        <button
          className={clsx(styles.btn_delete, 'cursor__pointer')}
          onClick={() => handleDeleteCard(_id)}></button>
      </article>
    </>
  );
};

export { ProductCard };

import { useState } from 'react';

import { defaultIProduct } from '../../../../models/defaultIProduct';
import EditCardForm from '../EditCardForm/EditCardForm';

import styles from './AddNewCard.module.css';

const AddNewCard = () => {
  const [addNewCard, setAddNewCard] = useState(false);

  const handleCloseAddNewCard = () => {
    setAddNewCard(false);
  };
  return (
    <div>
      <button className={styles.button} onClick={() => setAddNewCard(true)}>
        Добавить товар
      </button>
      <EditCardForm
        card={defaultIProduct}
        newCard={true}
        isOpen={addNewCard}
        onClose={handleCloseAddNewCard}
      />
    </div>
  );
};

export default AddNewCard;

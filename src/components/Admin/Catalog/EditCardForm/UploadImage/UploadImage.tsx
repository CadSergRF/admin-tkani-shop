import React, { ChangeEvent, useState } from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';
import uploadImageIcon from '../../../../../ui-kit/icons/icon-download-file.svg';

import './UploadImage.css';
import PopupWithForm from '../../../../../ui-kit/PopupWithForm/PopupWithForm';
import { productApi } from '../../../../../store/api/product.api';
import { BASE_URL } from '../../../../../utils/main.constants';
import { resFileImageModel } from '../../../../../models/resFileImage.model';

interface propsPopup {
  isOpen: boolean;
  onClose: () => void;
  setLinkImage: (l: string) => void;
}

const UploadImage = ({ isOpen, onClose, setLinkImage }: propsPopup) => {
  const [image, setImage] = useState<File | null>(null);

  const [uploadImage] = productApi.useUploadImageMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setImage(fileList[0]);
    } else {
      setImage(null);
    }
  };

  const handleCloseUploadImage = () => {
    setImage(null);
    onClose();
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!image) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('cardImage', image);

      uploadImage(formData)
        .unwrap()
        .then((loadImage: resFileImageModel) => {
          console.log('новое', image);
          const linkImage = `${BASE_URL}/static/${loadImage?.filename}`;
          setLinkImage(linkImage);
        })
        .catch((rejected) => console.error(rejected));

      handleCloseUploadImage();
    } catch (error) {
      console.log('handleupload error' + error);
    }
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={handleCloseUploadImage} onPosition="center">
      <div className="upload-image_container">
        <button
          className={`upload-image_submit ${image ? '' : 'not-visible'}`}
          type="button"
          onClick={(e) => handleSubmit(e)}>
          Загрузить
        </button>
        <ImagePreview file={image} />
        <div className={`new-dispute-file__drop-zone ${!image ? '' : 'not-visible'}`}>
          <img className="new-dispute-file__drop-zone-logo" src={uploadImageIcon} alt="" />
          <p className="new-dispute-file__drop-zone-text">
            Перетащите файлы сюда или нажмите, чтобы загрузить
          </p>
          <input
            className="new-dispute-file__drop-zone-input"
            name="cardImage"
            type="file"
            value=""
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
    </PopupWithForm>
  );
};

export default UploadImage;

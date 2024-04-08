import './ImagePreview.css';

type ImagePreviewProps = {
  file: File | null;
};

const ImagePreview = ({ file }: ImagePreviewProps) => {
  if (!file) {
    return null;
  }

  return (
    <div>
      <img src={URL.createObjectURL(file)} alt="Preview" className="edit-card__image-preview" />
    </div>
  );
};

export default ImagePreview;

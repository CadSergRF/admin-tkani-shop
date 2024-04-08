import './DownloadCSV.css';

const DownloadCSV = () => {
  const downloadFile = async () => {
    const response = await fetch('http://localhost:3003/admin/io-function');
    if (response.status === 200) {
      const blob: Blob = await response.blob();
      const downloadURL = window.URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = downloadURL;
      link.download = 'productBase.csv';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(downloadURL);
      link.remove();
    }
  };

  return (
    <button className="download-csv not-visible" onClick={downloadFile}>
      Скачать базу товаров в .csv
    </button>
  );
};

export default DownloadCSV;

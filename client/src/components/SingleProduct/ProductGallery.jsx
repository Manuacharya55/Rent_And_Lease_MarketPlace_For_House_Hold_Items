const ProductGallery = ({ images = [] }) => (
  <div className="gallery-layout-grid">
    <div className="gallery-item main-item">
      <img src={images[0]} alt="Main" />
    </div>

    <div className="gallery-side-stack">
      <div className="gallery-item side-item">
        <img src={images[1] || images[0]} alt="Side 1" />
      </div>
      <div className="gallery-item side-item">
        <img src={images[2] || images[0]} alt="Side 2" />
      </div>
    </div>
  </div>
);

export default ProductGallery;

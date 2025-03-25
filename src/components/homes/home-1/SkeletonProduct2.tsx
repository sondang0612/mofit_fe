const SkeletonProduct2 = () => {
  return (
    <div className="product_skeleton">
      <div className={`productCard animate-pulse`}>
        <div className="imgWrapper pc__img-wrapper"></div>

        <div className="infoWrapper">
          <div className="category"></div>
          <div className="title"></div>
          <div className="price"></div>

          <div className="reviewWrapper">
            <div className="reviewIcon"></div>
            <div className="reviewIcon"></div>
            <div className="reviewIcon"></div>
            <div className="reviewIcon"></div>
            <div className="reviewIcon"></div>

            <div className="reviewText"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct2;

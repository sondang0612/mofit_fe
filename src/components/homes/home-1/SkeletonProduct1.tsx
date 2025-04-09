const SkeletonProduct1 = () => {
  return (
    <div className="col-6 col-md-4 product_skeleton">
      <div className={`productCard animate-pulse`}>
        <div className="imgWrapper pc__img-wrapper"></div>

        <div className="infoWrapper px-3">
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

export default SkeletonProduct1;

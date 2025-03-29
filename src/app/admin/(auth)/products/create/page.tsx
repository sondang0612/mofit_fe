import React from "react";

const Page = () => {
  return (
    <div className="bg-white p-3">
      <h4 className="font-bold">Tạo sản phẩm mới</h4>
      <form>
        <div className="form-group gap-2 d-flex">
          <label>Tên sản phẩm</label>
          <input
            type="name"
            className="form-control"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
      </form>
    </div>
  );
};

export default Page;

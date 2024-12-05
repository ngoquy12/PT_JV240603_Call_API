import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../apis/instance";

export default function DemoAxios() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    status: true,
  });

  const fetchProducts = async () => {
    try {
      const response = await baseUrl.get("admin/product");

      setProducts(response.data.content);
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await baseUrl.get("admin/category");

      setCategories(response.data.content);
    } catch (error) {
      // Xử lý lỗi
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleChangeCategory = (e) => {
    setProduct({
      ...product,
      categoryId: +e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gọi API thêm mới sản phẩm
    try {
      const response = await baseUrl.post("admin/product", product);
      if (response.status === 201) {
        alert("Thêm sản phẩm thành công");
      }
    } catch (error) {
      if (error.status === 400) {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input
            value={product.name}
            onChange={handleChange}
            name="name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Category</label>
          <select
            value={product.categoryId}
            onChange={handleChangeCategory}
            name="categoryId"
            id=""
          >
            <option value="">Mời bạn chọn danh mục</option>
            {categories.map((cat) => (
              <option value={cat.id}>{cat.categoryName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Image</label>
          <input
            value={product.image}
            onChange={handleChange}
            name="image"
            type="text"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

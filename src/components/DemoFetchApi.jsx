import React, { useEffect, useState } from "react";

export default function DemoFetchApi() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    status: true,
  });

  console.log("categories: ", categories);

  const fetchCategory = () => {
    fetch("http://localhost:8080/api/v1/admin/category", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data.content))
      .catch((error) => console.log(error));
  };

  const fetchProducts = () => {
    fetch("http://localhost:8080/api/v1/admin/product", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ",
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.content))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  //   Gọi API lấy thông tin chi tiết 1 sản phẩm
  const handleGetDetail = (id) => {
    fetch(`http://localhost:8080/api/v1/admin/product/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/v1/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ",
      },
    })
      .then((data) => {
        console.log("Data: ", data);
      })
      .catch((error) => console.log(error));
  };

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

  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // B1: Validate Form

    // B2: Gọi API thêm mới sản phẩm
    fetch("http://localhost:8080/api/v1/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // load lại giao diện
          fetchProducts();

          //   Reset Form
          setProduct({
            name: "",
            categoryId: "",
            image: "",
            status: true,
          });
        }
      })
      .catch((error) => console.log(error));

    // B3: Xử lý các response
  };

  return (
    <div>
      <h3>List product</h3>
      <table border={1}>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Sku</th>
          <th>Option</th>
        </tr>
        <tbody>
          {products.map((pro, index) => (
            <tr key={pro.id}>
              <td>{index + 1}</td>
              <td>{pro.name}</td>
              <td>{pro.sku}</td>
              <td>
                <button onClick={() => handleGetDetail(pro.id)}>Detail</button>
                <button>Sửa</button>
                <button onClick={() => handleDelete(pro.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

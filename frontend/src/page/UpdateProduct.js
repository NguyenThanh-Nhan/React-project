import Header from "../container/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams(); // lấy id từ URL
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch(`http://localhost:8000/api/product/${id}`);
      result = await result.json();
      setData(result);
      setName(result.name);
      setPrice(result.price);
      setDescription(result.description);
      setFile(result.file);
    };
    fetchData();
  }, [id]);

  async function editProduct(id) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);
    let result = await fetch(
      `http://localhost:8000/api/updateproduct/${id}?_method=PUT`,
      {
        method: "POST",
        body: formData,
      }
    );
    alert("Data has been updated");
  }

  return (
    <>
      <Header />
      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-dark">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">UpdateProduct page</h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <br />
                <label for="">Tên sản phẩm: </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={data.name}
                />{" "}
                <br /> <br />
                <label for="">Giá sản phẩm: </label>
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  defaultValue={data.price}
                />{" "}
                <br /> <br />
                <label className="text ">Mô tả sản phẩm: </label>
                <textarea 
                style={{border: '1px solid black'}}
                size-width="190px"
                rows="5"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={data.description}
                />{" "}
                <br /> <br />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  defaultValue={data.file_path}
                />{" "}
                <br /> <br />
                <img
                  style={{ width: 100 }}
                  src={"http://localhost:8000/" + data.file_path}
                  alt=""
                />
                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <button onClick={() => editProduct(data.id)}>
                      Update Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;

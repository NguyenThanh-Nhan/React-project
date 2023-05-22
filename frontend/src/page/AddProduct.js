import Header from "../container/Header";
import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addProduct() {
    console.warn(name, file, price, description);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);
    let result = await fetch("http://localhost:8000/api/addproduct", {
      method: "POST",
      body: formData,
    });
    alert("Data has been save");
  }

  return (
    <>
     <Header />
      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-dark">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill" /> Add Product
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />{" "}
        <br />
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          placeholder="file"
        />{" "}
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
        />{" "}
        <br />
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />{" "}
        <br />
                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                       <button onClick={addProduct} className="btn btn-primary">
          Add Product
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

export default AddProduct;

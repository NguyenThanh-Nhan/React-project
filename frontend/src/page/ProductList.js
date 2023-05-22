import Header from "../container/Header";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://localhost:8000/api/list");
        const data = await result.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function deleteOperation(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
        });
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="card-body">
          <h1>Product List</h1>
          <div className="table-responsive">
            <Table className="table table-bordered border-dark table-dark table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        style={{ width: 100 }}
                        src={`http://localhost:8000/${item.file_path}`}
                        alt={item.name}
                      />
                    </td>
                    <td>
                      <span
                        onClick={() => deleteOperation(item.id)}
                        className="delete m-lg-2"
                      >
                        Delete
                      </span>
                      <Link
                        to={"update/" + item.id}
                        style={{ textDecoration: "none" }}
                      >
                        <span className="update">Update</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from './container/Header';
import Login from "./page/Login";
import Register from "./page/Register";
import AddProduct from "./page/AddProduct";
import UpdateProduct from "./page/UpdateProduct";
import Protected from "./page/Protected";
import ProductList from "./page/ProductList";
import SearchProduct from "./page/SearchProduct";
import Home from "./page/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        {/* <h1>Ecomm project</h1> */}
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/add" element={<Protected Cmp={AddProduct} />}></Route>
          <Route
            path="/update/:id"
            element={<Protected Cmp={UpdateProduct} />}
          ></Route>
          <Route
            path="/search"
            element={<Protected Cmp={SearchProduct} />}
          ></Route>
          <Route path="/" element={<Protected Cmp={ProductList} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

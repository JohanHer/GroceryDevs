import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home.component";
import AddProducto from "./components/add-producto.component";
import Producto from "./components/producto.component";
import ProductoList from "./components/producto-list.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/home"} className="navbar-brand">
            GroceyDevs Store
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/productos"} className="nav-link">
              Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Añadir productos
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/productos" element={<ProductoList/>} />
            <Route path="/add" element={<AddProducto/>} />
            <Route path="/productos/:id" element={<Producto/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

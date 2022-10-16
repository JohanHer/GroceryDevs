import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddInventory from "./components/add-inventory.component";
import Inventory from "./components/inventory.component";
import InventoryList from "./components/inventory-list.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/inventory"} className="navbar-brand">
            Store
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/inventory"} className="nav-link">
              Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<InventoryList/>} />
            <Route path="/inventory" element={<InventoryList/>} />
            <Route path="/add" element={<AddInventory/>} />
            <Route path="/inventory/:id" element={<Inventory/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

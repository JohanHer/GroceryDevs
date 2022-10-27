import React, { Component } from "react";
import ProductosDataService from "../services/productos.service";
import { Link } from "react-router-dom";

export default class ProductoList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNombre = this.onChangeSearchNombre.bind(this);
    this.retrieveProductos = this.retrieveProductos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProducto = this.setActiveProducto.bind(this);
    this.removeAllProductos = this.removeAllProductos.bind(this);
    this.searchNombre = this.searchNombre.bind(this);

    this.state = {
      productos: [],
      currentProducto: null,
      currentIndex: -1,
      searchNombre: ""
    };
  }

  componentDidMount() {
    this.retrieveProductos();
  }

  onChangeSearchNombre(e) {
    const searchNombre = e.target.value;

    this.setState({
      searchNombre: searchNombre
    });
  }

  retrieveProductos() {
    ProductosDataService.getAll()
      .then(response => {
        this.setState({
          productos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProductos();
    this.setState({
      currentProducto: null,
      currentIndex: -1
    });
  }

  setActiveProducto(producto, index) {
    this.setState({
      currentProducto: producto,
      currentIndex: index
    });
  }

  removeAllProductos() {
    ProductosDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNombre() {
    this.setState({
      currentProducto: null,
      currentIndex: -1
    });

    ProductosDataService.findByNombre(this.state.searchNombre)
      .then(response => {
        this.setState({
          productos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchNombre, productos, currentProducto, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchNombre}
              onChange={this.onChangeSearchNombre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNombre}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Product List</h4>

          <ul className="list-group">
            {productos &&
              productos.map((producto, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProducto(producto, index)}
                  key={index}
                >
                  {producto.nombre}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProductos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProducto ? (
            <div>
              <h4>Products details</h4>
              <div>
                <label>
                  <strong>Nu Item:</strong>
                </label>{" "}
                {currentProducto.nu_item}
              </div>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentProducto.nombre}
              </div>
              <div>
                <label>
                  <strong>Descripción:</strong>
                </label>{" "}
                {currentProducto.descripcion}
              </div>
              <div>
                <label>
                  <strong>UrlImagen:</strong>
                </label>{" "}
                {currentProducto.urlImagen}
              </div>

              <div>
                <label>
                  <strong>Precio:</strong>
                </label>{" "}
                {currentProducto.precio}
              </div>
              <div>
                <label>
                  <strong>Stock:</strong>
                </label>{" "}
                {currentProducto.stock}
              </div>

              
              <Link
                to={"/productos/" + currentProducto.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

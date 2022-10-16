import React, { Component } from "react";
import ProductosDataService from "../services/productos.service";

export default class AddProducto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeCaracteristicas = this.onChangeCaracteristicas.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangeNu_item = this.onChangeNu_item.bind(this);
    this.onChangeUrlImagen = this.onChangeUrlImagen.bind(this);
    this.onChangePrecio = this.onChangePrecio.bind(this);
    this.saveProducto = this.saveProducto.bind(this);
    this.newProducto = this.newProducto.bind(this);

    this.state = {
      id: null,
        nu_item: "",
        nombre: "",
        descripcion: "",
        urlImagen: "",
        caracteristicas: "",
        precio: "",
        stock: ""
    };
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }
  onChangeNu_item(e) {
    this.setState({
      nu_item: e.target.value
    });
  }
  onChangeDescripcion(e) {
    this.setState({
      descripcion: e.target.value
    });
  }
  onChangeCaracteristicas(e) {
    this.setState({
      caracteristicas: e.target.value
    });
  }
  onChangeUrlImagen(e) {
    this.setState({
      urlImagen: e.target.value
    });
  }
  onChangePrecio(e) {
    this.setState({
      precio: e.target.value
    });
  }
  onChangeStock(e) {
    this.setState({
      stock: e.target.value
    });
  }

  saveProducto() {
    var data = {
      nu_item: this.state.nu_item,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      caracteristicas: this.state.caracteristicas,
      urlImagen: this.state.urlImagen,
      precio: this.state.precio,
      stock: this.state.stock
    };

    ProductosDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nu_item: response.data.nu_item,
          nombre: response.data.nombre,
          descripcion: response.data.descripcion,
          carateristicas: response.data.carateristicas,
          urlImagen: response.data.urlImagen,
          precio: response.data.precio,
          stock: response.data.stock,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProducto() {
    this.setState({
      id: null,
      nu_item: "",
      nombre: "",
      descripcion: "",
      urlImagen: "",
      caracteristicas: "",
      precio: "",
      stock: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted new product successfully!</h4>
            <button className="btn btn-success" onClick={this.newProducto}>
              Add new product
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nu_item">Nu_Item</label>
              <input
                type="text"
                className="form-control"
                id="nu_item"
                required
                value={this.state.nu_item}
                onChange={this.onChangeNu_item}
                name="nu_item"
              />
            </div>

            <div className="form-group">
              <label htmlFor="caracteristicas">Características</label>
              <input
                type="text"
                className="form-control"
                id="caracteristicas"
                required
                value={this.state.caracteristicas}
                onChange={this.onChangeCaracteristicas}
                name="caracteristicas"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.descripcion}
                onChange={this.onChangeDescripcion}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="urlImagen">Url Imagen</label>
              <input
                type="text"
                className="form-control"
                id="urlImagen"
                required
                value={this.state.urlImagen}
                onChange={this.onChangeUrlImagen}
                name="urlImagen"
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="text"
                className="form-control"
                id="precio"
                required
                value={this.state.precio}
                onChange={this.onChangePrecio}
                name="precio"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="text"
                className="form-control"
                id="stock"
                required
                value={this.state.stock}
                onChange={this.onChangeStock}
                name="stock"
              />
            </div>
            <button onClick={this.saveProducto} className="btn btn-success">
              Submit
            </button>

          </div>
        )}
      </div>
    );
  }
}

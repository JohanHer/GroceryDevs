import React, { Component } from "react";
import ProductosDataService from "../services/productos.service";
import { withRouter } from '../common/with-router';


class Productos extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeCaracteristicas = this.onChangeCaracteristicas.bind(this);
    this.onChangeUrlImagen = this.onChangeUrlImagen.bind(this);
    this.onChangePrecio = this.onChangePrecio.bind(this);
    this.getProducto = this.getProducto.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangeNu_item = this.onChangeNu_item.bind(this);
    this.updateProducto = this.updateProducto.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);

    this.state = {
      currentProducto: {
        id: null,
        nu_item: "",
        nombre: "",
        descripcion: "",
        urlImagen: "",
        carateristicas: "",
        precio: "",
        stock: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProducto(this.props.router.params.id);
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProducto: {
          ...prevState.currentProducto,
          nombre: nombre
        }
      };
    });
  }
  onChangeNu_item(e) {
    const nu_item = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProducto: {
          ...prevState.currentProducto,
          nu_item: nu_item
        }
      };
    });
  }

  onChangeDescripcion(e) {
    const descripcion = e.target.value;
    
    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        descripcion: descripcion
      }
    }));
  }
  onChangeUrlImagen(e) {
    const urlImagen = e.target.value;
    
    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        urlImagen: urlImagen
      }
    }));
  }

  onChangePrecio(e) {
    const precio = e.target.value;
    
    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        precio: precio
      }
    }));
  }

  onChangeCaracteristicas(e) {
    const caracteristicas = e.target.value;
    
    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        caracteristicas: caracteristicas
      }
    }));
  }

  onChangeStock(e) {
    const stock = e.target.value;
    
    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        stock: stock
      }
    }));
  }
  getProducto(id) {
    ProductosDataService.get(id)
      .then(response => {
        this.setState({
          currentProducto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // updateStock(status) {
  //   var data = {
  //     id: this.state.currentInventory.id,
  //     name: this.state.currentInventory.name,
  //     description: this.state.currentInventory.description,
  //     quantity: this.state.currentInventory.quantity,
  //     uni: this.state.currentInventory.unitary_price,
  //     stock: status
  //   };

  //   ProductosDataService.update(this.state.currentProducto.id, data)
  //     .then(response => {
  //       this.setState(prevState => ({
  //         currentProducto: {
  //           ...prevState.currentProducto,
  //           stock: status
  //         }
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  updateProducto() {
    ProductosDataService.update(
      this.state.currentProducto.id,
      this.state.currentProducto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProducto() {    
    ProductosDataService.delete(this.state.currentProducto.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/productos');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProducto } = this.state;

    return (
      <div>
        {currentProducto ? (
          <div className="edit-form">
            <h4>Product update</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProducto.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Nu_Item</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProducto.nu_item}
                  onChange={this.onChangeNu_item}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={currentProducto.descripcion}
                  onChange={this.onChangeDescripcion}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ulrImagen">UrlImagen</label>
                <input
                  type="text"
                  className="form-control"
                  id="ulrImagen"
                  value={currentProducto.urlImagen}
                  onChange={this.onChangeUrlImagen}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitary_price">Precio</label>
                <input
                  type="text"
                  className="form-control"
                  id="unitary_price"
                  value={currentProducto.precio}
                  onChange={this.onChangePrecio}
                />
              </div>

              <div className="form-group">
                <label htmlFor="unitary_price">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  id="unitary_price"
                  value={currentProducto.stock}
                  onChange={this.onChangeStock}
                />
              </div>

              </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProducto}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProducto}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Productos);
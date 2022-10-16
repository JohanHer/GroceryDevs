import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import { withRouter } from '../common/with-router';


class Inventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnitary_price = this.onChangeUnitary_price.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);

    this.state = {
      currentInventory: {
        id: null,
        name: "",
        description: "",
        quantity: "",
        unitary_price: "",
        stock: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getInventory(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInventory: {
          ...prevState.currentInventory,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        description: description
      }
    }));
  }
  onChangeQuantity(e) {
    const quantity = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        quantity: quantity
      }
    }));
  }

  onChangeUnitary_price(e) {
    const unitary_price = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        unitary_price: unitary_price
      }
    }));
  }

  getInventory(id) {
    InventoryDataService.get(id)
      .then(response => {
        this.setState({
          currentInventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStock(status) {
    var data = {
      id: this.state.currentInventory.id,
      name: this.state.currentInventory.name,
      description: this.state.currentInventory.description,
      quantity: this.state.currentInventory.quantity,
      uni: this.state.currentInventory.unitary_price,
      stock: status
    };

    InventoryDataService.update(this.state.currentInventory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentInventory: {
            ...prevState.currentInventory,
            stock: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateInventory() {
    InventoryDataService.update(
      this.state.currentInventory.id,
      this.state.currentInventory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The inventory was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteInventory() {    
    InventoryDataService.delete(this.state.currentInventory.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/inventory');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentInventory } = this.state;

    return (
      <div>
        {currentInventory ? (
          <div className="edit-form">
            <h4>Inventory update</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentInventory.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentInventory.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={currentInventory.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitary_price">Unitary_Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="unitary_price"
                  value={currentInventory.unitary_price}
                  onChange={this.onChangeUnitary_price}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentInventory.stock ? "Published" : "Pending"}
              </div>
            </form>

            {currentInventory.stock ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStock(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStock(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteInventory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateInventory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a inventory...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Inventory);
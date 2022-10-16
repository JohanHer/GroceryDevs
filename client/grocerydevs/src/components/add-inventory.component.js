import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";

export default class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnitary_price = this.onChangeUnitary_price.bind(this);
    this.saveInventory = this.saveInventory.bind(this);
    this.newInventory = this.newInventory.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 
      quantity: "",
      unitary_price: "",
      stock: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    });
  }
  onChangeUnitary_price(e) {
    this.setState({
      unitary_price: e.target.value
    });
  }
  saveInventory() {
    var data = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      unitary_price: this.state.unitary_price
    };

    InventoryDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.name,
          description: response.data.description,
          quantity: response.data.quantity,
          unitary_price: response.data.unitary_price,
          stock: response.data.stock,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newInventory() {
    this.setState({
      id: null,
      name: "",
      description: "",
      quantity: "",
      unitary_price: "",
      stock: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted new product successfully!</h4>
            <button className="btn btn-success" onClick={this.newInventory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Quantity</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="unitary_price">Unitary_price</label>
              <input
                type="text"
                className="form-control"
                id="unitary_price"
                required
                value={this.state.unitary_price}
                onChange={this.onChangeUnitary_price}
                name="unitary_price"
              />
            </div>
            <button onClick={this.saveInventory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

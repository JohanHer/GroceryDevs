import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import { Link } from "react-router-dom";

export default class InvetoryList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveInventories = this.retrieveInventories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInventory = this.setActiveInventory.bind(this);
    this.removeAllInventories = this.removeAllInventories.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      Inventories: [],
      currentInventory: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveInventories();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveInventories() {
    InventoryDataService.getAll()
      .then(response => {
        this.setState({
          inventories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveInventory();
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });
  }

  setActiveInventory(inventory, index) {
    this.setState({
      currentInventory: inventory,
      currentIndex: index
    });
  }

  removeAllInventories() {
    InventoryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });

    InventoryDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          inventories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, inventories, currentInventory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Inventory List</h4>

          <ul className="list-group">
            {inventories &&
              inventories.map((inventory, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInventory(inventory, index)}
                  key={index}
                >
                  {inventory.name}
                  
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllInventories}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentInventory ? (
            <div>
              <h4>Inventory details</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentInventory.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentInventory.description}
              </div>
              <div>
                <label>
                  <strong>Quantity:</strong>
                </label>{" "}
                {currentInventory.quantity}
              </div>

              <div>
                <label>
                  <strong>Unitary_Price:</strong>
                </label>{" "}
                {currentInventory.unitary_price}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentInventory.stock ? "Published" : "Pending"}
              </div>

              <Link
                to={"/inventory/" + currentInventory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Inventory...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

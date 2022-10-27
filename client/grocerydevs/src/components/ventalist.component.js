import React, { Component } from "react";
import VentasDataService from "../services/ventas.service";

export default class VentaList extends Component {
  constructor(props) {
    super(props);
    this.setActiveVenta = this.setActiveVenta.bind(this);
    this.retrieveVentas = this.retrieveVentas.bind(this);
    this.refreshList = this.refreshList.bind(this);
      

    this.state = {
      ventas: [],
      currentVenta: null,
      currentIndex: -1,
      
    };
  }

  componentDidMount() {
    this.retrieveVentas();
  }

  
  retrieveVentas() {
    VentasDataService.getAll()
      .then(response => {
        this.setState({
          ventas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveVentas();
    this.setState({
      currentVenta: null,
      currentIndex: -1
    });
  }

  setActiveVenta(venta, index) {
    this.setState({
      currentVenta: venta,
      currentIndex: index
    });
  }
  


  render() {
    const {  ventas, } = this.state;

    return (
      <div className="list row">
        
        <div className="col-md-6" >
          <h4>Ventas List</h4>
               
        </div>
        
          <div className="row">

	<div className="col-md-12">

		<table className="table table-striped">
			<thead className="thead-dark">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nu Item</th>
					<th scope="col">Fecha</th>
					<th scope="col">Cliente</th>
					<th scope="col">Valor</th>
					<th scope="col">Confirmado</th>
					</tr>
			</thead> 
			<tbody>

			{ventas.map(item => (

				<tr key={item.id}>
					<td>{item.id}</td>
					<td>{item.nu_item}</td>
					<td>{item.fecha}</td>
					<td>{item.idCliente.nombres} {item.idCliente.apellidos} </td>
					<td>{item.valor}</td>
					<td><div>
                {" "}
                {item.confirmado ? "Completed" : "Pending"}
              </div></td>
          
				</tr>

			))}

			</tbody>

		</table>

	</div>

</div>
        </div>
      
    );
  }
}

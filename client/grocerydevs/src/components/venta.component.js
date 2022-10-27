import  { Component } from "react";
import VentasDataService from "../services/ventas.service";
import { withRouter } from '../common/with-router';


class Ventas extends Component {
  constructor(props) {
    super(props);
    
    this.getVenta = this.getVenta.bind(this);
    
    
  }

  componentDidMount() {
    this.getVenta(this.props.router.params.id);
  }

    
  
  getVenta(id) {
    VentasDataService.get(id)
      .then(response => {
        this.setState({
          currentVenta: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

   

  // render() {
  //   const { currentProducto } = this.state;

  //   return (
  //     <div>
        
  //     </div>
  //   );
  // }
}

export default withRouter(Ventas);
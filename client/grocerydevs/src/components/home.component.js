import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
export default function Home(){
  return(
    <Container>
			<Row className="mt-5">
				<Col xs={{ span: 12}} md={{ span: 6 }} className="mb-5">
					<h2>Bienvenid@ a GroceryDevs Store</h2>
					<p>¡Aquí podrás ver nuestros productos!</p>
					<p>Además podrás añadir tus productos al carrito de compras y pagar como quieras.</p>
					
				</Col>
                <Col>
                    <img
                        className="img-fluid"
                        src="/img/store.svg"
                        alt="GroceryDevs Store"
                    />
    				<p>¡Gestiona tu compras, mejora tu proactividad!</p>
                </Col>
			</Row>
		</Container>
  )
}



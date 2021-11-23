import React from "react";
import {Table} from 'react-bootstrap';
import useSWR from "swr";
import '../ordersDetails.css'
import {Link, useParams} from "react-router-dom";


const fetcher = async url => {
    const res = await fetch(url)
    const datos = await res.json()
    console.log(res, datos)
    if (!res.ok) throw new Error(datos.detail)
    return datos
}


function OrderArticles() {
    let {order_id} = useParams();
    const {data, error} = useSWR(`http://localhost:8000/api/v1/orders/${order_id}/`, fetcher)
    console.log(data)

    return (
        <div className='Container'>
            <Table striped bordered hover variant="dark" className='Table'>
                <thead>
                <tr>
                    <th colSpan="5">ARTICLES</th>
                </tr>
                <tr>
                    <th>#Art</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Origen</th>
                    <th>Precio</th>
                </tr>
                </thead>
                <tbody>

                {
                    data && data.details.map((orden) =>
                        <tr key={orden.articulo_pedido.id}>
                            <td>{orden.articulo_pedido.id}</td>
                            <td>{orden.articulo_pedido.arm_nombre}</td>
                            <td>{orden.articulo_pedido.arm_catergoria_nombre}</td>
                            <td>{orden.articulo_pedido.arm_origen}</td>
                            <td>{orden.articulo_pedido.arm_precio}</td>

                        </tr>
                    )
                }


                </tbody>
                <button>CAMBIAR ESTADO</button>
                <button><Link to={'/orders/'}>VOLVER</Link></button>
            </Table>
        </div>)
}

export default OrderArticles;
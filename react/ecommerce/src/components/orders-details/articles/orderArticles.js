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
                    <th>#</th>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Origin</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>

                {
                    data && data.details.map((orden) => {
                        const { id, arm_name, arm_category_name, arm_origin, arm_price } = orden.order_article
                        return (
                            <tr key={id}>
                            <td>{id}</td>
                            <td>{arm_name}</td>
                            <td>{arm_category_name}</td>
                            <td>{arm_origin}</td>
                            <td>{arm_price}</td>
                        </tr>
                        )
                    })
                }


                </tbody>
                <button>CAMBIAR ESTADO</button>
                <button><Link to={'/orders/'}>VOLVER</Link></button>
            </Table>
        </div>)
}

export default OrderArticles;
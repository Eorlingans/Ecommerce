import React from 'react';
import {Table} from 'react-bootstrap';
import '../ordersDetails.css';
import useSWR from "swr";
import {useParams} from "react-router-dom";

const fetcher = async url => {
    const res = await fetch(url)
    const datos = await res.json()
    console.log(res, datos)
    if (!res.ok) throw new Error(datos.detail)
    return datos
}


function OrderDetails() {
    let {order_id} = useParams();
    console.log("order #", order_id)
    const {data, error} = useSWR(`http://127.0.0.1:8000/api/v1/orders/${order_id}/`, fetcher)
    console.log(data)
    return (

        <div className='Container'>
            <Table striped bordered hover variant="dark" className='Table'>
                <thead>
                <tr>
                    <th colSpan="4">ORDER DETAILS</th>
                </tr>
                <tr>
                    <th colSpan="4">CUSTOMER</th>
                </tr>
                </thead>
                {
                    data && (
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{data.order_username}</td>
                            <td>Document:</td>
                            <td>{[data.order_user.documento]}</td>

                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{[data.order_user.email]}</td>
                            <td>Type of Doc:</td>
                            <td>{[data.order_user.tipo_documento]}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{[data.order_user.address]}</td>
                            <td>Postal Code</td>
                            <td>{[data.order_user.codigo_postal]}</td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td>{[data.order_user.ciudad]}</td>
                            <td>Payment:</td>
                            <td className='payment'></td>
                        </tr>

                        </tbody>
                    )
                }
            </Table>

        </div>


    )
}

export default OrderDetails;
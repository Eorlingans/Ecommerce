import React from "react";
import {Table} from 'react-bootstrap';
import './Orders.css';
import useSWR from "swr";
import {NavLink} from "react-router-dom";


const fetcher = async (url) => {
    const token = localStorage.getItem("token") || ""
    const res = await fetch(url, {headers: {"Authorization": `Bearer ${token}`, "X-CSRFToken": token}})
    const datos = await res.json()
    console.log(res, datos)
    if (!res.ok) throw new Error(datos.detail)
    return datos
}

function OrdersUserType() {
    const is_staff = localStorage.getItem("user_is_staff")
    let url = ``
    console.log(url, "URL ANTES DEL IF")
    console.log(is_staff, "ES STAFF?")
    if (is_staff === '1') {
        console.log("ES STAFF ENTONCES:")
        url = `http://localhost:8000/api/v1/listordersadmin/`


    } else {
        console.log("NO ES STAFF ENTONCES:")
        url = `http://localhost:8000/api/v1/listorders/`
    }
    console.log(url, "DESPUES DEL IF")
    return url
}

function Orders() {
    const dir = OrdersUserType()
    console.log(dir, "DIR")
    const {data, error} = useSWR(dir, fetcher)


    const handleSeeDetail = (order_id) => {
        console.log("go to: ", order_id)
    }
    return (
        <div className='Container'>
            <Table striped bordered hover variant="dark" className='Table'>
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Username</th>
                    <th>Date</th>
                    <th>See order</th>
                </tr>
                </thead>
                <tbody>

                {
                    data && data.map(orden =>
                        <tr>
                            <td>{orden.id}</td>
                            <td>{orden.order_username}</td>
                            <td>{orden.order_date}</td>
                            <td>
                                <button><NavLink to={`/orders/${orden.id}`}>See Details</NavLink></button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>)
}

export default Orders;
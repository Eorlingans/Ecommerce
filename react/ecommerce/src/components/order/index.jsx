import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import OrderDetails from "../orders-details/customer/ordersDetails";
import OrderArticles from "../orders-details/articles/orderArticles";


export const Order = () => {
    let {order_id} = useParams();
    let history = useHistory();
    const handleGoBack = () => {
        history.goBack()
    }
    return (
        <div>
            <button onClick={handleGoBack}>Volver</button>
            `<h2>Order #${order_id}</h2>`
        </div>
    )
}

export const OrderComponent = () => {
    return (
        <>
            <OrderDetails/>
            <OrderArticles/>
        </>
    )
}
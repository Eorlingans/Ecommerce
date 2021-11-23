import {useParams} from "react-router-dom";
import Orders from "./orders";
import {OrderComponent} from "../order";

export const OrderHandle = () => {
    let {order_id} = useParams()
    return (
        <>
            {
                (order_id > 0) ?
                    <OrderComponent/> :
                    <Orders/>
            }
        </>
    )
}
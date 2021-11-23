import React, {useContext} from 'react';
import {Button} from '@material-ui/core';
import {useStateValue} from '../../../StateProvider';
import {getTotalBasket} from '../../../reducer';
import './total.css'
import {useHistory} from "react-router-dom";
import {SessionContext} from "../../../session";

const Total = () => {
    const {isLoggedIn} = useContext(SessionContext)
    const history = useHistory()
    const [{basket}, dispatch] = useStateValue();
    const handleCheckOut = (e) => {
        if (!isLoggedIn()) {
            history.push("/Login#Shop")
            return
        }
        history.push("/Payment")
    }
    return (
        <div class="total">
            <div className="container-pago">
                <hgroup>
                    <h5>Total Items: {basket.length}</h5>
                    <h5>Total: {getTotalBasket(basket)} uSd</h5>
                    {console.log(basket)}
                </hgroup>
                <Button variant="contained" color="success" onClick={handleCheckOut} disabled={basket.length === 0}>Check
                    out</Button>
            </div>
        </div>

    )
}
export default Total


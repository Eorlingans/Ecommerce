import './total/total.css'
import Grid from '@mui/material/Grid';
import React from 'react';
import './Cards.css'
import CheckoutCard from './checkoutCard';
import Total from './total/total';
import {useStateValue} from '../../StateProvider';


export default function CheckoutPage() {

    const [{basket}, dispatch] = useStateValue();

    return (
        <div className="Card">

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="shoppingcart">

                        <h1>SHOPPING CART</h1>

                    </div>
                </Grid>
                {console.log(basket)}
                <Grid column={12} container spacing={0}>

                    {
                        basket?.map(articulo =>
                            <Grid item xs={8} sm={4} md={3}>
                                <CheckoutCard
                                    id={articulo.id}
                                    arm_catergoria={articulo.arm_catergoria_nombre}
                                    arm_nombre={articulo.arm_nombre}
                                    arm_precio={articulo.arm_precio}
                                    arm_valoracion={articulo.arm_valoracion}
                                    arm_foto={articulo.arm_foto}

                                />

                            </Grid>)
                    }

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div class="cont-total">
                        <Total/>
                    </div>
                </Grid>

            </Grid>


        </div>
    )

} 
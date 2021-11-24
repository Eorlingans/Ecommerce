import React, {useEffect} from 'react'
import Product from './Product'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Cards.css';
import {useParams} from 'react-router-dom';
import useSWR, {useSWRConfig} from 'swr';

const fetcher = async url => {
    const res = await fetch(url)
    const datos = await res.json()
    console.log(res, datos)
    if (!res.ok) throw new Error(datos.detail)
    return datos
}

function GridArmas() {
    let {categoria} = useParams();
    const {mutate} = useSWRConfig()
    const {data, error} = useSWR(`http://localhost:8000/api/v1/${categoria}/`, fetcher)

    useEffect(() => {
        mutate(`http://localhost:8000/api/v1/${categoria}/`, data);

        // eslint-disable-next-line
    }, [categoria])

    useEffect(() => {
        console.log(error)
    }, [error])
    return (
        <div className="Card">
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 0, md: 1}} columns={{xs: 1, sm: 4, md: 16}}>

                    {error && <h2>Hubo un error... {error?.message}</h2>}
                    {
                        (data && !error) && data.map(producto =>
                            <Grid Product xs={1} sm={2} md={4} key={producto.id}>

                                <Product
                                    key={producto.id}
                                    id={producto.id}
                                    arm_catergoria={producto.arm_category_name}
                                    arm_nombre={producto.arm_name}
                                    arm_precio={producto.arm_price}
                                    arm_foto={producto.arm_picture}
                                    arm_valoracion={producto.arm_assessment}
                                    arm_descripcion={producto.arm_description}
                                    arm_origen={producto.arm_origin}
                                    arm_calibre={producto.arm_calibre}
                                    arm_velocidad={producto.arm_speed}
                                    arm_tiemporecarga={producto.arm_rechargetime}
                                    arm_capacidad={producto.arm_capacity}
                                    arm_peso={producto.arm_weight}
                                />

                            </Grid>
                        )


                    }
                </Grid>
            </Box>
        </div>
    )
}

export default GridArmas



import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import './Cards.css'
import {Card, CardActions, CardHeader, CardMedia, IconButton, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer';

//Estilos de Materialui
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '6px',
        padding: '5px',
        color: 'white',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        backgroundSize: 'contain',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    tarjeta: {
        maxWidth: 345,
        margin: '6px',
        padding: '5px',
        backgroundImage: `url("http://d3ugyf2ht6aenh.cloudfront.net/stores/092/965/products/i40-048-tela-gabardina-8-onzas-verde-militar-tienda-de-telas-online-trapitos-com-ar1-07d4bd10df0b7b0d3616018272973773-320-0.jpg")`,
    },
    Description: {

        fontWeight: 'bold',
        color: 'white',
        textShadow: '1px 1px 3px black',
        paddingBottom: '10px',
    }

}));


function CheckoutCard({
                          id,
                          arm_nombre,
                          arm_precio,
                          arm_foto,
                          arm_valoracion,


                      } = {}) {
    const classes = useStyles();
    const [{basket}, dispatch] = useStateValue();


    const removeItem = () => dispatch({
        type: actionTypes.REMOVE_ITEM,
        id
    })

    return (

        <Card key={id} className={classes.tarjeta} elevation={4}>
            <div className="Producto">
                <CardHeader
                    avatar={

                        <Typography>
                            <Typography
                                variant='h5'
                                //color={'rgb(247 149 2)'}
                                noWrap
                                sx={{maxWidth: "20px"}}
                                style={{color: "#FBCF2A"}}
                            >
                                {arm_nombre}
                            </Typography>
                        </Typography>
                    }
                    action={
                        <Typography
                            className={classes.action}
                            variant='h6'
                            color='textSecondary'

                            style={{
                                color: "Black",
                                border: "1px solid #409b1c",
                                padding: "2px",
                                backgroundColor: "green",
                                borderRadius: "10px"
                            }}

                        >
                            u$d
                            {arm_precio}
                        </Typography>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={arm_foto}
                />


                <CardActions className={classes.acciones} disableSpacing>

                    <IconButton aria-label="share">
                        {Array(arm_valoracion)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>&#10731;</p>
                            ))}
                    </IconButton>
                    <IconButton>
                        <Delete fontSize='large' onClick={removeItem}/>
                    </IconButton>

                </CardActions>
            </div>
        </Card>

    );
}

export default CheckoutCard


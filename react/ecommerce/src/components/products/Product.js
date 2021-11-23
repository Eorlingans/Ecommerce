import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import './Cards.css'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Collapse,
    IconButton,
    Typography
} from '@material-ui/core';
import {AddShoppingCart, ExpandMore} from '@material-ui/icons';
import {actionTypes} from '../../reducer';
import {useStateValue} from '../../StateProvider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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
            zIndex: '1000',
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
        backgroundColor: '#4c593f',
    },
    Description: {

        fontWeight: 'bold',
        color: 'white',
        textShadow: '1px 1px 3px black',
        paddingBottom: '10px',
    }

}));


export default function Product({
                                    id,
                                    arm_catergoria,
                                    arm_nombre,
                                    arm_precio,
                                    arm_foto,
                                    arm_valoracion,
                                    arm_descripcion,
                                    arm_origen,
                                    arm_calibre,
                                    arm_tiemporecarga,
                                    arm_velocidad,
                                    arm_capacidad,
                                    arm_peso

                                }) {
    const classes = useStyles();
    const [{basket}, dispatch] = useStateValue();


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} color="info"/>;
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToBasket = () => {
        dispatch({
            type: actionTypes.ADD_TO_BASKET,
            item: {
                id,
                arm_catergoria,
                arm_nombre,
                arm_precio,
                arm_foto,
                arm_valoracion,
            }
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        addToBasket();
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

        <Card key={id} className={classes.tarjeta} elevation={4}>
            <div className="Producto">
                <CardHeader
                    avatar={
                        <div>
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
                            <Chip label={arm_catergoria} sx={{margin: "auto 0"}} color="primary" size="small"/>
                        </div>
                    }
                    action={
                        <Typography
                            className={classes.action}
                            variant='h6'
                            color='textSecondary'
                        >
                            u$d
                            {arm_precio}
                        </Typography>
                    }
                    //title={arm_nombre}
                    //subheader={arm_catergoria}
                />
                <CardMedia
                    className={classes.media}
                    image={arm_foto}
                />
                <CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography variant="body2" color="textSecondary" component="p">

                            <Typography className={classes.Description}>
                                {arm_descripcion}
                            </Typography>

                        </Typography>
                        <table class="table table-dark">
                            <thead>
                            <tr>
                                <th>
                                    Caracteristicas
                                </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Origen</td>
                                <td>{arm_origen}</td>
                            </tr>
                            <tr>
                                <td>Calibre</td>
                                <td>{arm_calibre}</td>

                            </tr>
                            <tr>
                                <td>Capacidad</td>
                                <td>{arm_capacidad} rondas</td>
                            </tr>
                            <tr>
                                <td>Peso</td>
                                <td>{arm_peso} Grs</td>
                            </tr>
                            <tr>
                                <td>Velocidad</td>
                                <td>{arm_velocidad}</td>
                            </tr>
                            <tr>
                                <td>T. Recarga</td>
                                <td>{arm_tiemporecarga} s</td>
                            </tr>
                            </tbody>
                        </table>
                    </Collapse>
                </CardContent>

                <CardActions className={classes.acciones} disableSpacing>
                    <IconButton aria-label="Comprar" onClick={handleClick}>
                        <AddShoppingCart fontSize='large'/>
                    </IconButton>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                            product added successfully!
                        </Alert>
                    </Snackbar>
                    <IconButton aria-label="share">
                        {Array(arm_valoracion)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>&#10731;</p>
                            ))}
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMore/>

                    </IconButton>
                </CardActions>
            </div>
        </Card>

    );
}


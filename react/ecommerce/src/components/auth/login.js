import React, {useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

import './registro.css';
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

function Login() {
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const history = useHistory()
    const [hash, setHash] = React.useState("")
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    //Identifica de donde viene
    useEffect(() => {
        setHash(history.location.hash)
        console.log(history)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            setError("")
            setOpen(false)
            fetch('http://127.0.0.1:8000/api/token/',
                {
                    method: 'POST', cors: true, body: JSON.stringify({
                        email, password
                    }),
                    headers: {"Content-Type": "application/json; charset=utf8"}
                })
                .then(res => {
                    const errors_status_code = [400, 401]
                    console.log(res)
                    if (!res.ok) throw new Error(res.status)
                    else return res.json()
                })
                .then(json => {
                    console.log(json)
                    setSuccess("Acceso concedido")
                    setOpen(true)

                    localStorage.removeItem("user_is_staff")
                    localStorage.setItem("user_is_staff", (json.is_staff) ? "1" : "0")

                    localStorage.removeItem("user_id")
                    localStorage.setItem("user_id", (json.user_id) ? json.user_id : "0")

                    localStorage.removeItem("token")
                    localStorage.setItem("token", json.access)

                    const data = localStorage.getItem("token")
                    const is_staff = localStorage.getItem("user_is_staff")
                    console.log("local storage obtenido: ", data, (is_staff === "1"))
                    if (hash === "#Shop") history.push("/Payment")
                    if (hash === "") history.push("/Home")
                    //Si devuelve error se ejecuta este bloque:
                }).catch(error => {
                setOpen(true)
                console.log(error)

                //Convierto el String del error a entero
                const error_nro = parseInt(error.message)


                //Manejo la respuesta segun el numero de error
                switch (error_nro) {
                    case 400:
                        setError("Must enter valid credentials")
                        break
                    case 401:
                        setError("Invalid credentials")
                        break
                }

            })
            //Muestro el error por pantalla
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <div className="registro">
            <div className="formularioLogin">
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>EMAIL ADDRESS</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                                      onChange={({target: {value}}) => setEmail(value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={({target}) => {
                            setPassword(target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Link to="/Register">Register</Link>
                    </Form.Group>
                    <Button variant='warning' type="submit">
                        Submit
                    </Button>
                </Form>
                {/*EN CASO DE ERROR MUESTRA ESTE SNACKBAR:*/}
                <Snackbar open={open && error !== ""} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {error}
                    </Alert>
                </Snackbar>
                {/*SI NO HAY ERROR MUESTRA ESTE SNACKBARR:*/}
                <Snackbar open={open && success !== ""} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {success}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Login
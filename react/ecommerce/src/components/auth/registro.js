import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap"
import './registro.css'
import {useHistory} from "react-router-dom";


function Register() {
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [user, setUser] = React.useState()
    const [lastname, setLastname] = React.useState()
    const [address, setAddress] = React.useState()
    const [ciudad, setCiudad] = React.useState()
    const [codigo_postal, setCodigoPostal] = React.useState()
    const [documento, setDocumento] = React.useState()
    const [tipo_documento, setTipoDocumento] = React.useState()
    const [error, setError] = React.useState("");
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tipo_documento)
        try {
            setError("")
            fetch('http://127.0.0.1:8000/register/',
                {
                    method: 'POST', cors: true, body: JSON.stringify({
                        email,
                        user,
                        lastname,
                        password,
                        address,
                        ciudad,
                        codigo_postal,
                        documento,
                        tipo_documento
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
                    history.push("/Login")

                }).catch(error => {
                console.log(error)

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
                    <div>REGISTER</div>
                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={user}
                                          onChange={({target: {value}}) => setUser(value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Enter Last Name" value={lastname}
                                          onChange={({target: {value}}) => setLastname(value)}/>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDNI">
                            <Form.Label>Document</Form.Label>
                            <Form.Control value={documento}
                                          onChange={({target: {value}}) => setDocumento(value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridType">
                            <Form.Label>Type of Document</Form.Label>
                            <Form.Control value={tipo_documento}
                                          onChange={({target: {value}}) => setTipoDocumento(value)}/>
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="address" placeholder="San Martin 3986"
                                      value={address} onChange={({target: {value}}) => setAddress(value)}/>
                    </Form.Group>


                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={ciudad} onChange={({target: {value}}) => setCiudad(value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Santa Fe">
                                <option>Santa Fe</option>
                                <option>Buenos Aires</option>
                                <option>Cordoba</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control value={codigo_postal}
                                          onChange={({target: {value}}) => setCodigoPostal(value)}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                          value={email} onChange={({target: {value}}) => setEmail(value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          value={password} onChange={({target: {value}}) => setPassword(value)}/>
                        </Form.Group>
                    </Row>


                    <Button variant='warning' type="submit" color="red" className="ButtonSubmit">
                        Submit
                    </Button>

                </Form>
            </div>
        </div>
    )

}

export default Register

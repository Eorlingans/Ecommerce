import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {makeStyles} from '@material-ui/core/styles';
import {Link, useHistory} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown,} from 'react-bootstrap';
import {IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useStateValue} from '../../StateProvider';
import Badge from '@material-ui/core/Badge/Badge';


import "./navbar.css";
import {SessionContext} from "../../session";
import {LogoutOutlined} from "@mui/icons-material";


const useStyles = makeStyles((theme) => ({

    Badge: {
        color: 'Yellow',
        marginRight: '6px',

    },


}));


function Navegacion() {
    const classes = useStyles();
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    const {isLoggedIn, isUserStaff, Logout} = useContext(SessionContext)
    const is_staff = localStorage.getItem("user_is_staff")
    const handleLogout = () => {
        Logout()
        history.push("/Login")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <img
                    src="https://seeklogo.com/images/C/counter-strike-global-offensive-logo-CFCEFBBCE2-seeklogo.com.png"
                    width="40" height="40" className="d-inline-block align-top" alt="VALVE"/>
                <Navbar.Brand as={Link} to="/home">VALVE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Category" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/Pistolas">
                                Pistols
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Shotguns">
                                Shotguns
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Submachines">
                                Submachines
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Rifles">
                                Rifles
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Machineguns">
                                Machine Guns
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to="/Equipment">
                                Equipment
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {
                            isLoggedIn() &&

                            <NavDropdown title="My account" id="collasible-nav-dropdown">

                                <NavDropdown.Item size="5" as={Link} to="/orders">
                                    My Orders
                                </NavDropdown.Item>
                                {
                                    isUserStaff() &&
                                    <>
                                        <NavDropdown.Item size="5" as={Link} to="/EditProduct">
                                            Edit Products
                                        </NavDropdown.Item>
                                        <NavDropdown.Item size="5" as={Link} to="/EditCategory">
                                            Edit Category
                                        </NavDropdown.Item>
                                    </>
                                }
                            </NavDropdown>

                        }


                        <Link to="/ShoppingCart">
                            <IconButton>
                                {console.log(basket, basket?.length)}
                                <Badge className={classes.Badge} badgeContent={basket?.length}>
                                    {<ShoppingCartIcon color="warning"/>}
                                </Badge>
                            </IconButton>

                        </Link>
                        {
                            isLoggedIn() ?
                                <IconButton onClick={handleLogout}>
                                    <LogoutOutlined color="error"/>
                                </IconButton>
                                :
                                <Nav.Link as={Link} to="/Login">
                                    Sing In
                                </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );


}

export default Navegacion
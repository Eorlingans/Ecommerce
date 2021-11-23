import './App.css';
import React, {useContext} from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import GridArmas from './components/products/grid';
import {createTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import Register from './components/auth/registro';
import Login from './components/auth/login'
import SiteInConstruccion from './components/Site/Site';
import CheckoutPage from './components/cart/checkoutPage.js';
import Payment from "./components/payment/payment";
import {SessionContext} from "./session";
import {Layout} from "./components/layout";
import {OrderHandle} from "./components/orders/OrderHandle";
import {EditCategory} from "./components/Edits/EditCategory";


const themes = createTheme({
    palette: {mode: 'dark'},
    typography: {
        fontFamily: 'Quantico, Changa',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Quantico','Changa','Noto Sans',sans-serif';
        }
      `,
        },
    },
});


function App() {
    const {isLoggedIn} = useContext(SessionContext)
    return (
        <ThemeProvider theme={themes}>
            <CssBaseline>
                <Router>
                    <Switch>
                        <Route path="/Login" exact>
                            <Layout component={<Login/>}/>
                        </Route>
                        <Route path="/Home" exact>
                            <Layout component={<SiteInConstruccion/>}/>
                        </Route>
                        <Route path="/ShoppingCart" exact>
                            <Layout component={<CheckoutPage/>}/>
                        </Route>
                        <Route path="/Payment" exact>
                            <Layout component={<Payment/>}/>
                        </Route>
                        <Route path="/Register" exact>
                            <Layout component={<Register/>}/>
                        </Route>
                        <Route path="/" exact>
                            <Layout component={<SiteInConstruccion/>}/>
                        </Route>
                        <Route path="/orders" exact>
                            <Layout component={<OrderHandle/>}/>
                        </Route>
                        <Route path="/EditCategory" exact>
                            <Layout component={<EditCategory/>}/>
                        </Route>
                        <Route path="/orders/:order_id">
                            <Layout component={<OrderHandle/>}/>
                        </Route>
                        <Route path="/:categoria">
                            <Layout component={<GridArmas/>}/>
                        </Route>
                    </Switch>
                </Router>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;





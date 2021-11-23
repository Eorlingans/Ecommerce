import Navegacion from "../navbar/navbar";
import Carousel from "../slider/carousel";
import React from "react";
import Footer from "../footer/footer";

export const Layout = ({component: Component}) => {
    return (
        <div>
            <Navegacion/>
            <Carousel/>
            {Component}
            <Footer/>
        </div>
    )
}
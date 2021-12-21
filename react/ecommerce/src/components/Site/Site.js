import React from 'react'
import './site.css'
import {useSearchContext} from "../../SearchContext";
import GridArmas from "../products/grid";

export default function SiteInConstruccion() {
    const { search } = useSearchContext()
    const HomeInConstruction = () => (
        <div className="enConstruccion">
            <h1>SITIO EN CONSTRUCCION</h1>
        </div>
    )
    return (
        search === '' ?
            <HomeInConstruction/> :
            <GridArmas home/>
    )
}
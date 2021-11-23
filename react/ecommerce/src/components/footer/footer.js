import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="main-footer Footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                        <h3>VALVE CORP</h3>
                        <h4 className="list-unstyled">
                            <li>Washington, USA</li>
                            <li>342-420-6969</li>
                        </h4>
                    </div>
                    {/* Column2 */}
                    <div className="col">
                        <h4>Stuff</h4>
                        <ul className="list-unstyled">
                            <li>DANK MEMES</li>
                            <li>OTHER STUFF</li>
                            <li>GUD STUFF</li>
                        </ul>
                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <h4>WELL ANOTHER COLUMN</h4>
                        <ul className="list-unstyled">
                            <li>DANK MEMES</li>
                            <li>OTHER STUFF</li>
                            <li>GUD STUFF</li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
                        Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
import React, {useContext, useEffect, useState} from 'react';
import {fetcher} from "../../service_tools";
import Cleave from 'cleave.js/react';

import 'animate.css';
import './payment.css';
import {SessionContext} from "../../session";
import {useHistory} from "react-router-dom";
import {useStateValue} from "../../StateProvider";

const imageUrls = [
    "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",
    "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png",
    "https://www.discover.com/company/images/newsroom/media-downloads/discover.png",
    "https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg",
    "https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png"
]

function Payment() {
    const [{basket}, dispatch] = useStateValue();
    const [creditCardNum, setCreditCardNum] = useState('');
    const [cardType, setCardType] = useState('')
    const [CVV, setCVV] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expireMonth, setExpireMonth] = useState('February');
    const [expireYear, setExpireYear] = useState('2022');
    const [cardTypeUrl, setCardTypeUrl] = useState('https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png');
    const {isLoggedIn} = useContext(SessionContext)
    const history = useHistory()
    useEffect(() => {
        if (!isLoggedIn()) {
            history.push("/Login")
        }
    })
    const handleNum = (e) => {
        setCreditCardNum(e.target.rawValue);
        // console.log(e.target.value);
    }

    const handleCreateDetailsOrder = (order_id, cbOnRes) => {
        const data = {
            details: basket.map(b => {
                return {
                    order_article: b.id,
                    order: order_id
                }
            })
        }
        console.log("details", data)
        fetcher(`http://127.0.0.1:8000/api/v1/createdetails`, "POST", data)
            .then(res=>{
                console.log("createdetails>>",res)
                cbOnRes()
            })
            .catch(err=>{
                console.log("createdetails[error]>>",err)
            })
    }
    const handleCreateOrder = () => {
        const order_user = localStorage.getItem("user_id") || 0
        console.log(order_user, basket)
        fetcher(`http://127.0.0.1:8000/api/v1/createorder`, "POST", {order_user})
            .then(res =>{
                console.log("createorder>>",res)
                if(res.id && res.id > 0){
                    handleCreateDetailsOrder(res.id,()=>{
                        console.log("end create")
                    })
                }
            })
            .catch(err=>{
                console.log("createorder[error]>>",err)
            })
    }
    const handleType = (type) => {
        setCardType(type);
        console.log(type);

        if (type === "visa") {
            setCardTypeUrl(imageUrls[0]);
            console.log("Visa")
        } else if (type === "mastercard") {
            setCardTypeUrl(imageUrls[1]);
            console.log("Mastercard")
        } else if (type === "discover") {
            setCardTypeUrl(imageUrls[2]);
            console.log("Discover")
        } else if (type === "amex") {
            setCardTypeUrl(imageUrls[3]);
            console.log("Amex")
        } else if (type === "diners") {
            console.log("Diners")
            setCardTypeUrl(imageUrls[4])
        } else if (type === "jcb") {
            console.log("JCB");
            setCardTypeUrl(imageUrls[5]);
        }
    }
    const handleChangeCVV = (e) => {
        setCVV(e.target.value);
    }
    const handleCardHolder = (e) => {
        setCardHolder(e.target.value);
    }

    const handleExpMonth = (e) => {
        setExpireMonth(e.target.value);
    }

    const handleExpYear = (e) => {
        setExpireYear(e.target.value);
    }

    // cleave.js logic
    const handlePayment = (e) => {
        e.preventDefault()
        /*
        if (creditCardNum === "") {
            alert("Debes ingresar un nro de tarjeta")
            return
        }
        if (cardHolder === "") {
            alert("Debes ingresar un portador")
            return
        }
        if (expireMonth === "" || expireYear === "") {
            alert("Debes ingresar fecha de vencimiento")
            return
        }
        if (CVV === "") {
            alert("Debes ingresar su clave")
            return
        }

        const data = {
            creditCardNum,
            cardType,
            cardHolder,
            expireMonth,
            expireYear
        }

        console.log(data)
        */
        handleCreateOrder()
    }
    return (
        <div className="containerpayment">
            <div className="form-section">
                <form id="form">
                    <div className="input-container mt">
                        <h4>Enter card number</h4>
                        <Cleave
                            delimiter="-"
                            options={{
                                creditCard: true,
                                onCreditCardTypeChanged: handleType
                            }}
                            onChange={handleNum}
                            placeholder="Please enter your credit card number"
                        />
                    </div>

                    <div className="input-container">
                        <h4>Card Holder</h4>
                        <input onChange={handleCardHolder} type="text" maxLength={20}
                               placeholder="Please enter your full name" required/>
                    </div>

                    <div className="input-grp">
                        <div className="input-container">
                            <h4>Month</h4>
                            <select value={expireMonth} onChange={handleExpMonth}>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <h4>Expiration Year</h4>
                            <select value={expireYear} onChange={handleExpYear}>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <h4>CVV</h4>
                            <input type="password" placeholder="CVV" value={CVV} onChange={handleChangeCVV} required
                                   maxLength={3}/>
                        </div>
                    </div>

                    <button onClick={handlePayment}>{`Submit ${cardType} payment`}</button>
                </form>
            </div>
            <div className="form-card">
                <div id="card">
                    <div className="header">
                        <div className="sticker"></div>
                        <div>
                            <img className="logo" src={cardTypeUrl} alt="Card logo"/>
                        </div>
                    </div>
                    <div className="body">
                        <h2 id="creditCardNumber">{creditCardNum === "" ? '#### #### #### ####' : creditCardNum}</h2>
                    </div>
                    <div className="footer">
                        <div>
                            <h5>Card Holder</h5>
                            <h5>{cardHolder === "" ? 'Your Full Name' : cardHolder}</h5>
                        </div>
                        <div>
                            <h6>Expires</h6>
                            <h5>{expireMonth === "" ? 'MM' : expireMonth} / {expireYear === "" ? 'YYYY' : expireYear}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
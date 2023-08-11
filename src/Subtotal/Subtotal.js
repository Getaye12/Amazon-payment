import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../contextAPI/StateProvider';
import { useNavigate } from 'react-router-dom';
export default function Subtotal() {

    let navigate = useNavigate();
    const [{ cart }, dispatch] = useStateValue();
    const getCartTotal = (cart) => cart?.reduce((amount, type) => type.price + amount, 0);
    return (
        <div className="subtotal">
            <div className="subtotal__head">
                <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
                    alt=""
                />
            </div>

            <div className="subtotal__body">
                <CurrencyFormat
                    renderText={value => (
                        <>
                        {/* `${value}`      */}
                            <p>
                                Subtotal ({cart?.length} items) : <strong>{value}</strong>
                            </p>
                            <small className="subtotal__gift">
                                <input type="checkbox" /> This order contains a gift
                        </small>
                        </>
                    )}
                    decimalScale={2}
                    value={getCartTotal(cart)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
                <button onClick={e => navigate('/payment')} >Proceed to Checkout</button>
            </div>
        </div>

    )
}

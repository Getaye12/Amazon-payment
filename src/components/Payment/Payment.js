import React, { useState, useEffect } from 'react';
import './Payment.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../contextAPI/StateProvider';
import CartProducts from '../CartProducts/CartProducts';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import axios from '../../utils/axios';
import { db } from '../../firebase/firebaseConfig';
export default function Payment() {

  const navigate = useNavigate();
  const [{ cart, user }, dispatch] = useStateValue();
  const getCartTotal = (cart) => cart?.reduce((amount, type) => type.price + amount, 0);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

 
  useEffect(() => {
  // generate the special stripe secret which allows us to charge a customer
  const getClientSecret = async () => {
    try {
      const response = await axios.post(`/payments/create`, {
        // Stripe expects the total in a currency's subunits
        total: getCartTotal(cart) * 100,
      });
      setClientSecret(response.data.clientSecret);
      console.log("secret is -> ", response.data.clientSecret);
    } catch (error) {
      console.log("Error fetching client secret:", error);
    }
  };

  getClientSecret();
}, [cart]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setProcessing(true);

  try {
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // payment intent = payment confirmation
    await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
      cart: cart,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({
      type: "EMPTY_BASKET",
    });

    navigate("/orders");
  } catch (error) {
    setError(error.message);
    setProcessing(false);
  }
};

const handleChange = () => {
  // listen for change of CardElement and display error
  setDisabled(false);
};
    return (
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout(<Link to="/cart">{ cart?.length } items</Link>)
          </h1>
          {/* Delivery address */ }
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{ user?.email }</p>
              <p>123, React Lane</p>
              <p>Get, amazon</p>
            </div>
          </div>
          {/* review Items */ }
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review Items and Delivery</h3>
            </div>
            <div className="payment__items">
              { cart.map((item, index) => (
                <CartProducts
                  key={ index }
                  id={ item.id }
                  title={ item.title }
                  price={ item.price }
                  rating={ item.rating }
                  image={ item.image }
                />
              )) }
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={ handleSubmit }>
                <CardElement onChange={ handleChange } />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={ (value) => <h3>Order Total : { value }</h3> }
                    decimalScale={ 2 }
                    value={ getCartTotal(cart) }
                    displayType={ "text" }
                    thousandSeparator={ true }
                    prefix={ "$" }
                  />
                  <button disabled={ processing || disabled || succeeded }>
                    <span>{ processing ? <p>Processing</p> : <p>Buy Now</p> }</span>
                  </button>
                </div>
                { error && <div>error</div> }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

